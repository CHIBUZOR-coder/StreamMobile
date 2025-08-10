import { create } from "zustand";
import { TMDB_CONFIG } from "@/Services/api";
import type { Movie } from "@/interfaces/interfaces";
import search from "../app/(tabs)/search";

type MovieState = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchResults: Movie[];
  fetchMovies: (query?: string | null, search?: string) => Promise<void>;
  searchMovies: (query: string, search: string) => Promise<void>;
  addTrending: (query: string, id: number) => Promise<void>;
  singleMovie: Movie | null;
  singleLoad: boolean;
  singleError: string | null;
  getSingleMovie: (query: string, id: number) => Promise<void>;
};

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  loading: false,
  error: null,
  singleLoad: false,
  singleError: null,
  singleMovie: null,
  searchResults: [],
  fetchMovies: async (query, search) => {
    console.log("fetchMovies function called with:", query);

    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/${query}`
      : `${TMDB_CONFIG.BASE_URL}`;

    set({ loading: true, error: null });
    console.log("Fetching from:", endpoint);

    try {
      const res = await fetch(endpoint, {
        method: "GET",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        set({ loading: true, error: data?.message });
      }

      // console.log(data);

      const moviesData = data.data as Movie[];

      if (search) {
        const lowerVale = search.toLowerCase();
        const filteredMovies = moviesData.filter((movie) => {
          const nameMatch = movie?.name?.toLowerCase().includes(lowerVale);

          const castMatch =
            Array.isArray(movie.casts) &&
            movie.casts.some((item : any) =>
              item?.cast?.name?.toLowerCase().includes(lowerVale)
            );

          return nameMatch || castMatch;
        });

        set({ movies: filteredMovies, loading: false });
      } else {
        set({ movies: moviesData, loading: false });
      }
    } catch (error: any) {
      console.log("Fetch Error:", error?.message, error);
      set({
        loading: false,
        error: error?.message || "Unknown fetch error",
        movies: [],
      });
    }
  },

  searchMovies: async (query: string, search: string) => {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/${query}`
      : `${TMDB_CONFIG.BASE_URL}`;

    set({ loading: true, error: null });

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const moviesData = data.data as Movie[];

      const lower = search.toLowerCase();
      const filtered = moviesData.filter((movie) => {
        const nameMatch = movie.name?.toLowerCase().includes(lower);
        const castMatch =
          Array.isArray(movie.casts) &&
          movie.casts.some((item) =>
            item?.cast?.name?.toLowerCase().includes(lower)
          );

        return nameMatch || castMatch;
      });

      set({ searchResults: filtered, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.message || "Unknown search error",
        searchResults: [],
      });
    }
  },
  addTrending: async (query: string, id: number) => {
    console.log("Trending function called with:", query, id);
    try {
      const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/${query}`
        : `${TMDB_CONFIG.BASE_URL}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      console.log("Addin To:", endpoint);

      const data = await res.json();
      // if (res.ok) {
      //   console.log("Trending Movies festce succesfully!");
      //       console.log("movies:", data.data);
      // }
  
    } catch (error: any) {
      console.log(error.message);
    }
  },

  getSingleMovie: async (query, id) => {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/${query}`
      : `${TMDB_CONFIG.BASE_URL}`;

    set({
      singleLoad: true,
      singleError: null,
      singleMovie: null, // 👈 clears old movie
    });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Fetch failed:", data.message);
        set({
          singleError: data.message || "Failed to fetch movie",
          singleLoad: false,
        });
        return; // 👈 stop execution if fetch failed
      }

      set({
        singleMovie: data?.data,
        singleLoad: false,
      });
    } catch (error: any) {
      console.log("Fetch error:", error.message);
      set({
        singleError: error?.message || "Unknown error",
        singleLoad: false,
      });
    }
  },

  // getSingleMovie: async (query, id) => {
  //   const endpoint = query
  //     ? `${TMDB_CONFIG.BASE_URL}/${query}`
  //     : `${TMDB_CONFIG.BASE_URL}`;
  //   set({ singleLoad: true });
  //   const res = await fetch(endpoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id }),
  //   });

  //   const data = await res.json();

  //   if (!res.ok) {
  //     console.log(data.message);
  //     set({ singleError: data.message, singleLoad: false });
  //   }

  //   set({ singleMovie: data?.data, singleLoad: false });

  //   try {
  //   } catch (error: any) {
  //     console.log(error.message);
  //     set({ singleError: data?.message, singleLoad: false });
  //   }
  // },
}));
