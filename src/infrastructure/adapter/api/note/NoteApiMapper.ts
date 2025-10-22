import { Note } from "@/domain/model/note/Note";
import { NoteApiResponse } from "./NoteApiRepository";

export class NoteApiMapper {
  public static toDomain(apiNote: NoteApiResponse): Note {
    console.log(apiNote, "here");
    return new Note(
      apiNote.id,
      new Date(apiNote.createdAt),
      apiNote.patientId,
      apiNote.rawNote,
      apiNote.processedNote,
      apiNote.patientName
    );
  }

  public static bulkToDomain(apiNotes: NoteApiResponse[]): Note[] {
    return apiNotes.map(this.toDomain);
  }
}
