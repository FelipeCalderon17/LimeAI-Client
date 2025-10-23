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
}
