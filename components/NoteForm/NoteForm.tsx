import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NoteTag } from '@/types/note';
import Error from "@/components/Error/Error"

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onSuccessClose: () => void;
}

const validation = Yup.object().shape({
  title: Yup.string().trim().min(3).max(50).required(),
  content: Yup.string().trim().max(500),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']),
});

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Personal',
};

const NoteForm = ({ onSuccessClose }: NoteFormProps) => {
  const id = useId();
  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccessClose();
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    options: FormikHelpers<NoteFormValues>
  ) => {
    mutate({ ...values, tag: values.tag as NoteTag });

    options.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validation}
    >
      {({isValid, dirty}) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${id}-title`}>Title</label>
            <Field
              id={`${id}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${id}-content`}>Content</label>
            <Field
              id={`${id}-content`}
              as="textarea"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${id}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${id}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              onClick={onSuccessClose}
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!(isValid && dirty) || isPending}
            >
              {isPending ? 'Creating...' : 'Create note'}
            </button>
            {isError && <Error />}
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default NoteForm;
