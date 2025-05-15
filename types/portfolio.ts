export interface Portfolio {
	_id: string;
	title: string;
	description: string;
	imageUrl: string;
	technologies: string[];
	projectUrl: string;
	githubUrl: string;
	featured: boolean;
	createdAt: string;
	updatedAt: string;
	category: string;
}
