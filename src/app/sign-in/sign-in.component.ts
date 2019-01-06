import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessagesService } from 'hewi-ng-lib';

@Component({
  selector: 'chl-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private messagesService: MessagesService) { }

  ngOnInit() {}

  redirect(): void {

    this.authService.signIn();

  }

}
