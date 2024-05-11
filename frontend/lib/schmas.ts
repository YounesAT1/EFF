import * as z from "zod";

export const BookingFormSchema = z.object({
  email: z.string().email().min(1, "Email is required").readonly(),
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((gender) => gender === "male" || gender === "female", {
      message: "Gender should be 'male' or 'female'",
    }),
  title: z
    .string()
    .min(1, "Title is required")
    .refine((title) => ["Ms", "Mr", "Mrs"].includes(title), {
      message: "Title should be 'Ms', 'Mr', or 'Mrs'",
    }),
  firstName: z.string().min(1, "First name is required").readonly(),
  lastName: z.string().min(1, "Last name is required").readonly(),
  nationality: z.any(),
  dateOfBirth: z.date().refine(
    (dateOfBirth) => {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    },
    {
      message: "You must be at least 18 years old",
    }
  ),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((phoneNumber) => /^\+\d{1,3}\d{6,14}$/.test(phoneNumber), {
      message:
        "Invalid phone number format. It should start with a '+' followed by country code and numbers.",
    }),
  passportNumber: z.string().min(1, "Passport number is required"),
  passportExpirationDate: z
    .date()
    .refine((expirationDate) => expirationDate > new Date(), {
      message: "Expiration date must be in the future",
    }),
});
