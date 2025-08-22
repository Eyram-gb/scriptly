import { StateCreator, create } from "zustand";
import { Suggestion } from "../types";
import { mockSuggestions } from "../mock/mockSuggestions";

export interface StoreState {
  suggestions: Suggestion[];
  accepted: Suggestion[];
  pinned: string[];
  bibleVersion: string;
  transcriptEnabled: boolean;
  acceptSuggestion: (id: string) => void;
  pinSuggestion: (id: string) => void;
  setBibleVersion: (version: string) => void;
  setTranscriptEnabled: (enabled: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  suggestions: mockSuggestions,
  accepted: [],
  pinned: [],
  bibleVersion: "KJV",
  transcriptEnabled: true,
  acceptSuggestion: (id: string) =>
    set((state: StoreState) => {
      const suggestion = state.suggestions.find((s: Suggestion) => s.id === id);
      if (!suggestion) return {};
      return {
        accepted: [...state.accepted, suggestion],
        suggestions: state.suggestions.filter((s: Suggestion) => s.id !== id),
      };
    }),
  pinSuggestion: (id: string) =>
    set((state: StoreState) => {
      const isPinned = state.pinned.includes(id);
      return {
        pinned: isPinned
          ? state.pinned.filter((pid: string) => pid !== id)
          : [...state.pinned, id],
      };
    }),
  setBibleVersion: (version: string) => set({ bibleVersion: version }),
  setTranscriptEnabled: (enabled: boolean) =>
    set({ transcriptEnabled: enabled }),
}));
