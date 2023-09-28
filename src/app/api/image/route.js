import { upload, s3 } from "@/utils/uploadImage";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    console.log('req :>> ', req.file);

    const file = req.file;

    if (!file) {
      return NextResponse.json({ Error: "No file uploaded" }, { status: 400 });
    }

    const params = {
      Bucket: "your-bucket-name",
      Key: `uploads/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));


    return NextResponse.json(
      { message: "Image registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}
