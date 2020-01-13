import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CityHelperModalModule} from './city-helper-modal/city-helper-modal.module';

const modules = [
  CityHelperModalModule
];

@NgModule({
  exports: modules,
  imports: [
    CommonModule,
    ...modules
  ]
})
export class FrameworkModule { }
