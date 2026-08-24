import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const galleryCol = collection(db, 'gallery_items');
    const q = query(galleryCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const items = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({ items });
  } catch (error: any) {
    // If Firestore fails/unconfigured, return empty array cleanly
    return NextResponse.json({ items: [] });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, publicId } = await req.json();

    if (id) {
      await deleteDoc(doc(db, 'gallery_items', id));
    }

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete' }, { status: 500 });
  }
}
