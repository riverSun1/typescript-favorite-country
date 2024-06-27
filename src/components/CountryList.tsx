import { useEffect, useMemo, useState } from "react";
import api from "../api/countries.api";
import { Country } from "../types/countries.type";
import CountryCard from "./CountryCard";

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCountryData = async () => {
      setIsLoading(true);
      try {
        const datas: Country[] = await api.getCountries();
        setCountries(datas);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    getCountryData();
  }, []);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);

  const selectedCountriesName = useMemo(() => {
    return selectedCountries.map((country) => country.name.common);
  }, [selectedCountries]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      return !selectedCountriesName.includes(country.name.common);
    });
  }, [selectedCountries, countries, selectedCountriesName]);

  const handleSelectedCountry = (country: Country): void => {
    if (
      !selectedCountries.find(
        (selectedCountry) => selectedCountry.name.common === country.name.common
      )
    ) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(
        selectedCountries.filter(
          (selectedCountry) =>
            selectedCountry.name.common !== country.name.common
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="font-bold text-2xl">Favorite Countries</div>
      <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
        {selectedCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
            handleSelectedCountry={handleSelectedCountry}
            isSelected={true}
          />
        ))}
      </div>
      <div className="font-bold text-3xl">Countries</div>
      <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
            handleSelectedCountry={handleSelectedCountry}
            isSelected={false}
          />
        ))}
      </div>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default CountryList;
