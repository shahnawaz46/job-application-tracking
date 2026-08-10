import * as Yup from "yup";
import { GENDER_OPTIONS, NAME_MAX, NAME_MIN } from "./constants";
import { GENDER_MESSAGES, NAME_MESSAGES, PHONE_MESSAGES } from "./messages";
import { PHONE_REGEX } from "./regex";

// types/interface
import type { TGender } from "@/types/type";

export const profileSchema = Yup.object({
  full_name: Yup.string()
    .trim()
    .required(NAME_MESSAGES.REQUIRED)
    .min(NAME_MIN, NAME_MESSAGES.MIN)
    .max(NAME_MAX, NAME_MESSAGES.MAX),

  phone_no: Yup.string()
    .trim()
    .required(PHONE_MESSAGES.REQUIRED)
    .matches(PHONE_REGEX, PHONE_MESSAGES.INVALID),

  gender: Yup.mixed<TGender>()
    .required()
    .oneOf(GENDER_OPTIONS, GENDER_MESSAGES.INVALID),
});
