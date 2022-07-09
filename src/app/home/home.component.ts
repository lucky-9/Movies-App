import { Component, OnInit } from '@angular/core';


import { MovieService } from './../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNumber: number = 0;
  movies: any[] = [];
  loading: boolean = false;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getTopMovies();
  }


  /* function runs on scroll */
  getTopMovies() {
    this.loading = true;
    this.pageNumber++;
    this.movieService.getMovies(this.pageNumber)
      .subscribe((result: any) => {
        let nextMovies = result.results;
        this.movies.push(...nextMovies); //appending the next movies to the existing movies.
        this.loading = false;
      },
        error => console.log("error fetching movies...")
      )
  }
}
