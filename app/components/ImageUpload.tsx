"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
	value?: string;
	onChange: (url: string) => void;
	className?: string;
}

export default function ImageUpload({
	value,
	onChange,
	className = "",
}: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith("image/")) {
			setError("Please upload an image file");
			return;
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			setError("Image must be less than 5MB");
			return;
		}

		setError(null);
		setIsUploading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Upload failed");
			}

			onChange(data.url);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className={`space-y-4 ${className}`}>
			<div className="flex items-center gap-4">
				<Button
					type="button"
					variant="outline"
					onClick={() => fileInputRef.current?.click()}
					disabled={isUploading}
				>
					{isUploading ? "Uploading..." : "Upload Image"}
				</Button>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleUpload}
					className="hidden"
					aria-label="Upload image"
				/>
				{value && (
					<Button
						type="button"
						variant="ghost"
						onClick={() => onChange("")}
						className="text-red-500 hover:text-red-700"
					>
						Remove
					</Button>
				)}
			</div>

			{error && <p className="text-sm text-red-500">{error}</p>}

			{value && (
				<div className="relative w-full aspect-video rounded-lg overflow-hidden border">
					<Image
						src={value}
						alt="Uploaded image"
						fill
						className="object-cover"
					/>
				</div>
			)}
		</div>
	);
}
