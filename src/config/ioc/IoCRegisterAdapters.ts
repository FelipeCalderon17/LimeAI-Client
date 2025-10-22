import "reflect-metadata";
import { container } from "tsyringe";
import { PatientApiRepository } from "@/infrastructure/adapter/api/patient/PatientApiRepository";
import { PatientRepository } from "@/domain/gateway/patient/PatientRepository";
import { NoteRepository } from "@/domain/gateway/note/NoteRepository";
import { NoteApiRepository } from "@/infrastructure/adapter/api/note/NoteApiRepository";

container.register<PatientRepository>("PatientRepository", {
  useClass: PatientApiRepository,
});

container.register<NoteRepository>("NoteRepository", {
  useClass: NoteApiRepository,
});
