import { injectable } from "tsyringe";
import { Note } from "@/domain/model/note/Note";
import apiClient from "../api.client";
import { NoteApiMapper } from "./NoteApiMapper";
import { NoteRepository } from "@/domain/gateway/note/NoteRepository";
import { CreateNoteData } from "@/domain/gateway/note/dto/CreateNoteData";
import { CreateNoteWithFileData } from "@/domain/gateway/note/dto/CreateNoteWithFileData";

export interface NoteApiResponse {
  id: string;
  createdAt: string;
  patientId: string;
  rawNote: string;
  processedNote: string | null;
  patientName: string;
  patientDateOfBirth: string;
}

@injectable()
export class NoteApiRepository implements NoteRepository {
  async getNotes(): Promise<Note[]> {
    try {
      const responseData = await apiClient<NoteApiResponse[]>("/notes", {
        method: "GET",
      });
      return NoteApiMapper.bulkToDomain(responseData);
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw new Error("Failed to fetch notes.");
    }
  }

  async getNoteById(id: string): Promise<Note | null> {
    if (!id) return null;
    try {
      const responseData = await apiClient<NoteApiResponse>(`/notes/${id}`, {
        method: "GET",
      });
      if (!responseData) {
        return null;
      }
      return NoteApiMapper.toDomain(responseData);
    } catch (error: any) {
      if (error.message.includes("404")) {
        console.warn(`Note with id ${id} not found.`);
        return null;
      }
      console.error(`Error fetching note by id ${id}:`, error);
      throw new Error("Failed to fetch note details.");
    }
  }

  async createNote(data: CreateNoteData): Promise<Note> {
    try {
      const responseData = await apiClient<NoteApiResponse>("/notes", {
        method: "POST",
        body: JSON.stringify({
          patientId: data.getPatientId(),
          rawNote: data.getRawNote(),
        }),
      });
      return NoteApiMapper.toDomain(responseData);
    } catch (error) {
      console.error("Error creating note:", error);
      throw new Error("Failed to create note.");
    }
  }

  async createNoteWithFile(data: CreateNoteWithFileData): Promise<Note> {
    try {
      const formData = new FormData();
      formData.append("patientId", data.getPatientId());
      formData.append("audioFile", data.getFile());
      const responseData = await apiClient<NoteApiResponse>("/notes", {
        method: "POST",
        body: formData,
      });
      return NoteApiMapper.toDomain(responseData);
    } catch (error) {
      console.error("Error creating note with file:", error);
      throw new Error("Failed to create note with file.");
    }
  }
}
