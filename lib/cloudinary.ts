import imageCompression from 'browser-image-compression';

export async function uploadToCloudinary(file: File): Promise<string> {
    // Compression options
    const options = {
        maxSizeMB: 0.2, // Target max 200kb
        maxWidthOrHeight: 1920, // Maintain high resolution
        useWebWorker: true,
        initialQuality: 0.75 // Slightly lower initial quality to help reach the 200kb target while staying clear
    };

    let fileToUpload = file;

    try {
        console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
        fileToUpload = await imageCompression(file, options);
        console.log(`Compressed size: ${(fileToUpload.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (error) {
        console.error('Compression failed, uploading original file:', error);
        // Fallback to original file if compression fails
    }

    const formData = new FormData();
    formData.append('file', fileToUpload);

    console.log('--- Calling Internal Upload API ---');
    console.log('File Name:', fileToUpload.name);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Upload Error:', data);
        throw new Error(data.error || 'Failed to upload image');
    }

    return data.url;
}
export function getOptimizedImageUrl(url: string, width: number = 800, height?: number) {
    if (!url || !url.includes('cloudinary.com')) return url;

    // Split the URL to insert transformations
    // Example: https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;

    const transformation = height
        ? `c_fill,g_auto,w_${width},h_${height},f_auto,q_auto`
        : `w_${width},f_auto,q_auto`;

    return `${parts[0]}/upload/${transformation}/${parts[1]}`;
}
