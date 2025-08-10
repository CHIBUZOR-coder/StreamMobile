import { create } from "zustand";
import { TMDB_CONFIG } from "@/Services/api";
import type { Movie } from "@/interfaces/interfaces";
import search from "../app/(tabs)/search";

type MovieState = {
  trendingmovies: Movie[];
  trendLoading: boolean;
  trendeError: string | null;

  getTrendingMovies: (
    query?: string | null,

    search?: string
  ) => Promise<void>;
};

export const useTrendStore = create<MovieState>((set) => ({
  trendingmovies: [],
  trendLoading: false,
  trendeError: null,

  getTrendingMovies: async (query) => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/${query}`;

    set({ trendLoading: true, trendeError: null });
    console.log("Fetching from:", endpoint);

    try {
      const res = await fetch(endpoint, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      }
      // console.log("trending:",data);

      set({
        trendeError: null,
        trendLoading: false,
        trendingmovies: data.data,
      });
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      set({
        trendeError: error.message || "Failed to fetch movies.",
        trendLoading: false,
      });
    }
  },
}));
