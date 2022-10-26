import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BackendService } from 'src/app/backend.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HomeComponent } from './home.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
            HomeComponent,
            SearchPipe
        ],
        providers: [
            {provide: BackendService, useValue: new BackendService()}
        ],
        imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', (() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Your TODO Tasks');
  }));

  it('should be able to create new task', fakeAsync(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    let app = fixture.debugElement.componentInstance;
    let backendService = fixture.debugElement.injector.get(BackendService);
    // let spy = spyOn(backendService, 'tasks').and.returnValue()
    
    let button = fixture.debugElement.nativeElement.querySelector('#addNewTask');
    button.click();
    fixture.detectChanges();
    app.description = "dummyData";
    app.addModalDisplayStyle = "block";
    fixture.detectChanges();
    app.tasks = [{id: 1, description: 'desc', assigneeId: 1, completed: true }]
    backendService.newTask({
      description: 'desc1'
    });
    tick();
    expect(app.tasks.length === 2)
    discardPeriodicTasks() 
  }));

  it('should be able to complete a task', (() => {
    const fixture = TestBed.createComponent(HomeComponent);
    let app = fixture.debugElement.componentInstance;
    let backendService = fixture.debugElement.injector.get(BackendService);
    let spy = spyOn(backendService, 'task').and.returnValue({id: 1, description: 'desc', assigneeId: 1, completed: true});
    fixture.detectChanges();   
    let button = fixture.debugElement.nativeElement.querySelector('#complete0');
    app.tasks = [{id: 1, description: 'desc', assigneeId: 1, completed: true }]
    app.complete(1);
    spyOn(window, 'confirm').and.returnValue(true);
    fixture.whenStable().then(()=> {
      expect(app.isCompleted).toBe(true);
    })
  }));

});

function MockPipe(Pipe: any, arg1: (value: any) => string): any {
  throw new Error('Function not implemented.');
}

