import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService, Task, User } from 'src/app/backend.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit {
  task: Task;
  id: number;
  user: User;
  route: ActivatedRoute;
  description: string = ""
  isLoading: boolean = true;

  constructor(private _route: ActivatedRoute, private backendService: BackendService) {
    this.route = this._route;
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.backendService.task(this.id).subscribe((t) => {
      this.task = t
      this.backendService.user(t.assigneeId).subscribe((u) => {
        this.user = u;
        this.isLoading = false;
      })
    });
  }

}
