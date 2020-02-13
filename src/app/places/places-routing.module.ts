import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'offers', // elenco chat
        children: [
          {
            path: '', // elenco chat
            loadChildren: './offers/offers.module#OffersPageModule'
          },
          {
            path: 'new', // apro chat attuale
            loadChildren:
            './offers/new-offer/new-offer.module#NewOfferPageModule'
          },
          {
            path: ':placeId', // apro chat chiusa
            loadChildren:
            './offers/offer-bookings/offer-bookings.module#OfferBookingsPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: './profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'rooms',
        children: [
          {
            path: '',
            loadChildren: './rooms/rooms.module#RoomsPageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/places/tabs/offers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule {}
