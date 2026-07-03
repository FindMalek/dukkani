import Image from "next/image";

export function FlagComponent({
  country,
  countryName,
}: {
  country: string | undefined;
  countryName: string;
}) {
  // `react-phone-number-input` can render this with `country` undefined
  // (e.g. mid-typing an international number before a country is detected
  // from the digits), even though its own types mark it as required.
  if (!country) {
    return <div className="h-[15px] w-5 shrink-0 rounded-xs bg-muted" />;
  }

  return (
    <Image
      src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
      width={20}
      height={15}
      alt={countryName}
    />
  );
}
