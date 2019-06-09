import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { publishLast, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  constructor(private http: HttpClient) { }


  public nextJoke(): Observable<any> {

    const url = 'http://api.icndb.com/jokes/random/';
    return this.http.get(url).pipe(
      publishLast(),
      refCount()
    );
  }
}

