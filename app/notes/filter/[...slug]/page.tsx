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