import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TMDB_CONFIG } from "@/Services/api";
import { User } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import { fetchMovies } from "../Services/api";

type UserState = {
  userData: {
    id: number | null;
    image: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    role: string | null;
    userName: string | null;
    subscription: string | null;
  };

  userLoading: boolean;
  userError: string | null;
  userModalVisible: boolean;
  success: string;
  favouriteMovies: {
    favouriteCartMovies: [];
  } | null;

  watchedMovies: {
    watchCartMovies:
      | [
          {
            movie: any;
            name: string | null;
            category: string | null;
            year: string | null;
            time: string | null;
            status: string | null;
            image: string | null;
            id: number | null;
          },
        ]
      | null;
  } | null;
  fetchUser: (
    email: string,
    phone: string,
    userName: string,
    name: string,
    password: string,
    confirmpassword: string,
    imageFile?: { uri: string; name: string; size: number } | null
  ) => Promise<void>;
  LoginUsers: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getFavouriteMovies: (name: string | null) => void;
  getWatchCount: (name: string | null) => void;
};

const router = useRouter();

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: {
        id: null,
        image: null,
        name: null,
        phone: null,
        email: null,
        role: null,
        userName: null,
        subscription: null,
      },
      favouriteMovies: null,
      watchedMovies: null,
      userLoading: false,
      userError: null,
      userModalVisible: false,
      success: "",

      fetchUser: async (
        email,
        phone,
        userName,
        name,
        password,
        confirmpassword,
        imageFile
      ) => {
        const endpoint = `${TMDB_CONFIG.BASE_URL}/api/register`;
        set({ userLoading: true });

        try {
          const formData = new FormData();
          formData.append("email", email);
          formData.append("phone", phone);
          formData.append("userName", userName);
          formData.append("name", name);
          formData.append("password", password);
          formData.append("confirmpassword", confirmpassword);

          if (imageFile) {
            formData.append("image", {
              uri: imageFile.uri,
              name: imageFile.name,
              type: "image/jpeg",
            } as any);
          }

          const res = await fetch(endpoint, { method: "POST", body: formData });
          const data = await res.json();

          if (!res.ok) {
            set({
              userLoading: false,
              userError: data?.message,
              userModalVisible: true,
            });
            setTimeout(() => set({ userModalVisible: false }), 8000);
          } else {
            set({
              userLoading: false,
              userData: data,
              userModalVisible: true,
              success: data?.message,
            });
            setTimeout(() => set({ userModalVisible: false }), 8000);
          }
        } catch (error) {
          console.error("Error uploading user data:", error);
        }
      },

      LoginUsers: async (email, password) => {
        const endpoint = `${TMDB_CONFIG.BASE_URL}/login`;
        set({ userLoading: true });

        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            set({ userError: data?.message, userModalVisible: true });
            setTimeout(() => set({ userModalVisible: false }), 6000);
          } else {
            console.log("data", data?.userInfo);

            set({
              userData: data?.userInfo,
              userError: null,
              success: data?.message,
              userModalVisible: true,
            });
            setTimeout(() => set({ userModalVisible: false }), 6000);
            router.push({ pathname: "/" });
          }
        } catch (error) {
          set({ userError: "Network error" });
        } finally {
          set({ userLoading: false });
        }
      },

      getWatchCount: async (name) => {
        const endpoint = `${TMDB_CONFIG.BASE_URL}/getWatchCount`;
        console.log("fetching from:", endpoint);
        console.log("watchName:", name);

        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.log(data);

          set({ userLoading: false, userError: data?.message });
        } else {
          console.log("watch:", data?.data?.watchCartMovies[0].movie.id, "\n \n");
          set({ watchedMovies: data?.data });
        }

        try {
        } catch (error: any) {
          console.log(error.message);
        }
      },

      getFavouriteMovies: async (name) => {
        const endpoint = `${TMDB_CONFIG.BASE_URL}/getfavouriteCart`;
        set({ userLoading: true });
        console.log("fetching favouriteMovies from:", endpoint);
        console.log("name:", name);

        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
          });

          const data = await res.json();

          if (!res.ok) {
            set({
              userLoading: false,
              userError: data?.message,
              userModalVisible: true,
            });
            // console.log(data);
            setTimeout(() => set({ userModalVisible: false }), 8000);
          } else {
            set({
              userLoading: false,
              userModalVisible: true,
              favouriteMovies: data?.data,
              success: data?.message,
            });
            console.log("favouriteMovies:", data.data);
            setTimeout(() => set({ userModalVisible: false }), 8000);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      },

      logout: () => {
        set({
          userData: {
            id: null,
            image: null,
            name: null,
            phone: null,
            email: null,
            role: null,
            userName: null,
            subscription: null,
          },
          success: "",
          userError: null,
        });
        AsyncStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage", // AsyncStorage key
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
