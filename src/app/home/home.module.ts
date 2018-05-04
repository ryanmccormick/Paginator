import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

export const homeComponents = [HomeComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [homeComponents],
  declarations: [homeComponents]
})
export class HomeModule { }
