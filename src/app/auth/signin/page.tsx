"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleCredentialsLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		setLoading(false);

		if (res?.error) {
			setError("Invalid email or password");
		} else {
			window.location.href = "/"; // Redirect after success
		}
	};

	const handleGoogleLogin = () => {
		signIn("google", { callbackUrl: "/" });
	};

	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
			<div className='w-96 rounded-lg bg-white p-8 shadow-md'>
				<h1 className='mb-6 text-center text-2xl font-semibold'>Sign In</h1>

				<form onSubmit={handleCredentialsLogin} className='space-y-4'>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						className='w-full rounded border border-gray-300 p-2'
						required
					/>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						className='w-full rounded border border-gray-300 p-2'
						required
					/>
					<button
						type='submit'
						disabled={loading}
						className='w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700'
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				{error && <p className='mt-2 text-sm text-red-500'>{error}</p>}

				<div className='mt-6'>
					<button
						onClick={handleGoogleLogin}
						className='w-full rounded bg-red-500 p-2 text-white hover:bg-red-600'
					>
						Sign in with Google
					</button>
				</div>
			</div>
		</div>
	);
}
