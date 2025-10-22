import { injectable } from "tsyringe";
import type { PatientRepository } from "@/domain/gateway/patient/PatientRepository";
import { Patient } from "@/domain/model/patient/Patient";

@injectable()
export class GetPatientsUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(): Promise<Patient[]> {
    return this.patientRepository.getPatients();
  }
}
