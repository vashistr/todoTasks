import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './backend.service';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'app-task-details', component: TaskDetailsComponent },
  { path: 'app-task-details/:id', component: TaskDetailsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    SearchPipe,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    // StoreModule.forRoot({product: addTaskReducer})
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
