import { Patient } from "@/domain/model/patient/Patient";

export interface PatientRepository {
  getPatients(): Promise<Patient[]>;
}
