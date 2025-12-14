'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from '@/components/NoteDetails/NoteDetails';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: prop,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError) {
    return <p>Something went wrong.</p>;
  }
  if (!prop) {
    return <p>Something went wrong.</p>;
  }
  return (
    <>
      <NoteDetails prop={prop} />
    </>
  );
}
