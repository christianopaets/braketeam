import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CityHelperModalComponent} from '@shared/framework/city-helper-modal/city-helper-modal.component';
import {fromPromise} from 'rxjs/internal-compatibility';
import {FormControl, FormGroup} from '@ng-stack/forms';
import {SearchService} from './search.service';
import {ISearchPayload} from './interfaces/search-payload.interface';
import * as moment from 'moment';

@Component({
  selector: 'ti-tab1',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  readonly minValue: string = moment().format('YYYY-MM-DD');
  readonly maxValue: string = moment().add(1, 'years').format('YYYY-MM-DD');

  readonly searchForm: FormGroup<ISearchPayload> = this.searchService.getSearchForm();

  constructor(private readonly modalCtrl: ModalController,
              private readonly searchService: SearchService) {
  }

  openModal(type: 'from' | 'to'): void {
    const options = {
      component: CityHelperModalComponent,
      componentProps: {
        destination: this.searchForm.get(type)
      }
    };
    fromPromise(this.modalCtrl.create(options))
      .subscribe(modal => modal.present());
  }

}
