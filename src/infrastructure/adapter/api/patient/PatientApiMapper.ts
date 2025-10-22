import { Patient } from "@/domain/model/patient/Patient";

interface PatientApiResponse {
  id: string;
  name: string;
  dob: string;
}

export class PatientApiMapper {
  public static toDomain(apiPatient: PatientApiResponse): Patient {
    return new Patient(
      apiPatient.id,
      apiPatient.name,
      new Date(apiPatient.dob),
      []
    );
  }

  public static bulkToDomain(apiPatients: PatientApiResponse[]): Patient[] {
    return apiPatients.map(this.toDomain);
  }
}
