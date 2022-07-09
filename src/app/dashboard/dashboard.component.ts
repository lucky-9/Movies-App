import { Component, OnInit } from '@angular/core';

import { MovieService } from './../movie.service';

/* Movie genre ID's from the TMDB open source API Database */
const ANIMATED_MOVIE_GENRE_ID = 16;
const COMEDY_MOVIE_GENRE_ID = 35;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageNumber: number = 0;
  comedyMovieList: any[] = [];
  animatedMovieList: any[] = [];
  animatedMoviesLoading: boolean = false;
  comedyMoviesLoading: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.animatedMoviesLoading = true;
    this.comedyMoviesLoading = true;
    this.getFilteredGenreMovies();
  }

  getFilteredGenreMovies(genreId: number = 0) {  //considering 0 will be a invalid genre ID
    this.pageNumber++;
    if (genreId) {
      genreId === COMEDY_MOVIE_GENRE_ID ? this.comedyMoviesLoading = true : this.animatedMoviesLoading = true;
    };

    /* get movies based on user selected genre */
    this.movieService.getMovies(this.pageNumber)
      .subscribe((result: any) => {
        let movies: any[] = result.results;
        if (!genreId) {
          this.comedyMovieList = movies.filter(movie => movie.genre_ids && movie.genre_ids.includes(COMEDY_MOVIE_GENRE_ID));
          this.animatedMovieList = movies.filter(movie => movie.genre_ids && movie.genre_ids.includes(ANIMATED_MOVIE_GENRE_ID));
          this.animatedMoviesLoading = false;
          this.comedyMoviesLoading = false;
        } else {
          if (genreId === COMEDY_MOVIE_GENRE_ID) {
            this.comedyMovieList = movies.filter(movie => movie.genre_ids && movie.genre_ids.includes(COMEDY_MOVIE_GENRE_ID));
            this.comedyMoviesLoading = false;
          } else {
            this.animatedMovieList = movies.filter(movie => movie.genre_ids && movie.genre_ids.includes(ANIMATED_MOVIE_GENRE_ID));
            this.animatedMoviesLoading = false;
          }
        }
      }, error => console.log("Error while fetching movies..."))
  };

}
