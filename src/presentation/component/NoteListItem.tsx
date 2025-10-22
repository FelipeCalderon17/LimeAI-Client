import { cn } from "@/lib/utils";

interface NoteListItemProps {
  patientName: string;
  date: string;
  preview: string;
  isSelected: boolean;
}

export function NoteListItem({
  patientName,
  date,
  preview,
  isSelected,
}: NoteListItemProps) {
  return (
    <button
      className={cn(
        "flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all",
        "hover:bg-secondary",
        isSelected && "bg-secondary"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-semibold">{patientName}</span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="line-clamp-2 text-xs text-muted-foreground">{preview}</p>
    </button>
  );
}
