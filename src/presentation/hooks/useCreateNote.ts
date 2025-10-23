import { useState, useMemo, useCallback } from "react";
import { container } from "tsyringe";
import { CreateNoteUseCase } from "@/domain/use-case/note/CreateNoteUseCase";
import { CreateNoteData } from "@/domain/gateway/note/dto/CreateNoteData";
import { CreateNoteWithFileData } from "@/domain/gateway/note/dto/CreateNoteWithFileData";

type CreateNoteResult = { success: boolean; note?: any };

export function useCreateNote() {
  const createNoteUseCase = useMemo(
    () => container.resolve<CreateNoteUseCase>("CreateNoteUseCase"),
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNote = useCallback(
    async (
      patientId: string,
      rawNote: string,
      file: File | null
    ): Promise<CreateNoteResult> => {
      setIsLoading(true);
      setError(null);

      try {
        let newNote;

        if (file) {
          const fileData = new CreateNoteWithFileData(patientId, file);
          newNote = await createNoteUseCase.executeWithFile(fileData);
        } else {
          const textData = new CreateNoteData(patientId, rawNote);
          newNote = await createNoteUseCase.execute(textData);
        }
        setIsLoading(false);
        return { success: true, note: newNote };
      } catch (err: any) {
        setError(err.message || "Failed to create note");
        setIsLoading(false);
        return { success: false };
      }
    },
    [createNoteUseCase]
  );

  return { createNote, isLoading, error };
}
