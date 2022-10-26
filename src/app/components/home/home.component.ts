import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService, Task, User } from 'src/app/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  router: Router;
  assignTaskId: number;
  userId: number = null;
  description: string = "";
  users: Observable<User[]>;
  tasks: Observable<Task[]>;
  isCompleted: boolean = false;
  addModalDisplayStyle: string = "none";
  assignModalDisplayStyle: string = "none";

  constructor(private backend: BackendService, private _router: Router) {
    this.router = this._router;
  }

  ngOnInit(): void {
    // fetch tasks and users
    this.tasks = this.backend.tasks();
    this.users = this.backend.users();
  }

  // save new task implementation
  async saveTask(description: string) {
    await this.backend.newTask({description: description}).subscribe(() => {
      console.log("Saved Successfully " + description)
      this.addModalDisplayStyle="none";
      this.tasks = this.backend.tasks();
      this.description = null;
    });
  }

  // assign task to user implementation
  async assign() {
    await this.backend.assign(this.assignTaskId, this.userId).subscribe(() => {
      console.log("Task assigned to user");
      this.assignModalDisplayStyle = "none";
      this.userId = null;
    })
  }

  // complete task implementation
  async complete(id: number) {
    if(confirm("Are you sure you want to complete this task?")) { // ask for comfirmation
      await this.backend.complete(id, true).subscribe(() => {
        this.tasks = this.backend.tasks();
        this.isCompleted = true
      });
    }
  }

  // redirect to task details page when clicked on task
  taskPressed(t: any) {
    this.router.navigate(['/app-task-details', t.id])
  }
  
  add(): void {
    this.openAddPopup();
  }

  // hide/unhide add new task modal
  openAddPopup(): void {
    this.addModalDisplayStyle = "block";
  }
  closeAddPopup(): void {
    this.addModalDisplayStyle = "none";
  }

  // hide/unhide assign modal
  openAssignPopup(id: number) {
    this.assignModalDisplayStyle = "block";
    this.assignTaskId = id;
  }
  closeAssignPopup() {
    this.assignModalDisplayStyle = "none";
    this.userId = null; // clear form data
  }

}
