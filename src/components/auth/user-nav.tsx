"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			await signIn("google", {
				callbackUrl: "/dashboard", // Redirect after sign-in
			});
		} catch (error) {
			console.error("Sign-in error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to Token Tambola
					</h2>
					<p className='mt-2 text-center text-sm text-gray-600'>
						Join the fun and play Tambola with your friends
					</p>
				</div>

				<div className='mt-8 space-y-6'>
					<button
						onClick={handleGoogleSignIn}
						disabled={isLoading}
						className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
					>
						{isLoading ? (
							<span className='flex items-center'>
								<svg
									className='mr-3 -ml-1 h-5 w-5 animate-spin text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
								>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'
									></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
									></path>
								</svg>
								Signing in...
							</span>
						) : (
							<span className='flex items-center'>
								<svg className='mr-2 h-5 w-5' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
									/>
									<path
										fill='currentColor'
										d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
									/>
									<path
										fill='currentColor'
										d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
									/>
									<path
										fill='currentColor'
										d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
									/>
								</svg>
								Continue with Google
							</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
