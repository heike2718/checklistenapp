import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chl-checkliste-detail',
  templateUrl: './checkliste-detail.component.html',
  styleUrls: ['./checkliste-detail.component.css']
})
export class ChecklisteDetailComponent implements OnInit {

  stack1: string[] = [];

  stack2: string[] = [];

  constructor() {
    this.stack1 = ['Äpfel', 'Brötchen', 'bakjs', 'bakjsdk  shadhh', 'aksdak', 'klsdlahsh'];

    this.stack2 = ['Holunderbeeren', 'Fisch'];
  }

  ngOnInit() {
  }

}
