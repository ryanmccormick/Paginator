import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

export const homeComponents = [HomeComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [homeComponents],
  declarations: [homeComponents]
})
export class HomeModule { }
