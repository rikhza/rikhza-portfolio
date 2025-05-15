"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AdminHeader from "../components/AdminHeader";
import ImageUpload from "@/app/components/ImageUpload";

interface PortfolioItem {
	_id: string;
	title: string;
	description: string;
	imageUrl: string;
	technologies: string[];
	projectUrl: string;
	githubUrl: string;
	featured: boolean;
	category: "development" | "data";
}

export default function AdminPortfolioPage() {
	const [items, setItems] = useState<PortfolioItem[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [currentItem, setCurrentItem] = useState<Partial<PortfolioItem>>({
		category: "development",
		featured: false,
		technologies: [],
	});
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch("/api/auth/check", {
					credentials: "include",
				});
				if (!response.ok) {
					window.location.href = "/login";
					return;
				}
				fetchItems();
			} catch (error) {
				console.error("Auth check failed:", error);
				window.location.href = "/login";
			}
		};
		checkAuth();
	}, []);

	const fetchItems = async () => {
		try {
			const response = await fetch("/api/portfolio");
			if (!response.ok) throw new Error("Failed to fetch items");
			const data = await response.json();
			setItems(data);
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (!currentItem.category) {
				setCurrentItem((prev) => ({
					...prev,
					category: "development",
				}));
			}

			const url = isEditing
				? `/api/portfolio/${currentItem._id}`
				: "/api/portfolio";
			const method = isEditing ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...currentItem,
					category: currentItem.category || "development",
					featured: currentItem.featured || false,
					technologies: currentItem.technologies || [],
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to save item");
			}

			await fetchItems();
			resetForm();
		} catch (error) {
			console.error("Error saving item:", error);
			alert(
				error instanceof Error ? error.message : "Failed to save item"
			);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this item?")) return;

		try {
			const response = await fetch(`/api/portfolio/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) throw new Error("Failed to delete item");
			await fetchItems();
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	};

	const handleEdit = (item: PortfolioItem) => {
		setCurrentItem(item);
		setIsEditing(true);
	};

	const resetForm = () => {
		setCurrentItem({
			category: "development",
			featured: false,
			technologies: [],
		});
		setIsEditing(false);
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<AdminHeader />

			<main className="container mx-auto px-4 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Form Section */}
					<Card className="h-fit">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg">
								{isEditing
									? "Edit Portfolio Item"
									: "Add New Portfolio Item"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-1">
											Title
										</label>
										<Input
											value={currentItem.title || ""}
											onChange={(e) =>
												setCurrentItem({
													...currentItem,
													title: e.target.value,
												})
											}
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">
											Category
										</label>
										<select
											aria-label="Select project category"
											value={
												currentItem.category ||
												"development"
											}
											onChange={(e) =>
												setCurrentItem({
													...currentItem,
													category: e.target.value as
														| "development"
														| "data",
												})
											}
											className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
											required
										>
											<option value="development">
												Development
											</option>
											<option value="data">Data</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Description
									</label>
									<Textarea
										value={currentItem.description || ""}
										onChange={(e) =>
											setCurrentItem({
												...currentItem,
												description: e.target.value,
											})
										}
										required
										className="min-h-[100px]"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Project Image
									</label>
									<ImageUpload
										value={currentItem.imageUrl}
										onChange={(url) =>
											setCurrentItem({
												...currentItem,
												imageUrl: url,
											})
										}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Technologies (comma-separated)
									</label>
									<Input
										value={
											currentItem.technologies?.join(
												", "
											) || ""
										}
										onChange={(e) =>
											setCurrentItem({
												...currentItem,
												technologies: e.target.value
													.split(",")
													.map((tech) => tech.trim()),
											})
										}
										required
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-1">
											Project URL
										</label>
										<Input
											value={currentItem.projectUrl || ""}
											onChange={(e) =>
												setCurrentItem({
													...currentItem,
													projectUrl: e.target.value,
												})
											}
										/>
									</div>

									<div>
										<label className="block text-sm font-medium mb-1">
											GitHub URL
										</label>
										<Input
											value={currentItem.githubUrl || ""}
											onChange={(e) =>
												setCurrentItem({
													...currentItem,
													githubUrl: e.target.value,
												})
											}
											required
										/>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										id="featured"
										checked={currentItem.featured || false}
										onChange={(e) =>
											setCurrentItem({
												...currentItem,
												featured: e.target.checked,
											})
										}
										className="rounded border-gray-300"
									/>
									<label
										htmlFor="featured"
										className="text-sm font-medium"
									>
										Featured Project
									</label>
								</div>

								<div className="flex gap-2 pt-4">
									<Button type="submit" className="flex-1">
										{isEditing ? "Update" : "Add"} Item
									</Button>
									{isEditing && (
										<Button
											type="button"
											variant="outline"
											onClick={resetForm}
											className="flex-1"
										>
											Cancel
										</Button>
									)}
								</div>
							</form>
						</CardContent>
					</Card>

					{/* Table Section */}
					<Card>
						<CardHeader className="pb-4">
							<CardTitle className="text-lg">
								Portfolio Items
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Title</TableHead>
											<TableHead>Category</TableHead>
											<TableHead>Featured</TableHead>
											<TableHead className="text-right">
												Actions
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{items.map((item) => (
											<TableRow key={item._id}>
												<TableCell className="font-medium">
													{item.title}
												</TableCell>
												<TableCell className="capitalize">
													{item.category}
												</TableCell>
												<TableCell>
													{item.featured ? (
														<span className="text-green-600">
															Yes
														</span>
													) : (
														<span className="text-gray-500">
															No
														</span>
													)}
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																handleEdit(item)
															}
														>
															Edit
														</Button>
														<Button
															variant="destructive"
															size="sm"
															onClick={() =>
																handleDelete(
																	item._id
																)
															}
														>
															Delete
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
