import { injectable } from "tsyringe";
import { PatientRepository } from "@/domain/gateway/patient/PatientRepository";
import { Patient } from "@/domain/model/patient/Patient";
import apiClient from "../api.client";
import { PatientApiMapper } from "./PatientApiMapper";

interface PatientApiResponse {
  id: string;
  name: string;
  dob: string;
}

@injectable()
export class PatientApiRepository implements PatientRepository {
  async getPatients(): Promise<Patient[]> {
    try {
      const responseData = await apiClient<PatientApiResponse[]>("/patients", {
        method: "GET",
      });
      return PatientApiMapper.bulkToDomain(responseData);
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw new Error("Failed to fetch patients.");
    }
  }

  async existsById(_id: string): Promise<boolean> {
    // (Lo implementaremos cuando lo necesitemos)
    return true;
  }
}
