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

  setup: string;

  punchline: string;

  jokeSubscription: Subscription;

  constructor(private jokeService: JokesService) { }

  ngOnInit() {
    this.jokeResponse$ = this.jokeService.nextJoke();

    this.setup = '';
    this.punchline = '';

    this.jokeSubscription = this.jokeResponse$.subscribe(res => {
      if (res.setup && res.punchline) {
        this.setup = res.setup;
        this.punchline = res.punchline;
      }
    },
      (_error => {
        // nix tun
      }));
  }

  ngOnDestroy() {
    this.jokeSubscription.unsubscribe();
  }
}

