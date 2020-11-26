import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatPageRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';
import { RDComponentsModule } from 'src/app/rdcomponents/rdcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    RDComponentsModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
