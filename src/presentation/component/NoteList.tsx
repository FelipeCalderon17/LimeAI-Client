import { Button } from "@/presentation/component/ui/Button";
import { Plus } from "lucide-react";
import { NoteListItem } from "./NoteListItem";
import { useNotes } from "@/presentation/hooks/useNotes";

export function NoteList() {
  const { notes, isLoading, error } = useNotes();
  const activeNoteId = notes.length > 0 ? notes[0].getId() : null;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-bold">Notes</h2>
        <Button size="sm">
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
              patientName={note.getPatientName()}
              date={note.getFormattedDate()}
              preview={note.getPreview()}
              isSelected={note.getId() === activeNoteId}
            />
          ))}
      </div>
    </div>
  );
}
