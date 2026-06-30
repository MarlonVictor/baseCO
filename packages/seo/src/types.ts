export interface LocalBusinessAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface LocalBusinessGeo {
  latitude: number;
  longitude: number;
}

export interface LocalBusinessSchema {
  type?: string;
  name: string;
  url?: string;
  image?: string | string[];
  logo?: string;
  description?: string;
  telephone?: string;
  priceRange?: string;
  address?: LocalBusinessAddress;
  geo?: LocalBusinessGeo;
  openingHours?: string[];
  sameAs?: string[];
}
