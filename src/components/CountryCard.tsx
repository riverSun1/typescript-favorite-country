import { Country } from "../types/countries.type";

interface CountryCardProps {
  country: Country;
  handleSelectedCountry: (country: Country) => void;
  isSelected: boolean;
}

const CountryCard = ({
  country,
  handleSelectedCountry,
  isSelected,
}: CountryCardProps) => {
  const { name, capital, flags } = country;

  return (
    <div
      className={`border rounded-lg shadow-xl p-5 h-60 w-60 ${
        isSelected ? "border-green-500" : ""
      }`}
      onClick={() => handleSelectedCountry(country)}
    >
      <div className="flex justify-center items-center">
        <img alt={name.common} src={flags.png} />
      </div>
      <h6 className="font-bold text-l my-1.5">{name.common}</h6>
      <div className="text-l">{capital}</div>
    </div>
  );
};

export default CountryCard;
