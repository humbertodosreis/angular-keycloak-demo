import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './app-auth.guard';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'patients',
    component: PatientsListComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: ['Secretary', 'Doctor'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard],
})
export class AppRoutingModule {}
