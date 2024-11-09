declare module 'country-reverse-geocoding' {
    interface Country {
      name: string;
      code: string;
      // Add other properties here if the module has more data
    }
  
    interface ReverseGeocoding {
      get_country(lat: number, lng: number): Country | null;
    }
  
    const CountryReverseGeocoding: {
      country_reverse_geocoding: () => ReverseGeocoding;  
    };
  
    export = CountryReverseGeocoding;
  }
  