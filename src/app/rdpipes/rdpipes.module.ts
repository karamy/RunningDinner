import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BadgeFilterPipe } from './badge-filter/badge-filter.pipe';
import { CategoryFilterPipe } from './category-filter/category-filter.pipe';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [BadgeFilterPipe, CategoryFilterPipe],
    exports: [BadgeFilterPipe, CategoryFilterPipe]
})
export class RDPipesModule { }