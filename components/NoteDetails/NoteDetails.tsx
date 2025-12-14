import { Note } from '@/types/note';
import css from './NoteDetails.module.css';

interface NoteDetailsProp {
  note: Note;
}

const NoteDetails = ({ note }: NoteDetailsProp) => {
  const noteData = note.updatedAt
    ? `Updated at: ${note?.updatedAt}`
    : `Created at: ${note?.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <h2 className={css.content}>id: {note.id}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{noteData}</p>
      </div>
    </div>
  );
};
export default NoteDetails;
