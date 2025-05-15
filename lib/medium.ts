export async function getMediumPosts() {
	try {
		const response = await fetch(
			`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@its.rzm11&api_key=yhn20panhqsdeclalwpfdnsosnq0ieiloqexdko1&count=10&include=content,thumbnail`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (data.status !== "ok") {
			throw new Error(data.message || "Failed to fetch articles");
		}

		return data.items || [];
	} catch (error) {
		console.error("Error fetching Medium posts:", error);
		throw error;
	}
}
