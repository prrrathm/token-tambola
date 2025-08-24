// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignIn from "@/components/auth/sign-in";
import { authOptions } from "@/lib/nextAuthOptions";

export default async function Home() {
	try {
		const session = await getServerSession(authOptions);
		if (session) {
			redirect("/dashboard");
		} else redirect("/auth/signin");
		// return <SignIn />;
	} catch (error) {
		console.error("Error fetching session:", error);
		// return <SignIn />; // Fallback to SignIn on error
		redirect("/auth/signin");
	}
}
