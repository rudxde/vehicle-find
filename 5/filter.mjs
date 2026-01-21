import { writeFile, readFile } from "fs/promises";

const myLocation = {
  latitude: 48.17228938604977,
  longitude: 11.715980473514913,
};

const maxDistanceKm = 150; // adjust the radius as needed

const toRadians = (value) => (value * Math.PI) / 180;

const haversineDistanceKm = (from, to) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);

  const fromLat = toRadians(from.latitude);
  const toLat = toRadians(to.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(fromLat) *
      Math.cos(toLat) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

const vehicles = JSON.parse(await readFile("vehicles.json"));

let withoutLocation = 0;

const filteredVehicles = vehicles
  .map(({vehicle}) => {
    const location = vehicle?.ordering?.distributionData?.dealerLocation;
    const latitude = location?.latitude;
    const longitude = location?.longitude;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      console.log(vehicle)
      return null;
    }

    const distanceKm = haversineDistanceKm({ latitude, longitude }, myLocation);

    return { vehicle, distanceKm };
  })
  .filter(Boolean)
  .filter(({ distanceKm }) => distanceKm <= maxDistanceKm)
  .sort((a, b) => a.distanceKm - b.distanceKm)
  .map(({ vehicle }) => vehicle);


console.log(
  filteredVehicles.map((v) => ({
    url: `https://www.bmw.de/de-de/sl/gebrauchtwagen/details/${v.vssId}`,
  })),
);
