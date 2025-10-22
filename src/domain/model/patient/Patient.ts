import { Note } from "../note/Note";

export class Patient {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly dateOfBirth: Date,
    private readonly notes: Note[]
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  public getNotes(): Note[] {
    return this.notes;
  }

  public getInitials(): string {
    const parts = this.name.split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return this.name.substring(0, 2).toUpperCase();
  }

  public getAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.dateOfBirth.getFullYear();
    const m = today.getMonth() - this.dateOfBirth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < this.dateOfBirth.getDate())) {
      age--;
    }
    return age;
  }
}
