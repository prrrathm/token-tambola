import z from "zod";

export const SignUpFormSchema = z.object({
	// username: z.string().min(2, {
	// 	message: "Username must be at least 2 characters.",
	// }),
	email: z.email().min(5, { message: "Email must be at least 5 characters" }),
	password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,32}$/, {
		message:
			"Password must be 8-32 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*). No spaces allowed.",
	}),
	name: z.string(),
	username: z.string().regex(/^[a-z]{3,16}$/, {
		message: "Username must be 3-16 characters long and contain only lowercase letters (a-z).",
	}),
});
