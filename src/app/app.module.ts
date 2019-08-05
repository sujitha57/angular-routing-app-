import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { ProjectsComponent } from './projects/projects.component';
import { EmployeeComponent } from './employees/employee.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedService} from './services/shared.service';
import { GlobalErrorComponent } from './global-error/global-error.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    ProjectsComponent,
    EmployeeComponent,
    PeopleListComponent,
    GlobalErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'people', component: PeopleComponent},
      {path: 'people/:id', component: PeopleListComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'employees', component: EmployeeComponent},
      {path: 'error', component: GlobalErrorComponent}]),
    FormsModule,
    HttpClientModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [SharedService,
    {provide: ErrorHandler, useClass: SharedService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
