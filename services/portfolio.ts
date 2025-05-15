import { Portfolio } from "@/types/portfolio";

export async function getPortfolios(): Promise<Portfolio[]> {
	const response = await fetch("/api/portfolio");
	if (!response.ok) {
		throw new Error("Failed to fetch portfolio");
	}
	return response.json();
}
