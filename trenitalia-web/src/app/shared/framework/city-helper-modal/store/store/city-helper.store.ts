import {Injectable, NgZone} from '@angular/core';
import {BaseStore} from '../../../../store-base/base.store';
import {ICityHelperState} from './city-helper.state';
import {Store} from '@ngrx/store';
import {CityHelperActions} from './city-helper.actions';
import {Observable} from 'rxjs';

@Injectable()
export class CityHelperStore extends BaseStore<ICityHelperState> {

  static storeName = 'city-helper';

  actions = CityHelperActions;

  constructor(protected readonly store: Store<ICityHelperState>,
              protected readonly ngZone: NgZone) {
    super(store, ngZone);
  }

  selectRoot$(): Observable<ICityHelperState> {
    return this.store.select((state => state[CityHelperStore.storeName]));
  }
}
