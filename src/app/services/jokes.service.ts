import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { publishLast, refCount } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  constructor(private http: HttpClient) { }


  public nextJoke(): Observable<any> {

    return this.http.get(environment.jokesAPI).pipe(
      publishLast(),
      refCount()
    );
  }
}

