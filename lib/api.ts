import axios from 'axios';
import { Note } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
// const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ParamsProp {
  page: number;
  search: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface createNoteProps {
  id?: string;
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async ({ page, search }: ParamsProp) => {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 10,
      search,
    },
  });
  return data;
};
//*=======================================================================================

export const fetchNoteById = async (id: string) => {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};
//*=======================================================================================
export const createNote = async (query: createNoteProps) => {
  const { data } = await axios.post<Note>(`/notes`, query);
  return data;
};
//*=======================================================================================
export const deleteNote = async (id: string) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};
