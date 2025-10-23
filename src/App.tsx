// src/App.tsx
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/presentation/component/ui/Card";
import { Button } from "@/presentation/component/ui/Button";
import { Plus } from "lucide-react";
import { NoteList } from "@/presentation/component/NoteList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/component/ui/Select";
import { Label } from "@/presentation/component/ui/Label";
import { Input } from "@/presentation/component/ui/Input";
import { Separator } from "@/presentation/component/ui/Separator";
import { NoteDetailView } from "@/presentation/component/NoteDetailView";
import { useNotes } from "@/presentation/hooks/useNotes";
import { useCreateNote } from "@/presentation/hooks/useCreateNote";
// Asegúrate que la ruta sea correcta, probablemente necesites el alias '@'
import { ThemeToggle } from "@/presentation/component/ThemeToggle";
import { usePatients } from "./presentation/hooks/usePatient";
import { Textarea } from "./presentation/component/ui/TextArea";

function App() {
  // --- Hooks y Estado (Sin cambios) ---
  const {
    patients,
    isLoading: isLoadingPatients,
    error: patientsError,
  } = usePatients();
  const {
    notes,
    isLoading: isLoadingNotes,
    error: notesError,
    refetchNotes,
  } = useNotes();
  const {
    createNote,
    isLoading: isCreatingNote,
    error: createNoteError,
  } = useCreateNote();

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [rawNote, setRawNote] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  // --- Manejadores (Sin cambios) ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setRawNote("");
    }
  };
  const handleNoteSelect = (noteId: string) => {
    setSelectedNoteId(noteId);
  };
  const handleNewNoteClick = () => {
    setSelectedNoteId(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createNote(selectedPatientId, rawNote, selectedFile);
    if (result.success) {
      refetchNotes();
      setSelectedPatientId("");
      setRawNote("");
      setSelectedFile(null);
      const fileInput = document.getElementById(
        "note-audio"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  // --- JSX (Layout Corregido) ---
  return (
    // 1. Contenedor principal: Columna vertical, altura completa
    <div className="flex h-screen w-full flex-col bg-background">
      {/* 2. Header: Altura fija, no se encoge */}
      <header className="flex h-14 shrink-0 items-center justify-end border-b px-4 lg:h-[60px] lg:px-6">
        <ThemeToggle />
      </header>
      {/* 3. Área de contenido principal: Fila horizontal, toma el espacio restante, oculta overflow */}
      <div className="flex flex-1 overflow-hidden">
        {/* 4. Panel Izquierdo (Sidebar): Ancho fijo, no se encoge, scroll vertical */}
        <aside className="w-[380px] shrink-0 border-r overflow-y-auto">
          <NoteList
            notes={notes}
            isLoading={isLoadingNotes}
            error={notesError}
            selectedNoteId={selectedNoteId}
            onNoteSelect={handleNoteSelect}
            onNewNoteClick={handleNewNoteClick}
          />
        </aside>

        {/* 5. Panel Derecho (Main): Toma el espacio restante, scroll vertical */}
        <main className="flex flex-1 flex-col items-center justify-start p-6 pt-4 overflow-y-auto">
          {" "}
          {/* Centra horizontalmente, alinea arriba verticalmente */}
          {/* Wrapper para controlar el ancho máximo del contenido */}
          <div className="w-full max-w-2xl">
            {selectedNoteId ? (
              <NoteDetailView noteId={selectedNoteId} />
            ) : (
              <form onSubmit={handleSubmit}>
                <Card>
                  {/* --- Contenido del Formulario (sin cambios internos) --- */}
                  <CardHeader>
                    <CardTitle>Create new note</CardTitle>
                    <CardDescription>
                      Add a new clinical note by text or audio upload.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-6">
                      {/* Selector Paciente */}
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="patient">Select Patient</Label>
                        <Select
                          value={selectedPatientId}
                          onValueChange={setSelectedPatientId}
                          disabled={isLoadingPatients || isCreatingNote}
                        >
                          <SelectTrigger id="patient">
                            <SelectValue
                              placeholder={
                                isLoadingPatients
                                  ? "Loading patients..."
                                  : "Choose a patient..."
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {patients.map((patient) => (
                              <SelectItem
                                key={patient.getId()}
                                value={patient.getId()}
                              >
                                {patient.getName()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {patientsError && (
                          <p className="text-sm text-red-500">
                            {patientsError}
                          </p>
                        )}
                      </div>
                      {/* Textarea */}
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="note-text">
                          Note Content (Option 1)
                        </Label>
                        <Textarea
                          id="note-text"
                          placeholder="Type or paste the clinical note here..."
                          rows={5}
                          value={rawNote}
                          onChange={(e) => {
                            setRawNote(e.target.value);
                            setSelectedFile(null);
                            const fileInput = document.getElementById(
                              "note-audio"
                            ) as HTMLInputElement;
                            if (fileInput) fileInput.value = "";
                          }}
                          disabled={isCreatingNote}
                        />
                      </div>
                      {/* Divisor */}
                      <div className="flex items-center space-x-2">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">
                          OR
                        </span>
                        <Separator className="flex-1" />
                      </div>
                      {/* Input Archivo */}
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="note-audio">
                          Audio File (Option 2)
                        </Label>
                        <Input
                          id="note-audio"
                          type="file"
                          accept="audio/mpeg, audio/wav, audio/flac, audio/mp3, audio/wave, audio/x-wav, audio/x-flac"
                          disabled={isCreatingNote}
                          onChange={handleFileChange}
                        />
                      </div>
                      {/* Error Creación */}
                      {createNoteError && (
                        <p className="text-sm text-red-500">
                          {createNoteError}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreatingNote}>
                      {isCreatingNote ? (
                        "Creating..."
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" /> Create Note
                        </>
                      )}
                    </Button>
                  </CardFooter>
                  {/* --- Fin Contenido Formulario --- */}
                </Card>
              </form>
            )}
          </div>{" "}
          {/* Fin Wrapper max-width */}
        </main>
      </div>{" "}
      {/* Fin Área Contenido Principal */}
    </div> // Fin Contenedor Principal
  );
}
export default App;
