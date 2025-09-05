export interface Country {
  name: string;
  flagEmoji: string;
  code: string;
}

export const countryList: Country[] = [
  { name: "United States", flagEmoji: "🇺🇸", code: "US" },
  { name: "Canada", flagEmoji: "🇨🇦", code: "CA" },
  { name: "United Kingdom", flagEmoji: "🇬🇧", code: "GB" },
  { name: "Germany", flagEmoji: "🇩🇪", code: "DE" },
  { name: "France", flagEmoji: "🇫🇷", code: "FR" },
  { name: "Spain", flagEmoji: "🇪🇸", code: "ES" },
  { name: "Italy", flagEmoji: "🇮🇹", code: "IT" },
  { name: "Netherlands", flagEmoji: "🇳🇱", code: "NL" },
  { name: "Australia", flagEmoji: "🇦🇺", code: "AU" },
  { name: "Japan", flagEmoji: "🇯🇵", code: "JP" },
  { name: "South Korea", flagEmoji: "🇰🇷", code: "KR" },
  { name: "Singapore", flagEmoji: "🇸🇬", code: "SG" },
  { name: "Brazil", flagEmoji: "🇧🇷", code: "BR" },
  { name: "Mexico", flagEmoji: "🇲🇽", code: "MX" },
  { name: "India", flagEmoji: "🇮🇳", code: "IN" },
  { name: "China", flagEmoji: "🇨🇳", code: "CN" },
  { name: "Switzerland", flagEmoji: "🇨🇭", code: "CH" },
  { name: "Sweden", flagEmoji: "🇸🇪", code: "SE" },
  { name: "Norway", flagEmoji: "🇳🇴", code: "NO" },
  { name: "Denmark", flagEmoji: "🇩🇰", code: "DK" },
  { name: "Finland", flagEmoji: "🇫🇮", code: "FI" },
  { name: "Austria", flagEmoji: "🇦🇹", code: "AT" },
  { name: "Belgium", flagEmoji: "🇧🇪", code: "BE" },
  { name: "Ireland", flagEmoji: "🇮🇪", code: "IE" },
  { name: "Portugal", flagEmoji: "🇵🇹", code: "PT" },
  { name: "New Zealand", flagEmoji: "🇳🇿", code: "NZ" },
  { name: "Israel", flagEmoji: "🇮🇱", code: "IL" },
  { name: "Poland", flagEmoji: "🇵🇱", code: "PL" },
  { name: "Czech Republic", flagEmoji: "🇨🇿", code: "CZ" },
  { name: "Hungary", flagEmoji: "🇭🇺", code: "HU" },
  { name: "Romania", flagEmoji: "🇷🇴", code: "RO" },
  { name: "Greece", flagEmoji: "🇬🇷", code: "GR" },
  { name: "Turkey", flagEmoji: "🇹🇷", code: "TR" },
  { name: "South Africa", flagEmoji: "🇿🇦", code: "ZA" },
  { name: "Argentina", flagEmoji: "🇦🇷", code: "AR" },
  { name: "Chile", flagEmoji: "🇨🇱", code: "CL" },
  { name: "Colombia", flagEmoji: "🇨🇴", code: "CO" },
  { name: "Peru", flagEmoji: "🇵🇪", code: "PE" },
  { name: "Remote/Worldwide", flagEmoji: "🌍", code: "REMOTE" },
];

export const popularLocations = [
  "Remote/Worldwide",
  "United States",
  "Canada", 
  "United Kingdom",
  "Germany",
  "Netherlands",
  "Australia",
  "Singapore",
];