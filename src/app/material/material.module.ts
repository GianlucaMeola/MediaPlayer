import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule
} from "@angular/material";

const AGModules = [
  MatButtonModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AGModules
  ],
  exports: AGModules
})
export class MaterialModule { }
