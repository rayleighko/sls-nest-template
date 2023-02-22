import { parsePhoneNumberFromString } from "libphonenumber-js";

const validCountries = ["US", "KR"];

export const parsingPhoneToE164Number = ({ value: phone }) => {
  const parsed = parsePhoneNumberFromString(phone as string);
  if (parsed && validCountries.includes(parsed.country)) {
    return parsed.number;
  }
  return "";
};
