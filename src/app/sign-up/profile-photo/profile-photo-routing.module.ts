import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePhotoPage } from './profile-photo.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePhotoPageRoutingModule {}
