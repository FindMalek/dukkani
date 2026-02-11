"use client";

import { useState } from "react";

interface AddressMapResult {
	street: string | null;
	city: string | null;
	postalCode: string | null;
	latitude: number | null;
	longitude: number | null;
	loading: boolean;
	error: string | null;
}

export function useAddressMap() {
	const [result, setResult] = useState<AddressMapResult>({
		street: null,
		city: null,
		postalCode: null,
		latitude: null,
		longitude: null,
		loading: false,
		error: null,
	});

	const selectLocation = async (lat: number, lng: number) => {
		setResult({
			street: null,
			city: null,
			postalCode: null,
			latitude: null,
			longitude: null,
			loading: true,
			error: null,
		});

		try {
			// Use OpenStreetMap Nominatim for reverse geocoding
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
				{
					headers: {
						"User-Agent": "Dukkani Storefront",
					},
				},
			);

			if (!response.ok) {
				throw new Error("Failed to fetch address data");
			}

			const data = await response.json();
			const address = data.address || {};

			// Extract address components
			const street =
				address.road ||
				address.street ||
				address.pedestrian ||
				address.footway ||
				null;
			const city =
				address.city ||
				address.town ||
				address.village ||
				address.municipality ||
				null;
			const postalCode = address.postcode || null;

			setResult({
				street,
				city,
				postalCode,
				latitude: lat,
				longitude: lng,
				loading: false,
				error: null,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to get address. Please enter manually.";
			setResult({
				street: null,
				city: null,
				postalCode: null,
				latitude: null,
				longitude: null,
				loading: false,
				error: errorMessage,
			});
		}
	};

	const clearSelection = () => {
		setResult({
			street: null,
			city: null,
			postalCode: null,
			latitude: null,
			longitude: null,
			loading: false,
			error: null,
		});
	};

	const useCurrentLocation = async () => {
		setResult((prev) => ({
			...prev,
			street: null,
			city: null,
			postalCode: null,
			latitude: null,
			longitude: null,
			loading: true,
			error: null,
		}));

		if (!navigator.geolocation) {
			setResult((prev) => ({
				...prev,
				loading: false,
				error:
					"Geolocation is not supported. Please enter your address manually.",
			}));
			return;
		}

		try {
			const position = await new Promise<GeolocationPosition>(
				(resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject, {
						enableHighAccuracy: true,
						timeout: 10000,
						maximumAge: 0,
					});
				},
			);

			const { latitude, longitude } = position.coords;
			await selectLocation(latitude, longitude);
		} catch (error) {
			const err = error as GeolocationPositionError;
			const errorMessage =
				err?.code === 1
					? "Location access denied. Please enter your address manually."
					: err?.code === 2
						? "Location unavailable. Please enter your address manually."
						: err?.code === 3
							? "Location request timed out. Please enter your address manually."
							: "Could not get location. Please enter your address manually.";
			setResult((prev) => ({
				...prev,
				street: null,
				city: null,
				postalCode: null,
				latitude: null,
				longitude: null,
				loading: false,
				error: errorMessage,
			}));
		}
	};

	return {
		...result,
		selectLocation,
		clearSelection,
		useCurrentLocation,
	};
}
