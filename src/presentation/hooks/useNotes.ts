import { useState, useEffect, useMemo, useCallback } from "react";
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
  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getNotesUseCase.execute();
      setNotes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  }, [getNotesUseCase]);
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);
  return { notes, isLoading, error, refetchNotes: fetchNotes };
}
