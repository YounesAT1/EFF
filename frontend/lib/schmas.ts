import * as z from "zod";

export const BookingFormSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  nationality: z.object({
    value: z.string(),
    label: z.string(),
    flag: z.string(),
    region: z.string(),
  }),
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
  phoneNumber: z.string(),
  passportNumber: z.string().min(1, "Passport number is required"),
  passportExpirationDate: z
    .date()
    .refine((expirationDate) => expirationDate > new Date(), {
      message: "Expiration date must be in the future",
    }),
  cardHolderFirstName: z.string().min(1, "First Name is required"),
  cardHolderLastName: z.string().min(1, "Last Name is required"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(
      /^(\d{4}-){3}\d{4}$/,
      "Card number must be in the format 1234-5678-9012-3456"
    ),
  cardExperationDate: z
    .date()
    .min(new Date(), "Card expiration date must be in the future"),
  cardCVV: z
    .string()
    .min(3, "CVV must be at least 3 characters")
    .max(4, "CVV must be at most 4 characters"),
});
