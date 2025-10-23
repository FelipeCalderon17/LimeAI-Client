export class CreateNoteWithFileData {
  private readonly _patientId: string;
  private readonly _file: File;

  constructor(patientId: string, file: File | null | undefined) {
    if (!patientId || patientId.trim() === "") {
      throw new Error("Patient is required.");
    }
    if (!file) {
      throw new Error("File is required for this operation.");
    }
    if (file.size === 0) {
      throw new Error("File cannot be empty.");
    }
    if (!file.type.startsWith("audio/")) {
      throw new Error("File must be an audio type.");
    }
    this._patientId = patientId;
    this._file = file;
  }

  public getPatientId(): string {
    return this._patientId;
  }

  public getFile(): File {
    return this._file;
  }
}
