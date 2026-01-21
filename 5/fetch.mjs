import { writeFile } from "fs/promises";

const response = await fetch(
  "https://stolo-data-service.prod.stolo.eu-central-1.aws.bmw.cloud/vehiclesearch/search/de-de/gebrauchtwagen?maxResults=100&startIndex=0&brand=BMW",
  {
    headers: {
      accept: "*/*",
      "accept-language": "de-DE,de;q=0.6",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua": '"Not(A:Brand";v="8", "Chromium";v="144", "Brave";v="144"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "sec-gpc": "1",
    },
    referrer: "https://www.bmw.de/",
    body: JSON.stringify({
      searchContext: [
        {
          model: { marketingModelRange: { value: ["5_G31"] } },
          colorClusterRough: { value: ["BLACK", "GRAY", "WHITE"] },
          degreeOfElectrificationBasedFuelType: { value: ["PHEV"] },
          categorizedOptionGroups: [
            {
              category: "safety",
              operator: "AND",
              value: ["Anhängerkupplung"],
            },
            {
              category: "services",
              operator: "AND",
              value: ["Bowers & Wilkins Surround Sound"],
            },
          ],
        },
      ],
      resultsContext: { sort: [{ by: "SF_OFFER_INSTALLMENT", order: "ASC" }] },
      isMonthlyInstallmentFilterSelected: false,
    }),
    method: "POST",
    mode: "cors",
    credentials: "omit",
  },
);

const data = await response.json();
const vehicles = data.hits ?? [];

await writeFile("vehicles.json", JSON.stringify(vehicles, null, 2));
