import { Note } from "@/domain/model/note/Note";
import { NoteApiResponse } from "./NoteApiRepository";

export class NoteApiMapper {
  public static toDomain(apiNote: NoteApiResponse): Note {
    let dob: Date | null = null;
    if (apiNote.patientDateOfBirth) {
      try {
        dob = new Date(apiNote.patientDateOfBirth);
      } catch (e) {
        console.error(
          "Failed to parse patientDateOfBirth:",
          apiNote.patientDateOfBirth,
          e
        );
      }
    }
    return new Note(
      apiNote.id,
      new Date(apiNote.createdAt),
      apiNote.patientId,
      apiNote.rawNote,
      apiNote.processedNote,
      apiNote.patientName,
      dob
    );
  }

  public static bulkToDomain(apiNotes: NoteApiResponse[]): Note[] {
    return apiNotes.map(this.toDomain);
  }
}
