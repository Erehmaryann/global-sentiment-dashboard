import type { SentimentData, SentimentType } from "@/types";
import countryCoordinates from "./country-coordinates";

// Normalize the raw sentiment data
export function normalizeSentimentData(data: SentimentData[]): SentimentData[] {
  if (!data.length) return [];

  // Find min and max values for normalization
  let minValue = Number.POSITIVE_INFINITY;
  let maxValue = Number.NEGATIVE_INFINITY;

  for (const item of data) {
    if (item.value < minValue) minValue = item.value;
    if (item.value > maxValue) maxValue = item.value;
  }

  // Normalize values to range between -1 and 1
  return data.map((item) => {
    // If min and max are the same, set sentiment to 0 (neutral)
    const sentiment =
      maxValue === minValue
        ? 0
        : 2 * ((item.value - minValue) / (maxValue - minValue)) - 1;

    // Add coordinates if available
    const coordinates = countryCoordinates[item.country];

    return {
      ...item,
      sentiment,
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
    };
  });
}

// Process data for map visualization based on sentiment type
export function processMapData(
  data: SentimentData[],
  sentimentType: SentimentType
) {
  if (!data.length) return [];

  // Group data by country
  const countryMap = new Map();

  for (const item of data) {
    const countryId = getCountryId(item.country);
    if (!countryId) continue;

    if (!countryMap.has(countryId)) {
      countryMap.set(countryId, {
        id: countryId,
        name: item.country,
        country: item.country,
        values: [],
        details: {
          positive: 0,
          neutral: 0,
          negative: 0,
        },
      });
    }

    const country = countryMap.get(countryId);
    country.values.push(item.sentiment);

    // Update sentiment counts
    if (item.sentiment < -0.33) {
      country.details.negative++;
    } else if (item.sentiment < 0.33) {
      country.details.neutral++;
    } else {
      country.details.positive++;
    }
  }

  // Calculate aggregate values and normalize details
  const result = [];

  for (const [, country] of countryMap.entries()) {
    const total = country.values.length;
    if (total === 0) continue;

    // Calculate percentages
    country.details.positive /= total;
    country.details.neutral /= total;
    country.details.negative /= total;

    // Calculate value based on sentiment type
    let value;

    switch (sentimentType) {
      case "overall":
        // Average sentiment
        value =
          country.values.reduce((sum: number, val: number) => sum + val, 0) /
          total;
        break;
      case "positive":
        value = country.details.positive;
        break;
      case "neutral":
        value = country.details.neutral;
        break;
      case "negative":
        value = country.details.negative;
        break;
      default:
        value =
          country.values.reduce((sum: number, val: number) => sum + val, 0) /
          total;
    }

    result.push({
      ...country,
      value,
    });
  }

  return result;
}

