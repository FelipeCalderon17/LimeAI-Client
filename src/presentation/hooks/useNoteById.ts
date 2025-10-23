import { useState, useEffect, useMemo } from "react";
import { container } from "tsyringe";
import { GetNoteByIdUseCase } from "@/domain/use-case/note/GetNoteByIdUseCase";
import { Note } from "@/domain/model/note/Note";

export function useNoteById(noteId: string | null) {
  const getNoteByIdUseCase = useMemo(
    () => container.resolve<GetNoteByIdUseCase>("GetNoteByIdUseCase"),
    []
  );

  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!noteId) {
      setNote(null);
      setIsLoading(false);
      setError(null);
      return;
    }
    async function fetchNoteDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getNoteByIdUseCase.execute(noteId!);
        setNote(data);
      } catch (err: any) {
        setError(err.message || "Failed to load note details");
        setNote(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNoteDetails();
  }, [noteId, getNoteByIdUseCase]);
  return { note, isLoading, error };
}
