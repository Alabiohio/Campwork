import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise<NextResponse>((resolve) => {
            cloudinary.uploader.upload_stream(
                { folder: 'campwork_products' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        return resolve(NextResponse.json({ error: error.message }, { status: 500 }));
                    }
                    return resolve(NextResponse.json({ url: result?.secure_url }));
                }
            ).end(buffer);
        });

    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
