import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CityHelperModalComponent} from './city-helper-modal.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {CityHelperStoreModule} from './store/city-helper.module';
import {NgStackFormsModule} from '@ng-stack/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CityHelperModalComponent],
  entryComponents: [CityHelperModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgStackFormsModule,
    CityHelperStoreModule,
    TranslateModule
  ]
})
export class CityHelperModalModule { }
