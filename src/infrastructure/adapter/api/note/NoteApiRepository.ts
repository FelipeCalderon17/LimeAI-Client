import { injectable } from "tsyringe";
import { Note } from "@/domain/model/note/Note";
import apiClient from "../api.client";
import { NoteApiMapper } from "./NoteApiMapper";
import { NoteRepository } from "@/domain/gateway/note/NoteRepository";

export interface NoteApiResponse {
  id: string;
  createdAt: string;
  patientId: string;
  rawNote: string;
  processedNote: string | null;
  patientName: string;
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
    console.log(id);
    return null;
  }
}
