import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { IonicModule } from '@ionic/angular';
import { PhonePageRoutingModule } from './phone-routing.module';
import { PhonePage } from './phone.page';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDit-Luu9GP7UwpZTaVerP0EsI70DO-45o",
  authDomain: "runningdinnersms.firebaseapp.com",
  databaseURL: "https://runningdinnersms.firebaseio.com",
  projectId: "runningdinnersms",
  storageBucket: "runningdinnersms.appspot.com",
  messagingSenderId: "65032950194",
  appId: "1:65032950194:web:8c98c255773e86ab5454ab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhonePageRoutingModule
  ],
  declarations: [PhonePage]
})
export class PhonePageModule { }
