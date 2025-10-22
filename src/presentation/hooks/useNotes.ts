import { useState, useEffect, useMemo } from "react";
import { container } from "tsyringe";
import { GetNotesUseCase } from "@/domain/use-case/note/GetNotesUseCase";
import { Note } from "@/domain/model/note/Note";

export function useNotes() {
  const getNotesUseCase = useMemo(
    () => container.resolve<GetNotesUseCase>("GetNotesUseCase"),
    []
  );

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        setIsLoading(true);
        const data = await getNotesUseCase.execute();
        setNotes(data);
      } catch (err: any) {
        setError(err.message || "Failed to load notes");
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, [getNotesUseCase]);

  return { notes, isLoading, error };
}
