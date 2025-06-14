import { executeAction } from "@/lib/executeAction";
import prisma from "../db/prisma";
import { signUpSchema } from "../validators/auth.schema";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const name = formData.get("name");
      const password = formData.get("password");
      const validatedData = signUpSchema.parse({ email, password, name });
      await prisma.user.create({
        data: {
          email: validatedData.email.toLocaleLowerCase(),
          name: validatedData.name,
          password: validatedData.password,
        },
      });
    },
    successMessage: "Signed up successfully",
  });
};

export { signUp };
