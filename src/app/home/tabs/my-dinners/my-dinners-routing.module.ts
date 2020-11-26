import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDinnersPage } from './my-dinners.page';

const routes: Routes = [
  {
    path: '',
    component: MyDinnersPage
  },
  {
    path: 'dinner-winners',
    loadChildren: () => import('./dinner-winners/dinner-winners.module').then(m => m.DinnerWinnersPageModule)
  },
  {
    path: 'dinner-detail',
    loadChildren: () => import('./dinner-detail/dinner-detail.module').then(m => m.DinnerDetailPageModule)
  },
  {
    path: 'dinner-event',
    loadChildren: () => import('./dinner-event/dinner-event.module').then(m => m.DinnerEventPageModule)
  },
  {
    path: 'dinner-phases',
    loadChildren: () => import('./dinner-phases/dinner-phases.module').then(m => m.DinnerPhasesPageModule)
  },
  {
    path: 'dinner-votes',
    loadChildren: () => import('./dinner-votes/dinner-votes.module').then(m => m.DinnerVotesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDinnersRoutingModule { }
