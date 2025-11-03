"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";

interface Props {
  tagSegments: string[];
}

export default function FilteredNotesClient({ tagSegments }: Props) {
  const tag = tagSegments.length ? tagSegments.join("/") : "all";
  const queryTag = tag === "all" ? undefined : (tag as string);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", queryTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag: queryTag as any,
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load notes</div>;

  const notes: Note[] = data?.notes ?? [];

  return (
    <section>
      <h2>Notes: {tag === "all" ? "All" : tag}</h2>
      <NoteList notes={notes} />
    </section>
  );
}
