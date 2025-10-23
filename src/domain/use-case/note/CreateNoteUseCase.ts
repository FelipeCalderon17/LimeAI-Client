import { injectable } from "tsyringe";
import type { NoteRepository } from "@/domain/gateway/note/NoteRepository";
import { CreateNoteData } from "@/domain/gateway/note/dto/CreateNoteData";
import { Note } from "@/domain/model/note/Note";
import { CreateNoteWithFileData } from "@/domain/gateway/note/dto/CreateNoteWithFileData";

@injectable()
export class CreateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(data: CreateNoteData): Promise<Note> {
    return this.noteRepository.createNote(data);
  }

  async executeWithFile(data: CreateNoteWithFileData): Promise<Note> {
    return this.noteRepository.createNoteWithFile(data);
  }
}
