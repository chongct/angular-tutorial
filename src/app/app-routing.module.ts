import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LinksComponent } from './links/links.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LinkDetailComponent } from './link-detail/link-detail.component';

const routes: Routes = [
  { path: 'links', component: LinksComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: LinkDetailComponent }
];

@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
