// // app/actions/profileActions.ts
// "use server";
// import z from "zod";
// import { SignUpFormSchema } from "@/types/auth";

// export async function createProfile(formData: z.infer<typeof SignUpFormSchema>) {
// 	// Validate input
// 	if (!formData.name) {
// 		return { error: "Name is required" };
// 	}
// 	if (!formData.name) {
// 		return { error: "Name is required" };
// 	}
// 	if (!formData.name) {
// 		return { error: "Name is required" };
// 	}
// 	if (!formData.name) {
// 		return { error: "Name is required" };
// 	}

// 	// Simulate saving to database
// 	// Example: await db.profile.create({ name, bio });

// 	return { message: `Profile created for ${name}`, data: { name, bio } };
// }
