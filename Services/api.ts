export const TMDB_CONFIG = {
  BASE_URL:
    process.env.EXPO_PUBLIC_API_URL ||
    "https://streambackend-nbbc.onrender.com",
  // API_KEY:
  //   process.env.EXPO_PUBLIC_API_KEY || "1a5a4586aa3fa64a5a66422b9bd36aeb",
  // headers: {
  //   accept: "application/json",
  //   Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY || "1a5a4586aa3fa64a5a66422b9bd36aeb"}`,
  // },
};

console.log("config:", TMDB_CONFIG.BASE_URL);


export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
  
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// const url =
//   "https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTVhNDU4NmFhM2ZhNjRhNWE2NjQyMmI5YmQzNmFlYiIsIm5iZiI6MTc1MzU4NjMxMy4zOTM5OTk4LCJzdWIiOiI2ODg1OWE4OTNkOGQ5ZGZkOTAzOGY3MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RlZCSNjCd6fSPhIksJZDjobaGXQKNbp7Sn9wtuwo3ms",
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));
