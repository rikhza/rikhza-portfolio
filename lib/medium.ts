export async function getMediumPosts() {
	if (
		!process.env.NEXT_PUBLIC_MEDIUM_USERNAME ||
		!process.env.NEXT_PUBLIC_MEDIUM_API_KEY
	) {
		throw new Error(
			"Medium API configuration is missing. Please check your environment variables."
		);
	}

	try {
		// Construct the RSS URL
		const rssUrl = `https://medium.com/feed/@${process.env.NEXT_PUBLIC_MEDIUM_USERNAME}`;
		const encodedRssUrl = encodeURIComponent(rssUrl);

		// Construct the full API URL
		const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodedRssUrl}&api_key=${process.env.NEXT_PUBLIC_MEDIUM_API_KEY}&count=10&include=content,thumbnail&order_by=pubDate&order_dir=desc`;

		const response = await fetch(apiUrl);

		if (!response.ok) {
			const error = new Error(
				`Medium API error: ${response.status} ${response.statusText}`
			);
			(error as any).status = response.status;
			(error as any).statusText = response.statusText;
			throw error;
		}

		const data = await response.json();

		if (data.status !== "ok") {
			const error = new Error(data.message || "Failed to fetch articles");
			(error as any).data = data;
			throw error;
		}

		return data.items || [];
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error(
			"An unknown error occurred while fetching Medium posts"
		);
	}
}
