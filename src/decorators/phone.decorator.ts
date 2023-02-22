import { Transform } from "class-transformer";

import { parsingPhoneToE164Number } from "~/utils/phone";

export const ToPhone = Transform(parsingPhoneToE164Number, {
  toClassOnly: true
});
