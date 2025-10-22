import "reflect-metadata";
import { container } from "tsyringe";
import { PatientRepository } from "@/domain/gateway/patient/PatientRepository";
import { GetPatientsUseCase } from "@/domain/use-case/patient/GetPatientsUseCase";
import { GetNotesUseCase } from "@/domain/use-case/note/GetNotesUseCase";
import { NoteRepository } from "@/domain/gateway/note/NoteRepository";

container.register<GetPatientsUseCase>("GetPatientsUseCase", {
  useFactory: (c) =>
    new GetPatientsUseCase(c.resolve<PatientRepository>("PatientRepository")),
});

container.register<GetNotesUseCase>("GetNotesUseCase", {
  useFactory: (c) =>
    new GetNotesUseCase(c.resolve<NoteRepository>("NoteRepository")),
});
