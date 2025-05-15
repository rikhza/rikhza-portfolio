export async function getGithubProjects() {
  // In a real implementation, this would fetch from the GitHub API
  // For example:
  // const res = await fetch('https://api.github.com/users/rikhza/repos');
  // if (!res.ok) throw new Error('Failed to fetch GitHub repositories');
  // return res.json();

  // For demo purposes, we'll return mock data
  return [
    {
      id: 1,
      name: "document-intelligence-system",
      description: "A document tracking and intelligence system built for government agencies",
      html_url: "https://github.com/rikhza/document-intelligence-system",
      homepage: "https://docs-intel.vercel.app",
      stargazers_count: 24,
      language: "TypeScript",
    },
    // ... other repos
  ]
}
