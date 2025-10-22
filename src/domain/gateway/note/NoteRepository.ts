import { Note } from "@/domain/model/note/Note";

export interface NoteRepository {
  getNotes(): Promise<Note[]>;
}
