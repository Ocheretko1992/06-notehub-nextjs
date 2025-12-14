import { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';

interface NoteListProp {
  notes: Note[];
}
const NoteList = ({ notes }: NoteListProp) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(item => (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <Link href={`/notes/${item.id}`} className={css.button}>
              View details
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default NoteList;
