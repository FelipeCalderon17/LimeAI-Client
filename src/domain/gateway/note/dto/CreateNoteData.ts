export class CreateNoteData {
  private readonly _patientId: string;
  private readonly _rawNote: string;

  constructor(patientId: string, rawNote: string) {
    if (!patientId || patientId.trim() === "") {
      throw new Error("Patient is required.");
    }
    if (!rawNote || rawNote.trim() === "") {
      throw new Error("Note content cannot be empty.");
    }
    this._patientId = patientId;
    this._rawNote = rawNote;
  }

  public getPatientId(): string {
    return this._patientId;
  }

  public getRawNote(): string {
    return this._rawNote;
  }
}
