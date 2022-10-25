import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task: any;
  router: string = "";
  constructor(private _router: Router) {
    this.router = this._router.url;
   }

  ngOnInit(): void {
  }

}
