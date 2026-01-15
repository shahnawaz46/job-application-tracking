export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/;

export const OTP_REGEX = /^\d{6}$/;

// Phone number regex (simple international format, allows +, numbers, spaces, hyphens)
export const PHONE_REGEX = /^[+]?[\d\s\-]{7,15}$/;
