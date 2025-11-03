// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchNotes } from "@/lib/api/notes";
// import NoteList from "@/components/NotesList/NotesList";
// import type { Note } from "@/types/note";

// interface PageProps {
//   params: { tag?: string[] };
// }

// export default function FilteredNotesPage({ params }: PageProps) {
//   const tagSegments = params?.tag ?? [];
//   const tag = tagSegments.length ? tagSegments.join("/") : "all";
//   const queryTag = tag === "all" ? undefined : (tag as string);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["notes", queryTag],
//     queryFn: () =>
//       fetchNotes({
//         page: 1,
//         perPage: 20,
//         tag: queryTag as any, // cast: lib/api handles undefined/"all"
//       }),
//     // note: fetchNotes returns { notes, totalPages }
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Failed to load notes</div>;

//   const notes: Note[] = data?.notes ?? [];

//   return (
//     <section>
//       <h2>Notes: {tag === "all" ? "All" : tag}</h2>
//       <NoteList notes={notes} />
//     </section>
//   );
// }




// import FilteredNotesClient from "./FilteredNotes.client";

// export default async function FilteredNotesPage({
//   params,
// }: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const { slug } = await params;
//   return <FilteredNotesClient tagSegments={slug ?? []} />;
// }


// import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import { fetchNotes } from "@/lib/api";
// import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

// export default async function NotesPage() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery({
//     queryKey: ["notes"],
//     queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NotesClient />
//     </HydrationBoundary>
//   );
// }

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag: Tag | string = slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { searchQuery: '', currentPage: 1, tag }],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}