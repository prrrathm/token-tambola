"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import SignIn from "./sign-in";

interface AuthGuardProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
	const { data: session, status } = useSession();

	// Show loading state
	if (status === "loading") {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600'></div>
			</div>
		);
	}

	// Show sign-in if not authenticated
	if (!session) {
		return fallback || <SignIn />;
	}

	// Show protected content if authenticated
	return <>{children}</>;
}
9;

// Component for guest-only pages (like sign-in page)
export function GuestGuard({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600'></div>
			</div>
		);
	}

	// Redirect to dashboard if already signed in
	if (session) {
		window.location.href = "/dashboard";
		return null;
	}

	return <>{children}</>;
}
