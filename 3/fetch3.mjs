import { writeFile } from 'fs/promises';

const results = await fetch("https://stolo-data-service.prod.stolo.eu-central-1.aws.bmw.cloud/vehiclesearch/search/de-de/gebrauchtwagen?maxResults=12&startIndex=0&brand=BMW&context=results-page", {
  "headers": {
    "accept": "*/*",
    "accept-language": "de-DE,de;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Brave\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-gpc": "1"
  },
  "referrer": "https://www.bmw.de/",
  "body": JSON.stringify({
    "searchContext": [
      {
        "model": {
          "marketingModelRange": {
            "value": [
              "3_G21"
            ]
          }
        },
        "degreeOfElectrificationBasedFuelType": {
          "value": [
            "PHEV"
          ]
        },
        "upholsteryColorCluster": {
          "value": [
            "BLACK"
          ]
        },
        "usedCarData": {
          "mileageRanges": [
            {
              "minValue": 0,
              "maxValue": 30000
            }
          ]
        },
        // "optionGroups": [
        //   {
            
        //   }
        // ],
        "categorizedOptionGroups": [
          {
            "category": "wheelsAndTires",
            "operator": "AND",
            "value": [
              "Sitzheizung für Fahrer und Beifahrer",
              "Sitzverstellung elektrisch mit Memory"
            ]
          },
          {
            "category": "other",
            "operator": "AND",
            "value": [
              "Parking Assistant Plus",
              "Driving Assistant Professional"
            ]
          },
          {
            "category": "safety",
            "operator": "AND",
            "value": [
              "Anhängerkupplung"
            ]
          },
          {
            "category": "services",
            "operator": "AND",
            "value": [
              "Harman Kardon Surround Sound System"
            ]
          }
        ]
        // "vssConfigurationId": {
        //   "value": [
            // "S0710",
            // "S05AC",
            // "S0711",
            // "S0431",
            // "S01CX",
            // "S02VL",
            // "S02VF",
            // "S033B",
            // "S0494",
            // "S0248",
            // "S0459",
            // "S0418",
            // "S05DN",
            // "S05AU",
            // "S03AC",
          //   "S0688"
          // ]
        }
      // }
    ],
    "resultsContext": {
      "sort": [
        {
          "by": "SF_OFFER_INSTALLMENT",
          "order": "ASC"
        }
      ]
    },
    "isMonthlyInstallmentFilterSelected": false
  }),
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});


const resultJson = await results.json()
await writeFile('results2.json', JSON.stringify(resultJson, null, 2));