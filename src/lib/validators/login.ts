import * as z from "zod";

export const formSchema = z.object({
  email: z.string().min(1, {
    message: "Fill up email",
  }),
  password: z.string().min(1, {
    message: "Fill up password",
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
