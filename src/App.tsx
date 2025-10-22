// src/App.tsx
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
import { Textarea } from "@/presentation/component/ui/TextArea"; // Asumo que es "Textarea" no "TextArea"
import { Input } from "@/presentation/component/ui/Input";
import { Separator } from "@/presentation/component/ui/Separator";
import { usePatients } from "./presentation/hooks/usePatient";

// 1. Importa el nuevo hook

// 2. El array 'mockPatients' se elimina

function App() {
  // 3. Llama al hook para obtener los datos
  const { patients, isLoading, error } = usePatients();

  return (
    <div className="flex h-screen w-full bg-background">
      {/* --- Panel Izquierdo --- */}
      <div className="w-[380px] border-r">
        <NoteList />
      </div>

      {/* --- Panel Derecho --- */}
      <main className="flex flex-1 items-center justify-center p-10">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Create new note</CardTitle>
            <CardDescription>
              Add a new clinical note by text or audio upload.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-6">
              {/* --- Selector de Paciente --- */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="patient">Select Patient</Label>

                {/* 4. Añade 'disabled' si está cargando */}
                <Select disabled={isLoading}>
                  <SelectTrigger id="patient">
                    <SelectValue
                      placeholder={
                        isLoading
                          ? "Loading patients..."
                          : "Choose a patient..."
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {/* 5. Mapea sobre los 'patients' reales del hook */}
                    {patients.map((patient) => (
                      <SelectItem key={patient.getId()} value={patient.getId()}>
                        {patient.getName()} {/* Usa el getter del modelo! */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* 6. (Opcional) Muestra un error si lo hay */}
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>

              {/* --- Textarea --- */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="note-text">Note Content (Option 1)</Label>
                <Textarea
                  id="note-text"
                  placeholder="Type or paste the clinical note here..."
                  rows={5}
                />
              </div>

              {/* --- Divisor --- */}
              <div className="flex items-center space-x-2">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>

              {/* --- Carga de Archivo --- */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="note-audio">Audio File (Option 2)</Label>
                <Input id="note-audio" type="file" accept="audio/*" />
              </div>
            </div>
          </CardContent>

          {/* 7. CardFooter va DENTRO de Card */}
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Note
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
export default App;
