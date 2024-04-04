import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { CanDeactiveGuard } from './services/can-deactive.guard';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'notes',
    component: NoteViewComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'notes/register',
    component: RegisterFormComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'notes/:id',
    component: NoteEditComponent,
    canDeactivate: [CanDeactiveGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
