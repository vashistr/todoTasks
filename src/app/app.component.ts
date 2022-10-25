import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BackendService} from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tasks = this.backend.tasks();
  users = this.backend.users();
  router: Router;
  addModalDisplayStyle = "none";
  assignModalDisplayStyle = "none";
  description: string = "";
  userList = [];
  isTaskPressed: boolean = false;
  userName: number;
  assignTaskId: number;

  constructor(private backend: BackendService, private _router: Router) {
    this.router = this._router;
  }

  add() {
    this.openAddPopup();
  }

  saveTask(description: string) {
    this.backend.newTask({description: description}).subscribe(() => {
      console.log("Saved Successfully " + description)
      this.addModalDisplayStyle="none";
      this.tasks = this.backend.tasks();
      this.description = null;
    });
  }

  assign() {
    this.backend.assign(this.assignTaskId, this.userName).subscribe(() => {
      console.log("Task assigned to user");
      this.assignModalDisplayStyle = "none";
      this.userName = null;
    })
  }

  complete(id: number) {
    if(confirm("Are you sure you want to complete this task?")) {
      this.backend.complete(id, true).subscribe(() => {
        this.tasks = this.backend.tasks();
      });
    }
  }
  
  openAddPopup() {
    this.addModalDisplayStyle = "block";
  }
  closeAddPopup() {
    this.addModalDisplayStyle = "none";
  }

  openAssignPopup(id: number) {
    this.assignModalDisplayStyle = "block";
    this.assignTaskId = id;
  }

  closeAssignPopup() {
    this.assignModalDisplayStyle = "none";
    this.userName = null;
  }

  taskPressed(t: any) {
    // this.isTaskPressed = true;
    this.router.navigate(['/app-task-details'])
    console.log(t);
  }
}
