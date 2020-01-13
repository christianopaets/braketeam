import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import {FrameworkModule} from '@shared/framework/framework.module';
import {SearchService} from './search.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgStackFormsModule} from '@ng-stack/forms';
import {SearchPageRoutingModule} from './search.routing';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FrameworkModule,
    TranslateModule,
    NgStackFormsModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage],
  providers: [SearchService]
})
export class SearchModule {}
