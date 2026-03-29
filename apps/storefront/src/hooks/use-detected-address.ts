import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

/**
 * Subset of Nominatim `address` keys (reverse JSON with addressdetails=1).
 * @see https://nominatim.org/release-docs/latest/api/Output/#addressdetails
 */
export type NominatimAddressFields = Partial<{
  city: string;
  town: string;
  village: string;
  municipality: string;
  hamlet: string;
  suburb: string;
  neighbourhood: string;
  quarter: string;
  city_district: string;
  district: string;
  borough: string;
  county: string;
  state_district: string;
  region: string;
  state: string;
  postcode: string;
  house_number: string;
  house_name: string;
  house: string;
  road: string;
  street: string;
  pedestrian: string;
  footway: string;
  residential: string;
  path: string;
  unclassified: string;
  service: string;
  living_street: string;
  track: string;
  bridleway: string;
  cycleway: string;
  country: string;
  country_code: string;
}>;

export type ParsedNominatimReverse = {
  address: NominatimAddressFields;
  lat: string;
  lon: string;
  displayName: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Normalizes Nominatim reverse JSON into typed address parts (string values only).
 */
export function parseNominatimReverseResponse(
  json: unknown,
): ParsedNominatimReverse {
  if (!isRecord(json)) {
    throw new Error("Reverse geocode response is not a JSON object.");
  }

  const address: NominatimAddressFields = {};
  const rawAddress = json.address;
  if (isRecord(rawAddress)) {
    for (const [key, value] of Object.entries(rawAddress)) {
      if (value == null || value === "") continue;
      if (typeof value === "string" || typeof value === "number") {
        const s = String(value).trim();
        if (s !== "") (address as Record<string, string>)[key] = s;
      }
    }
  }

  const lat = json.lat != null ? String(json.lat) : "";
  const lon = json.lon != null ? String(json.lon) : "";
  const displayNameRaw = json.display_name;
  const displayName =
    typeof displayNameRaw === "string" ? displayNameRaw.trim() : "";

  return { address, lat, lon, displayName };
}

/**
 * Default: settlement names first; then `state_district` before `state` (typical US/EU).
 * `county` is not used for city — often a US county name, not a municipality.
 */
const LOCALITY_KEYS = [
  "city",
  "town",
  "village",
  "municipality",
  "hamlet",
  "suburb",
  "neighbourhood",
  "quarter",
  "city_district",
  "district",
  "borough",
  "state_district",
  "region",
  "state",
] as const satisfies readonly (keyof NominatimAddressFields)[];

/**
 * Tunisia: Nominatim puts the governorate in `state` (e.g. Monastir) and the
 * delegation in `state_district`; `county` is often the locality name. Prefer
 * `state` for the checkout "city" field before the delegation string.
 */
const LOCALITY_KEYS_TN = [
  "city",
  "town",
  "village",
  "municipality",
  "hamlet",
  "suburb",
  "neighbourhood",
  "quarter",
  "city_district",
  "district",
  "borough",
  "state",
  "state_district",
  "county",
  "region",
] as const satisfies readonly (keyof NominatimAddressFields)[];

/** Highway-style line name (Nominatim varies by OSM way type). */
const STREET_KEYS = [
  "road",
  "street",
  "residential",
  "living_street",
  "unclassified",
  "pedestrian",
  "footway",
  "path",
  "service",
  "track",
  "bridleway",
  "cycleway",
] as const satisfies readonly (keyof NominatimAddressFields)[];

function firstNonEmptyField(
  address: NominatimAddressFields,
  keys: readonly (keyof NominatimAddressFields)[],
): string {
  for (const key of keys) {
    const value = address[key];
    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }
  }
  return "";
}

export function localityFromNominatimAddress(
  address: NominatimAddressFields,
): string {
  const cc = address.country_code?.toLowerCase();
  const keys = cc === "tn" ? LOCALITY_KEYS_TN : LOCALITY_KEYS;
  return firstNonEmptyField(address, keys);
}

/** Nominatim usually splits `house_number` / `house` from the way name — join for a single line. */
export function streetFromNominatimAddress(
  address: NominatimAddressFields,
): string {
  const highway = firstNonEmptyField(address, STREET_KEYS);
  const prefix = [address.house_number, address.house_name ?? address.house]
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean)
    .join(" ");

  if (highway) {
    return [prefix, highway].filter(Boolean).join(" ").trim();
  }
  return prefix;
}

function normLower(s: string): string {
  return s.trim().toLowerCase();
}

/** Locality / delegation line when reverse hits a residential way with no `road` name (common in TN). */
function areaLineFromAddress(
  address: NominatimAddressFields,
  excludeCity: string,
): string {
  const exclude = normLower(excludeCity);
  const parts = [
    address.county,
    address.state_district,
    address.suburb,
    address.neighbourhood,
  ]
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean)
    .filter((p) => normLower(p) !== exclude);

  return [...new Set(parts)].join(", ");
}

/** Drop segments already mapped to city / postcode / country (structured fields). */
function streetFromDisplayName(
  displayName: string,
  address: NominatimAddressFields,
  cityChosen: string,
): string {
  const exclude = new Set<string>();
  for (const s of [cityChosen, address.postcode, address.country]) {
    if (typeof s === "string" && s.trim() !== "") {
      exclude.add(normLower(s));
    }
  }
  const segments = displayName
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !exclude.has(normLower(s)));
  return segments.join(", ");
}

/**
 * Full street/area line: highway + house, else TN-style area parts, else trimmed `display_name`.
 */
export function resolvedStreetLine(
  parsed: ParsedNominatimReverse,
  cityChosen: string,
): string {
  const { address, displayName } = parsed;
  const primary = streetFromNominatimAddress(address);
  if (primary) return primary;

  const cc = address.country_code?.toLowerCase();
  const useAreaLine =
    cc === "tn" || (Boolean(address.county) && Boolean(address.state_district));

  if (useAreaLine) {
    const area = areaLineFromAddress(address, cityChosen);
    if (area) return area;
  }

  if (displayName) {
    return streetFromDisplayName(displayName, address, cityChosen);
  }

  return "";
}

async function getDetectedAddressRequest(): Promise<ParsedNominatimReverse> {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });

  const { latitude, longitude } = position.coords;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
  );
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  const raw: unknown = await response.json();
  return parseNominatimReverseResponse(raw);
}

function detectedAddressQueryOptions() {
  return queryOptions({
    queryKey: ["detected-address"],
    queryFn: () => getDetectedAddressRequest(),
    retry: false,
    enabled: false,
  });
}

export function useDetectedAddress() {
  const {
    data: _data,
    refetch: detect,
    isLoading,
    isFetching,
    isSuccess,
    dataUpdatedAt,
    error,
  } = useQuery(detectedAddressQueryOptions());

  const data = useMemo(() => {
    if (!_data) {
      return {
        postCode: "",
        city: "",
        street: "",
        latitude: "",
        longitude: "",
      };
    }

    const { address, lat, lon } = _data;
    const city = localityFromNominatimAddress(address);

    return {
      postCode: address.postcode?.trim() ?? "",
      city,
      street: resolvedStreetLine(_data, city),
      latitude: lat,
      longitude: lon,
    };
  }, [_data]);

  return {
    data,
    detect,
    isLoading,
    isFetching,
    isSuccess,
    dataUpdatedAt,
    error,
  };
}
