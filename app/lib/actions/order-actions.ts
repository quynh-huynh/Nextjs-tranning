"use server";
import { z } from "zod";

const FormSchema = z.object({
  orderProductId: z.string(),
  phone: z.string({
    invalid_type_error: "Please input phone number.",
  })
  .refine((val) => val.length > 0 && /^\d{10}$/.test(val), {
    message: "Phone number cannot be empty and must be exactly 10 digits.",
    path: ["phone"],
  }),
  name: z.string({
    invalid_type_error: "Please input name.",
  }).min(1, "Name cannot be empty."),
  address: z.string({
    invalid_type_error: "Please select address.",
  }).min(1, "Address cannot be empty."),
});

const CreateOrderFormChema = FormSchema.omit({ orderProductId: true });

export type State = {
  errors?: {
    phone?: string[];
    name?: string[];
    address?: string[];
  };
  message?: string | null;
};

export async function CreateOrder(prevState: State, formData: FormData) {
  const validatedFields = CreateOrderFormChema.safeParse({
    phone: formData.get("phone"),
    name: formData.get("name"),
    address: formData.get("address"),
  });
  

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Order.",
    };
  }

  return {
    errors: {},
    message: null,
  };
}