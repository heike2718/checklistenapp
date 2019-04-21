import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessagesService } from 'hewi-ng-lib';

@Component({
  selector: 'chl-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService, private messagesService: MessagesService) { }

  ngOnInit() {}

  redirect(): void {

    this.authService.signUp();

  }

}
