// import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

// const initialState = {
//   movies: [],
//   genresLoaded: false,
//   genres: [],
// };

// export const getGenres = createAsyncThunk("netflix/genres", async () => {
//   const {
//     data: { genres },
//   } = await axios.get(
//     `${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`
//   );
//   return genres;
// });

// const arrayOfMovieData = (array, moviesArray, genres) => {
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genreId) => {
//       const genre = genres.find(({ id }) => id === genreId);
//       if (genre) movieGenres.push(genre.name);
//     });
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         name: movie.original_name || movie.original_title,
//         image: movie.backdrop_path,
//         genres: movieGenres.slice(0, 2),
//       });
//   });
// };

// const getMovieData = async (api, genres, paging = false) => {
//   const moviesArray = [];
//   for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
//     const { data: { results } } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
//     arrayOfMovieData(results, moviesArray, genres);
//   }
//   return moviesArray;
// };

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async ({ type }, { getState }) => {
//     const { netflix: { genres } } = getState();
//     if (!genres.length) {
//       await getGenres();
//     }
//     return getMovieData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`, genres, true);
//   }
// );

// const NetflixSlice = createSlice({
//   name: "Netflix",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getGenres.fulfilled, (state, action) => {
//       state.genres = action.payload;
//       state.genresLoaded = true;
//     });
//     builder.addCase(fetchMovies.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     netflix: NetflixSlice.reducer,
//   },
// });


// import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

// const initialState = {
//   movies: [],
//   genresLoaded: false,
//   genres: [],
// };

// export const getGenres = createAsyncThunk("netflix/genres", async () => {
//   console.log("Fetching genres from TMDB API...");
//   const {
//     data: { genres },
//   } = await axios.get(
//     `${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`
//   );
//   return genres;
// });

// const arrayOfMovieData = (array, moviesArray, genres) => {
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genreId) => {
//       const genre = genres.find(({ id }) => id === genreId);
//       if (genre) movieGenres.push(genre.name);
//     });
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         name: movie.original_name || movie.original_title,
//         image: movie.backdrop_path,
//         genres: movieGenres.slice(0, 2),
//       });
//   });
// };

// const getMovieData = async (api, genres, paging = false) => {
//   const moviesArray = [];
//   for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
//     console.log(`Fetching movies from TMDB API, page: ${i}...`);
//     const { data: { results } } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
//     arrayOfMovieData(results, moviesArray, genres);
//   }
//   return moviesArray;
// };

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async ({ type }, { getState }) => {
//     console.log("Fetching trending movies from TMDB API...");
//     const { netflix: { genres } } = getState();
//     return getMovieData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`, genres, true);
//   }
// );

// const NetflixSlice = createSlice({
//   name: "Netflix",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getGenres.fulfilled, (state, action) => {
//       state.genres = action.payload;
//       state.genresLoaded = true;
//     });
//     builder.addCase(fetchMovies.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     netflix: NetflixSlice.reducer,
//   },
// });


// import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

// const initialState = {
//   movies: [],
//   genresLoaded: false,
//   genres: [],
// };

// const axiosInstance = axios.create({
//   baseURL: TMDB_BASE_URL,
//   timeout: 10000, // 10 seconds timeout
// });

// const retryAxiosRequest = async (url, retries = 1, delay = 1000) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await axiosInstance.get(url);
//     } catch (error) {
//       if (i === retries - 1) throw error; // If last retry, throw error
//       console.log(`Retrying request... (${i + 1}/${retries})`);
//       await new Promise(res => setTimeout(res, delay));
//     }
//   }
// };

// export const getGenres = createAsyncThunk("netflix/genres", async () => {
//   console.log("Fetching genres from TMDB API...");
//   const response = await retryAxiosRequest(`/genre/movie/list?api_key=${MY_API_KEY}`);
//   return response.data.genres;
// });

// const arrayOfMovieData = (array, moviesArray, genres) => {
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genreId) => {
//       const genre = genres.find(({ id }) => id === genreId);
//       if (genre) movieGenres.push(genre.name);
//     });
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         name: movie.original_name || movie.original_title,
//         image: movie.backdrop_path,
//         genres: movieGenres.slice(0, 2),
//       });
//   });
// };

// const getMovieData = async (api, genres, paging = false) => {
//   const moviesArray = [];
//   for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
//     console.log(`Fetching movies from TMDB API, page: ${i}...`);
//     const response = await retryAxiosRequest(`${api}${paging ? `&page=${i}` : ""}`);
//     arrayOfMovieData(response.data.results, moviesArray, genres);
//   }
//   return moviesArray;
// };

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async ({ type }, { getState, dispatch }) => {
//     console.log("Fetching trending movies from TMDB API...");
//     const { netflix: { genresLoaded, genres } } = getState();
    
//     if (!genresLoaded) {
//       console.log("Genres not loaded yet, dispatching getGenres first...");
//       await dispatch(getGenres());
//     }
    
//     return getMovieData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`, genres, true);
//   }
// );

// const NetflixSlice = createSlice({
//   name: "Netflix",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getGenres.fulfilled, (state, action) => {
//       state.genres = action.payload;
//       state.genresLoaded = true;
//     });
//     builder.addCase(fetchMovies.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     netflix: NetflixSlice.reducer,
//   },
// });


// import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

// const initialState = {
//   movies: [],
//   genresLoaded: false,
//   genres: [],
// };

// export const getGenres = createAsyncThunk("netflix/genres", async () => {
//   console.log("Fetching genres from TMDB API...");
//   const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`);
//   return response.data.genres;
// });

// const arrayOfMovieData = (array, moviesArray, genres) => {
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genreId) => {
//       const genre = genres.find(({ id }) => id === genreId);
//       if (genre) movieGenres.push(genre.name);
//     });
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         name: movie.original_name || movie.original_title,
//         image: movie.backdrop_path,
//         genres: movieGenres.slice(0, 2),
//       });
//   });
// };

// const getMovieData = async (api, genres, paging = false) => {
//   const moviesArray = [];
//   for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
//     console.log(`Fetching movies from TMDB API, page: ${i}...`);
//     const response = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
//     arrayOfMovieData(response.data.results, moviesArray, genres);
//   }
//   return moviesArray;
// };

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async ({ type }, { getState, dispatch }) => {
//     console.log("Fetching trending movies from TMDB API...");
//     const { netflix: { genresLoaded, genres } } = getState();
    
//     if (!genresLoaded) {
//       console.log("Genres not loaded yet, dispatching getGenres first...");
//       await dispatch(getGenres());
//     }
    
//     return getMovieData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`, genres, true);
//   }
// );

// const NetflixSlice = createSlice({
//   name: "Netflix",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getGenres.fulfilled, (state, action) => {
//       state.genres = action.payload;
//       state.genresLoaded = true;
//     });
//     builder.addCase(fetchMovies.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     netflix: NetflixSlice.reducer,
//   },
// });

import {
  configureStore,createAsyncThunk,createSlice,} from "@reduxjs/toolkit";
import axios from "axios";

import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

const initialState = {
  movies: [],
  generesLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`
  );
  return genres;
});



const arrayOfMovieData = (array, moviesArray, generes)=>{
  array.forEach((movie)=>{
    const moviesGenres = []
    movie.genre_ids.forEach((genre)=>{
      const name = generes.find(({id})=> id  === genre)
      if(name) moviesGenres.push(name.name)
    })
    if(movie.backdrop_path)
    moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: moviesGenres.slice(0,2)
    })
  })
}

const getMovieData = async (api, genres, paging = false)=>{
  const moviesArray = []
  for(let i = 1; moviesArray.length < 80 && i < 10; i++){
     const {data: {results},} =  await axios.get(`${api}${paging ? `&page=${i}` : ""}`)
      arrayOfMovieData (results, moviesArray, genres)
  }
  return moviesArray
}


export const fetchMovies = createAsyncThunk("netflix/trending", async ({type}, myThunk)=>{
  const {netflix: {genres},} = myThunk.getState()
 return getMovieData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`, genres, true );
  // console.log(data)
})

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.generesLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload; 
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});