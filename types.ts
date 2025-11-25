export interface GDPData {
  iso: string;
  country: string;
  gdp: number; // In Trillions USD
  rank: number;
  growth: string;
  region: string;
}

export interface GeoFeature {
  type: string;
  properties: {
    ISO_A3: string;
    ADMIN: string;
    [key: string]: any;
  };
  geometry: any;
}

export interface CountryAnalysis {
  analysis: string;
  loading: boolean;
  error: string | null;
}
