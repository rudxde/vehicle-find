import { writeFile } from 'fs/promises';

const results = await fetch("https://stolo-data-service.prod.stolo.eu-central-1.aws.bmw.cloud/vehiclesearch/search/de-de/gebrauchtwagen?maxResults=12&startIndex=0&brand=BMW&hash=ca5d2163cac4e3192cae924fa1219aab83829a6177890e42ea65e11c4d3a0832&context=results-page", {
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
        "vin17s": {
          "value": [
            "WMW31GX0002Y31203"
          ]
        }
      }

    ],
    "resultsContext": {
      "sort": [
        {
          "by": "SF_OFFER_INSTALLMENT",
          "order": "ASC"
        }
      ]
    },
    // "isMonthlyInstallmentFilterSelected": false
  }),
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});


const resultJson = await results.json();
console.log(resultJson);