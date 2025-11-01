import NotePreviewClient from "@/app/notes/[id]/NotePreview.client";

export default function NoteModalPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <NotePreviewClient id={id} />;
}
