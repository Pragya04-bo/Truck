import axios from "axios";

export const geocodeAddress = async (address) => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "SmartTruckOptimization/1.0 (college-project)",
      },
    }
  );

  if (!response.data || response.data.length === 0) {
    throw new Error("Unable to geocode address");
  }

  return {
    lat: parseFloat(response.data[0].lat),
    lng: parseFloat(response.data[0].lon),
  };
};
