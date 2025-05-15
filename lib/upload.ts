import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const uploadDir = path.join(process.cwd(), "public/uploads");
		try {
			await fs.mkdir(uploadDir, { recursive: true });
			cb(null, uploadDir);
		} catch (error) {
			cb(error as Error, uploadDir);
		}
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname +
				"-" +
				uniqueSuffix +
				path.extname(file.originalname)
		);
	},
});

const fileFilter = (
	req: any,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Not an image! Please upload only images."));
	}
};

export const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
	},
});

export const processImage = async (filePath: string) => {
	const filename = path.basename(filePath);
	const outputPath = path.join(
		process.cwd(),
		"public/uploads/processed",
		filename
	);

	await fs.mkdir(path.dirname(outputPath), { recursive: true });

	await sharp(filePath)
		.resize(800, 600, {
			fit: "inside",
			withoutEnlargement: true,
		})
		.jpeg({ quality: 80 })
		.toFile(outputPath);

	await fs.unlink(filePath); // Delete original file

	return `/uploads/processed/${filename}`;
};
