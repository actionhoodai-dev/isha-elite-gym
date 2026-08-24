import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

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

    // Upload to Cloudinary using upload_stream with tags & context
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'ishagym/gallery',
          resource_type: 'image',
          tags: ['ishagym', category],
          context: `caption=${title}|category=${category}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = uploadResult.secure_url || uploadResult.url;
    const publicId = uploadResult.public_id;
    const now = Date.now();

    // Save item metadata to Firebase Firestore
    let docId = publicId;
    try {
      if (db) {
        const docRef = await addDoc(collection(db, 'gallery_items'), {
          title,
          category,
          url: imageUrl,
          publicId: publicId,
          createdAt: now,
          dateString: new Date().toISOString(),
        });
        docId = docRef.id;
      }
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
        createdAt: now,
      }
    });
  } catch (error: any) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
