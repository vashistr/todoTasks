import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService, Task, User } from 'src/app/backend.service';
import { defer, fromEvent, merge, EMPTY } from 'rxjs';
import { map, mapTo, delay, concatMap } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('desc',{static: false})
  desc: ElementRef<HTMLInputElement>;
  @ViewChild('saveBtn')
  saveBtn: ElementRef<HTMLButtonElement>;

  router: Router;
  assignTaskId: number;
  userId: number = null;
  description: string = "";
  users: Observable<User[]>;
  tasks: Observable<Task[]>;
  isTaskAdded: boolean = false
  isCompleted: boolean = false;
  isTaskAssigned: boolean = false
  isTaskCompleted: boolean = false
  addModalDisplayStyle: string = "none";
  assignModalDisplayStyle: string = "none";

  // handling race conditions
  saveBtnClicked$ = defer(() => fromEvent(this.saveBtn.nativeElement, 'click'));
  descUpdated$ = defer(() => fromEvent(this.desc.nativeElement, 'blur')).pipe(map(event => event.target));

  saveAndNavigate$ = merge(
    this.descUpdated$.pipe(mapTo('A')), // when comment blur event fires
    this.saveBtnClicked$.pipe(
      // when save button is clicked wait to ensure that if the comment was fired as well it will go through first
      delay(50),
      mapTo('B')
    )
  ).pipe(
    concatMap(origin => {
      if (origin === 'A') {
        return this.saveTask(this.desc.nativeElement.value);
      } else {
        this.closeAddPopup();
        return EMPTY;
      }
    })
  );

  constructor(private backend: BackendService, private _router: Router) {
    this.router = this._router;
    
  }

  ngOnInit(): void {
    // fetch tasks and users
    this.tasks = this.backend.tasks();
    // this.tasks = this.store.select(state => state.task);
    this.users = this.backend.users();
  }

  ngAfterViewInit(): void {
    this.saveAndNavigate$.subscribe();
  }

  // addProduct(description) {
  //   this.store.dispatch({
  //     type: 'ADD_PRODUCT',
  //     payload: <Task> {
  //       description: description
  //     }
  //   });
  // }

  // save new task implementation
  async saveTask(description: string) {
    await this.backend.newTask({description: description}).subscribe(() => {
      console.log("Saved Successfully " + description)
      this.addModalDisplayStyle="none";
      this.tasks = this.backend.tasks();
      this.description = null;

      this.isTaskAssigned = false;
      this.isTaskCompleted = false;
      this.isTaskAdded = true;
    });
  }

  // assign task to user implementation
  async assign() {
    await this.backend.assign(this.assignTaskId, this.userId).subscribe(() => {
      console.log("Task assigned to user");
      this.assignModalDisplayStyle = "none";
      this.userId = null;

      this.isTaskAssigned = true;
      this.isTaskCompleted = false;
      this.isTaskAdded = false;
    })
  }

  // complete task implementation
  async complete(id: number) {
    if(confirm("Are you sure you want to complete this task?")) { // ask for comfirmation
      await this.backend.complete(id, true).subscribe(() => {
        this.tasks = this.backend.tasks();
        this.isCompleted = true

        this.isTaskAssigned = false;
        this.isTaskCompleted = true;
        this.isTaskAdded = false;
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
    this.description = null;
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
