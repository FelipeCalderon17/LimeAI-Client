import { injectable } from "tsyringe";
import type { NoteRepository } from "@/domain/gateway/note/NoteRepository";
import { Note } from "@/domain/model/note/Note";

@injectable()
export class GetNoteByIdUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(id: string): Promise<Note | null> {
    const note = await this.noteRepository.getNoteById(id);
    return note;
  }
}
