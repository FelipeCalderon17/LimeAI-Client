export class Note {
  constructor(
    private readonly id: string,
    private readonly createdAt: Date,
    private readonly patientId: string,
    private readonly rawNote: string,
    private readonly processedNote: string | null,
    private readonly patientName: string,
    private readonly patientDateOfBirth: Date | null
  ) {}

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getPatientId(): string {
    return this.patientId;
  }

  public getRawNote(): string {
    return this.rawNote;
  }

  public getProcessedNote(): string | null {
    return this.processedNote;
  }

  public getPatientName(): string {
    return this.patientName ?? "Unknown Patient";
  }
  public getPatientDateOfBirth(): Date | null {
    return this.patientDateOfBirth;
  }

  public getPreview(): string {
    const content = this.processedNote || this.rawNote;
    if (content.length <= 100) {
      return content;
    }
    const truncated = content.substring(0, 100).trim();
    return `${truncated}...`;
  }

  public getFormattedDate(): string {
    return this.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  public getFormattedPatientDOB(): string {
    if (!this.patientDateOfBirth) return "N/A";
    try {
      return this.patientDateOfBirth.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting patient DOB:", e);
      return "Invalid Date";
    }
  }
}
