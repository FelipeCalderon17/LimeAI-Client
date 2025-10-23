import { Note } from "@/domain/model/note/Note";
import { CreateNoteData } from "./dto/CreateNoteData";
import { CreateNoteWithFileData } from "./dto/CreateNoteWithFileData";

export interface NoteRepository {
  getNotes(): Promise<Note[]>;
  getNoteById(id: string): Promise<Note | null>;
  createNote(data: CreateNoteData): Promise<Note>;
  createNoteWithFile(data: CreateNoteWithFileData): Promise<Note>;
}