// Helper function to get country ID for amCharts
function getCountryId(countryName: string): string | null {
  // Map country names to ISO codes used by amCharts
  const countryMap: Record<string, string> = {
    "United States": "US",
    USA: "US",
    "United Kingdom": "GB",
    UK: "GB",
    Russia: "RU",
    China: "CN",
    Brazil: "BR",
    India: "IN",
    Japan: "JP",
    Germany: "DE",
    France: "FR",
    Italy: "IT",
    Canada: "CA",
    Australia: "AU",
    Spain: "ES",
    Mexico: "MX",
    Indonesia: "ID",
    Turkey: "TR",
    Netherlands: "NL",
    "Saudi Arabia": "SA",
    Switzerland: "CH",
    Argentina: "AR",
    Sweden: "SE",
    Poland: "PL",
    Belgium: "BE",
    Thailand: "TH",
    Iran: "IR",
    Austria: "AT",
    Norway: "NO",
    "United Arab Emirates": "AE",
    UAE: "AE",
    Nigeria: "NG",
    Israel: "IL",
    "South Africa": "ZA",
    Egypt: "EG",
    Denmark: "DK",
    Singapore: "SG",
    Philippines: "PH",
    Malaysia: "MY",
    Ireland: "IE",
    Pakistan: "PK",
    Chile: "CL",
    Finland: "FI",
    Portugal: "PT",
    Greece: "GR",
    "New Zealand": "NZ",
    Vietnam: "VN",
    Colombia: "CO",
    Bangladesh: "BD",
    "Czech Republic": "CZ",
    Romania: "RO",
    Peru: "PE",
    Iraq: "IQ",
    Qatar: "QA",
    Algeria: "DZ",
    Kazakhstan: "KZ",
    Hungary: "HU",
    Kuwait: "KW",
    Morocco: "MA",
    Ukraine: "UA",
    Angola: "AO",
    Ecuador: "EC",
    Slovakia: "SK",
    Cuba: "CU",
    Belarus: "BY",
    "Sri Lanka": "LK",
    Croatia: "HR",
    Bulgaria: "BG",
    Lebanon: "LB",
    Slovenia: "SI",
    Lithuania: "LT",
    Tunisia: "TN",
    Oman: "OM",
    Kenya: "KE",
    Latvia: "LV",
    Estonia: "EE",
    Uruguay: "UY",
    "Costa Rica": "CR",
    Panama: "PA",
    Iceland: "IS",
    Bolivia: "BO",
    Paraguay: "PY",
    Bahrain: "BH",
    Nepal: "NP",
    Ethiopia: "ET",
    "El Salvador": "SV",
    Cyprus: "CY",
    Cambodia: "KH",
    Mongolia: "MN",
    Tanzania: "TZ",
    Myanmar: "MM",
    Ghana: "GH",
    Luxembourg: "LU",
    Uganda: "UG",
    Cameroon: "CM",
    "Ivory Coast": "CI",
    Senegal: "SN",
    Zambia: "ZM",
    Zimbabwe: "ZW",
    Jordan: "JO",
    Bahamas: "BS",
    Malta: "MT",
    Haiti: "HT",
    Jamaica: "JM",
    Mauritius: "MU",
    Namibia: "NA",
    Botswana: "BW",
    Rwanda: "RW",
    Gabon: "GA",
    Mozambique: "MZ",
    Benin: "BJ",
    Brunei: "BN",
    Syria: "SY",
    Yemen: "YE",
    Afghanistan: "AF",
    Venezuela: "VE",
    "North Korea": "KP",
    "South Korea": "KR",
    Taiwan: "TW",
    "Hong Kong": "HK",
    Macao: "MO",
    Palestine: "PS",
    "Vatican City": "VA",
    Monaco: "MC",
    Liechtenstein: "LI",
    Andorra: "AD",
    "San Marino": "SM",
    Bhutan: "BT",
    Maldives: "MV",
    Barbados: "BB",
    Fiji: "FJ",
    Montenegro: "ME",
    "North Macedonia": "MK",
    Albania: "AL",
    Serbia: "RS",
    "Bosnia and Herzegovina": "BA",
    Moldova: "MD",
    Georgia: "GE",
    Armenia: "AM",
    Azerbaijan: "AZ",
    Kyrgyzstan: "KG",
    Tajikistan: "TJ",
    Turkmenistan: "TM",
    Uzbekistan: "UZ",
    Laos: "LA",
    "Papua New Guinea": "PG",
    "Timor-Leste": "TL",
    "Solomon Islands": "SB",
    Vanuatu: "VU",
    Samoa: "WS",
    Tonga: "TO",
    Kiribati: "KI",
    Micronesia: "FM",
    "Marshall Islands": "MH",
    Palau: "PW",
    Nauru: "NR",
    Tuvalu: "TV",
    "Cook Islands": "CK",
    Niue: "NU",
    Tokelau: "TK",
    Guam: "GU",
    "American Samoa": "AS",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "US Virgin Islands": "VI",
    "British Virgin Islands": "VG",
    "Cayman Islands": "KY",
    Bermuda: "BM",
    "Turks and Caicos Islands": "TC",
    Anguilla: "AI",
    Montserrat: "MS",
    Guadeloupe: "GP",
    Martinique: "MQ",
    "French Guiana": "GF",
    "Saint Martin": "MF",
    "Saint Barthélemy": "BL",
    "Saint Pierre and Miquelon": "PM",
    Aruba: "AW",
    Curaçao: "CW",
    "Sint Maarten": "SX",
    Bonaire: "BQ",
    Greenland: "GL",
    "Faroe Islands": "FO",
    Gibraltar: "GI",
    Guernsey: "GG",
    Jersey: "JE",
    "Isle of Man": "IM",
    "Falkland Islands": "FK",
    "South Georgia": "GS",
    "French Polynesia": "PF",
    "New Caledonia": "NC",
    "Wallis and Futuna": "WF",
    Réunion: "RE",
    Mayotte: "YT",
    "Saint Helena": "SH",
    "Ascension Island": "AC",
    "Tristan da Cunha": "TA",
    "British Indian Ocean Territory": "IO",
    "Pitcairn Islands": "PN",
    "Christmas Island": "CX",
    "Cocos (Keeling) Islands": "CC",
    "Norfolk Island": "NF",
    "Heard Island and McDonald Islands": "HM",
    Antarctica: "AQ",
  };

  return countryMap[countryName] || countryName;
}
