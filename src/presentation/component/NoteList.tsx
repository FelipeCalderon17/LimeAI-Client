import { NoteListItem } from "./NoteListItem";
import { Note } from "@/domain/model/note/Note";
import { Button } from "@/presentation/component/ui/Button";
import { Plus } from "lucide-react";

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  selectedNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
  onNewNoteClick: () => void;
}

export function NoteList({
  notes,
  isLoading,
  error,
  selectedNoteId,
  onNoteSelect,
  onNewNoteClick,
}: NoteListProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-bold">Notes</h2>
        <Button size="sm" onClick={onNewNoteClick}>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-2">
        {isLoading && (
          <p className="p-4 text-center text-sm text-muted-foreground">
            Loading notes...
          </p>
        )}
        {error && (
          <p className="p-4 text-center text-sm text-red-500">{error}</p>
        )}
        {!isLoading &&
          !error &&
          notes.map((note) => (
            <NoteListItem
              key={note.getId()}
              noteId={note.getId()}
              patientName={note.getPatientName()}
              date={note.getFormattedDate()}
              preview={note.getPreview()}
              isSelected={note.getId() === selectedNoteId}
              onClick={onNoteSelect}
            />
          ))}
      </div>
    </div>
  );
}
