import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import cloudinary from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
  const itemsMap = new Map<string, any>();

  // 1. Fetch from Firebase Firestore
  try {
    const galleryCol = collection(db, 'gallery_items');
    const snapshot = await getDocs(galleryCol);

    snapshot.docs.forEach((d) => {
      const data = d.data();
      const id = d.id;
      const url = data.url;
      if (url) {
        itemsMap.set(url, {
          id: id,
          url: url,
          title: data.title || 'Academy Photo',
          category: data.category || 'gym-training',
          publicId: data.publicId || '',
          createdAt: data.createdAt || data.timestamp || 0,
        });
      }
    });
  } catch (dbErr) {
    console.error('Firestore Gallery Fetch Error:', dbErr);
  }

  // 2. Fetch directly from Cloudinary as a seamless backup/source
  try {
    const cloudRes = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'ishagym',
      max_results: 100,
    });

    if (cloudRes.resources && cloudRes.resources.length > 0) {
      cloudRes.resources.forEach((res: any) => {
        const url = res.secure_url || res.url;
        // If not already present from Firestore, add from Cloudinary
        if (!itemsMap.has(url)) {
          // Attempt to extract title/category from tags or context
          const publicId = res.public_id;
          itemsMap.set(url, {
            id: publicId,
            url: url,
            title: res.context?.custom?.caption || 'Academy Moment',
            category: res.context?.custom?.category || 'gym-training',
            publicId: publicId,
            createdAt: new Date(res.created_at).getTime(),
          });
        }
      });
    }
  } catch (cloudErr) {
    console.warn('Cloudinary Resources Fetch Notice:', cloudErr);
  }

  // Convert map to sorted list (newest first)
  const items = Array.from(itemsMap.values()).sort((a, b) => {
    const timeA = typeof a.createdAt === 'number' ? a.createdAt : 0;
    const timeB = typeof b.createdAt === 'number' ? b.createdAt : 0;
    return timeB - timeA;
  });

  return NextResponse.json({ items }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}

export async function DELETE(req: Request) {
  try {
    const { id, publicId } = await req.json();

    if (id && db) {
      try {
        await deleteDoc(doc(db, 'gallery_items', id));
      } catch (e) {
        console.warn('Firestore doc delete notice:', e);
      }
    }

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.warn('Cloudinary destroy notice:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete' }, { status: 500 });
  }
}
