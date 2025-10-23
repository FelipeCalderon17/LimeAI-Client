import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/presentation/component/ui/Card";
import { useNoteById } from "@/presentation/hooks/useNoteById";
import { User } from "lucide-react";

interface NoteDetailViewProps {
  noteId: string;
}

export function NoteDetailView({ noteId }: NoteDetailViewProps) {
  const { note, isLoading, error } = useNoteById(noteId);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <div>
          <CardTitle className="text-lg font-medium">
            {note ? `${note.getPatientName()}'s Note` : "Note Details"}
          </CardTitle>
          <CardDescription>
            {note
              ? `Created on ${note.getFormattedDate()}`
              : "Transcription / Summary and Patient Info"}
          </CardDescription>
        </div>
        {note && (
          <div className="flex items-center space-x-3 text-sm text-muted-foreground border p-3 rounded-md">
            <User className="h-5 w-5" />
            <div className="flex flex-col text-right">
              <span className="font-semibold text-foreground">
                {note.getPatientName()}
              </span>
              <span className="text-xs">
                DOB: {note.getFormattedPatientDOB()}
              </span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-6 overflow-y-auto">
        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Loading note details...
          </p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!isLoading && !error && !note && (
          <p className="text-sm text-muted-foreground">Note not found.</p>
        )}
        {note && (
          <div>
            <h3 className="text-md font-semibold mb-2">
              Content (Summary / Transcription)
            </h3>
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {note.getProcessedNote() || note.getRawNote()}
            </p>
            {note.getProcessedNote() &&
              note.getProcessedNote() !== note.getRawNote() && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-md font-semibold mb-2">
                    Original Input (Raw)
                  </h3>
                  <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                    {note.getRawNote()}
                  </p>
                </div>
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
