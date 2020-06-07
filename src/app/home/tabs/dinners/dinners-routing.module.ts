import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DinnersPage } from './dinners.page';

const routes: Routes = [
  {
    path: '',
    component: DinnersPage
  },
  {
    path: 'create-dinner',
    loadChildren: () => import('./create-dinner/create-dinner.module').then(m => m.CreateDinnerPageModule)
  },
  {
    path: 'dinner-detail',
    loadChildren: () => import('./dinner-detail/dinner-detail.module').then(m => m.DinnerDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnersPageRoutingModule { }
