import Image from "next/image";

export function FlagComponent({
  country,
  countryName,
}: {
  country: string;
  countryName: string;
}) {
  return (
    <Image
      src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
      width={20}
      height={15}
      alt={countryName}
    />
  );
}
