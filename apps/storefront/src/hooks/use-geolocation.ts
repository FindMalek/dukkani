"use client";

import { useState } from "react";

interface GeolocationResult {
	city: string | null;
	area: string | null;
	loading: boolean;
	error: string | null;
}

export function useGeolocation() {
	const [result, setResult] = useState<GeolocationResult>({
		city: null,
		area: null,
		loading: false,
		error: null,
	});

	const getLocation = async () => {
		setResult({ city: null, area: null, loading: true, error: null });

		if (!navigator.geolocation) {
			setResult({
				city: null,
				area: null,
				loading: false,
				error: "Geolocation is not supported by your browser",
			});
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

			// Use OpenStreetMap Nominatim for reverse geocoding
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
				{
					headers: {
						"User-Agent": "Dukkani Storefront",
					},
				},
			);

			if (!response.ok) {
				throw new Error("Failed to fetch location data");
			}

			const data = await response.json();
			const address = data.address || {};

			// Extract city and area
			const city =
				address.city ||
				address.town ||
				address.village ||
				address.municipality ||
				null;
			const area =
				address.suburb || address.neighbourhood || address.quarter || null;

			setResult({
				city,
				area,
				loading: false,
				error: null,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to get location. Please enter manually.";
			setResult({
				city: null,
				area: null,
				loading: false,
				error: errorMessage,
			});
		}
	};

	return {
		...result,
		getLocation,
	};
}
