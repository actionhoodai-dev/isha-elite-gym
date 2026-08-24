import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = (formData.get('title') as string) || 'Academy Highlight';
    const category = (formData.get('category') as string) || 'gym-training';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using promise wrapper
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'ishagym/gallery',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;

    // Save item metadata to Firebase Firestore
    let docId = '';
    try {
      const docRef = await addDoc(collection(db, 'gallery_items'), {
        title,
        category,
        url: imageUrl,
        publicId: publicId,
        createdAt: serverTimestamp(),
      });
      docId = docRef.id;
    } catch (dbErr) {
      console.warn('Firestore doc save warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      item: {
        id: docId,
        url: imageUrl,
        title,
        category,
        publicId,
      }
    });
  } catch (error: any) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
