import { useState, useEffect, useMemo } from "react";
import { container } from "tsyringe";
import { GetPatientsUseCase } from "@/domain/use-case/patient/GetPatientsUseCase";
import { Patient } from "@/domain/model/patient/Patient";

export function usePatients() {
  const getPatientsUseCase = useMemo(
    () => container.resolve<GetPatientsUseCase>("GetPatientsUseCase"),
    []
  );

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        setIsLoading(true);
        const data = await getPatientsUseCase.execute();
        setPatients(data);
      } catch (err: any) {
        setError(err.message || "Failed to load patients");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPatients();
  }, [getPatientsUseCase]);

  return { patients, isLoading, error };
}
