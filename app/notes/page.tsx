import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

export default async function Notes() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({

    queryKey: ['notes'],
    queryFn: () => fetchNotes({ search: '', page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
