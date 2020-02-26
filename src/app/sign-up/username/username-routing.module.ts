import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsernamePage } from './username.page';

const routes: Routes = [
  {
    path: '',
    component: UsernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsernamePageRoutingModule {}
