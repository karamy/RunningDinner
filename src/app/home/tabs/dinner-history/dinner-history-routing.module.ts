import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DinnerHistoryPage } from './dinner-history.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerHistoryPage
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'dinner-winners',
    loadChildren: () => import('./dinner-winners/dinner-winners.module').then( m => m.DinnerWinnersPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DinnerHistoryRoutingModule {}
