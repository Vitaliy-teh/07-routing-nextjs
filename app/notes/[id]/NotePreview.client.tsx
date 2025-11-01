"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/notes";
import { Modal } from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <div className={css.loading}>Loading...</div>
      </Modal>
    );

  if (error || !note)
    return (
      <Modal onClose={handleClose}>
        <div className={css.error}>Failed to load note</div>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <div className={css.content}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.text}>{note.content}</p>
        <div className={css.meta}>
          <span className={css.tag}>{note.tag}</span>
          <span className={css.date}>{new Date(note.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </Modal>
  );
}
