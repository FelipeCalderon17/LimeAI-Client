import { injectable } from "tsyringe";
import type { NoteRepository } from "@/domain/gateway/note/NoteRepository";
import { Note } from "@/domain/model/note/Note";

@injectable()
export class GetNotesUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepository.getNotes();
  }
}
