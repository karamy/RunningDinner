import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsDetailPage } from './contacts-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsDetailPageRoutingModule {}
