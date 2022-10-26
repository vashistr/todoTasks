import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BackendService } from 'src/app/backend.service';
import { RouterTestingModule } from "@angular/router/testing";
import { TaskDetailsComponent } from './task-details.component';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
            TaskDetailsComponent
        ],
        providers: [
            {provide: BackendService, useValue: new BackendService()}
        ],
        imports: [RouterTestingModule.withRoutes([])]

    }).compileComponents();
}));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', (() => {
    const fixture = TestBed.createComponent(TaskDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Task Details');
  }));

});
