"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// Check if user is already logged in
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch("/api/auth/check", {
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					if (data.authenticated) {
						window.location.href = "/admin/portfolio";
					}
				}
			} catch (error) {
				console.error("Auth check failed:", error);
			}
		};
		checkAuth();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			console.log("Attempting login...");
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
				credentials: "include",
			});

			const data = await response.json();
			console.log("Login response:", data);

			if (!response.ok) {
				throw new Error(data.error || "Login failed");
			}

			if (!data.success) {
				throw new Error("Login failed");
			}

			// Wait for cookie to be set
			// Force redirect after successful login
			setTimeout(() => {
				console.log("Login successful, redirecting...");
				window.location.href = "/admin/portfolio";
			}, 100);
		} catch (err) {
			console.error("Login error:", err);
			setError(err instanceof Error ? err.message : "Login failed");
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Admin Login
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Username
							</label>
							<Input
								id="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								className="mt-1"
								disabled={isLoading}
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Password
							</label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="mt-1"
								disabled={isLoading}
							/>
						</div>

						{error && (
							<div className="text-red-500 text-sm text-center">
								{error}
							</div>
						)}

						<Button
							type="submit"
							className="w-full"
							disabled={isLoading}
						>
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
