"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});

			if (response.ok) {
				window.location.href = "/login";
			}
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				<div className="flex items-center gap-4">
					<h1 className="text-lg font-semibold text-gray-900 dark:text-white">
						Portfolio Management
					</h1>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						Admin Dashboard
					</span>
				</div>
				<Button
					variant="outline"
					onClick={handleLogout}
					className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
				>
					Logout
				</Button>
			</div>
		</div>
	);
}
