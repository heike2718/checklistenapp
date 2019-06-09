import { Component, OnInit, OnDestroy } from '@angular/core';
import { JokesService } from '../services/jokes.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'chl-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit, OnDestroy {

  jokeResponse$: Observable<any>;

  joke: string;

  jokeSubscription: Subscription;

  constructor(private jokeService: JokesService) { }

  ngOnInit() {
    this.jokeResponse$ = this.jokeService.nextJoke();

    this.jokeSubscription = this.jokeResponse$.subscribe(res => {
      if (res.type && res.type === 'success' && res.value && res.value.joke) {
        this.joke = res.value.joke.replaceAll('&quot;', '"');
      } else {
        this.joke = 'Sei Epsilon kleiner 0.';
      }
    },
      (_error => {
        this.joke = 'Sei Epsilon kleiner 0.';
      }));
  }

  ngOnDestroy() {
    this.jokeSubscription.unsubscribe();
  }
}

