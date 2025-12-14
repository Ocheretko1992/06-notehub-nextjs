import { Note } from '@/types/note';
import css from './NoteDetails.module.css';

interface NoteDetailsProp {
  prop: Note;
}

const NoteDetails = ({ prop }: NoteDetailsProp) => {
  const noteData = prop.updatedAt
    ? `Updated at: ${prop?.updatedAt}`
    : `Created at: ${prop?.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{prop.title}</h2>
        </div>
        <h2 className={css.content}>id: {prop.id}</h2>
        <p className={css.content}>{prop.content}</p>
        <p className={css.date}>{noteData}</p>
      </div>
    </div>
  );
};
export default NoteDetails;
