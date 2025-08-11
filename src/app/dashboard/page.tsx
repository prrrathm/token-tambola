"use client";

import AuthGuard from "@/components/auth/auth-guard";
import UserNav from "@/components/auth/user-nav";
import { useSession } from "next-auth/react";

function DashboardContent() {
	const { data: session } = useSession();

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Navigation */}
			<nav className='bg-white shadow-sm'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='flex h-16 items-center justify-between'>
						<div className='flex items-center'>
							<h1 className='text-xl font-bold text-gray-900'>Token Tambola</h1>
						</div>
						<UserNav />
					</div>
				</div>
			</nav>

			{/* Main content */}
			<main className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
				<div className='px-4 py-6 sm:px-0'>
					<div className='rounded-lg border-4 border-dashed border-gray-200 p-8'>
						<div className='text-center'>
							<h2 className='mb-4 text-2xl font-bold text-gray-900'>
								Welcome, {session?.user?.name || session?.user?.email}!
							</h2>
							<p className='mb-8 text-gray-600'>
								Ready to play some Tambola? Create a new game or join an existing one.
							</p>

							<div className='space-x-4'>
								<button className='rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none'>
									Create Game
								</button>
								<button className='rounded-md bg-gray-600 px-6 py-3 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none'>
									Join Game
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default function Dashboard() {
	return (
		<AuthGuard>
			<DashboardContent />
		</AuthGuard>
	);
}
