import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  API_KEY = "830f70274fa20d47ee5a70c721c82bb1";
  END_POINT = "https://api.themoviedb.org/3/movie/top_rated";

  constructor(private http: HttpClient) { }

  getMovies(pageNumber: number) {
    const URL = `${this.END_POINT}?page=${pageNumber}&api_key=${this.API_KEY}`;
    return this.http.get(URL);
  }
}
