// interface Movie {
//   id: number;
//   title: string;
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: number[];
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

// interface TrendingMovie {
//   searchTerm: string;
//   movie_id: number;
//   title: string;
//   count: number;
//   poster_url: string;
// }

// interface MovieDetails {
//   adult: boolean;
//   backdrop_path: string | null;
//   belongs_to_collection: {
//     id: number;
//     name: string;
//     poster_path: string;
//     backdrop_path: string;
//   } | null;
//   budget: number;
//   genres: {
//     id: number;
//     name: string;
//   }[];
//   homepage: string | null;
//   id: number;
//   imdb_id: string | null;
//   original_language: string;
//   original_title: string;
//   overview: string | null;
//   popularity: number;
//   poster_path: string | null;
//   production_companies: {
//     id: number;
//     logo_path: string | null;
//     name: string;
//     origin_country: string;
//   }[];
//   production_countries: {
//     iso_3166_1: string;
//     name: string;
//   }[];
//   release_date: string;
//   revenue: number;
//   runtime: number | null;
//   spoken_languages: {
//     english_name: string;
//     iso_639_1: string;
//     name: string;
//   }[];
//   status: string;
//   tagline: string | null;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

// interface TrendingCardProps {
//   movie: TrendingMovie;
//   index: number;
// }

// interfaces.d.ts

export interface Movie {
  id: number;
  title: string;
  movieId: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  ///
  name: string;
  image: string;
  video: string;
  time: string;
  approxiT: string;
  popular: string;
  category: string;
  categoryId: string;
  year: string;
  casts: {
    role: string;
    id: number;
    name: string;
    image: string;
  }[];
  approxiY: string;
  rating: string;
  watchCount: string;
  approxiR: string;
  language: string;
  description: string;
  price: string;
  trailer: string;

  WatchCartMovies: string;
}

export interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface Casts {
  id: number;
  name: string;
  image: string;
  role: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}
