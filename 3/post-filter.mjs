import { writeFile, readFile } from 'fs/promises';

const vssOptions = [
    "S0710", // M Lederlenkrad
    "S05AC", // Fernlichtassistent
    // "S0711", // M Sportsitze für Fahrer und Beifahrer
    "S0431", // Innenspiegel automatisch abblendend
    "S01CX", // SPORT BOOST
    "S02VL", // Variable Sportlenkung
    "S02VF", // Adaptives M Fahrwerk
    "S033B", // M Sportpaket Pro
    "S0494", // Sitzheizung für Fahrer und Beifahrer
    "S0248", // Lenkradheizung
    "S0459", // Sitzverstellung elektrisch mit Memory
    "S0418", // Gepäckraumpaket
    "S05DN", // Parking Assistant Plus
    "S05AU", // Driving Assistant Professional
    "S03AC", // Anhängerkupplung
    "S0688", // Harman Kardon Surround Sound System
    // "S05AL", // Active Protection
    "S03KA", // Akustikverglasung
    "S04UR", // Ambientes Licht
    "S0322", // Komfortzugang
    "S0420", // Sonnenschutzverglasung
    "S0552", // Adaptiver LED-Scheinwerfer
    "S0760", // M Hochglanz Shadow Line
    "S0488", // Lordosenstütze für Fahrer und Beifahrer
];

const input = JSON.parse(await readFile('results.json', 'utf-8'));

/**
 * Calculates the great-circle distance between two coordinates using the Haversine formula.
 * @param {number} lat1 Latitude of point 1 in decimal degrees
 * @param {number} lon1 Longitude of point 1 in decimal degrees
 * @param {number} lat2 Latitude of point 2 in decimal degrees
 * @param {number} lon2 Longitude of point 2 in decimal degrees
 * @returns {number} Distance in kilometers
 */
function distanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's mean radius in kilometers

    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

const munich = {
    lon: 11.716478717438171,
    lat: 48.17146975776697,
};

const matchingVehicles = input.hits.filter(({ vehicle }) => {
    for (let option of vssOptions) {
        /**
         * @type {string}
         */
        const x = vehicle.internal.vssConfigId;
        if (x.indexOf(option) === -1) {
            return false;
        }

    }
    if (vehicle.vehicleLifeCycle.vehicleDamage.involvedInAccident) {
        return false;
    }

    const dist = distanceInKm(munich.lat, munich.lon, vehicle.ordering.distributionData.dealerLocation.latitude, vehicle.ordering.distributionData.dealerLocation.longitude);
    if (dist > 250) {
        return false;
    }


    return true;
});

console.log(matchingVehicles.map(v => ({
    model: v.vehicle.vehicleSpecification.modelAndOption.model.modelName,
    color: v.vehicle.vehicleSpecification.modelAndOption.color.clusterFine,
    price: v.vehicle.pricing.price.formattedPrice,
    mileage: v.vehicle.vehicleLifeCycle.mileage.km + ' km',
    numberOfPreviousOwners: v.vehicle.vehicleLifeCycle.numberOfPreviousOwners,
    distanceInKm: Math.round(distanceInKm(munich.lat, munich.lon, v.vehicle.ordering.distributionData.dealerLocation.latitude, v.vehicle.ordering.distributionData.dealerLocation.longitude)) + ' km',
    link: `https://www.bmw.de/de-de/sl/gebrauchtwagen/details/${v.vehicle.vssId}`
})));