import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type ReverseGeocodeResponse = {
  address: {
    [key: string]: string;
  };
  lat: string;
  lon: string;
  [key: string]: string | object;
};

async function getDetectedAddressRequest(): Promise<ReverseGeocodeResponse> {
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
  return await response.json();
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
    error,
  } = useQuery(detectedAddressQueryOptions());

  const data = useMemo(() => {
    return {
      postCode: _data?.address.postcode || "",
      city:
        _data?.address.city ||
        _data?.address.town ||
        _data?.address.village ||
        _data?.address.municipality ||
        "",
      street:
        _data?.address.road ||
        _data?.address.street ||
        _data?.address.pedestrian ||
        _data?.address.footway ||
        "",
      latitude: _data?.lat || "",
      longitude: _data?.lon || "",
    };
  }, [_data]);
  return {
    data,
    detect,
    isLoading,
    error,
  };
}
