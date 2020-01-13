import {NgModule} from '@angular/core';
import {CityHelperStore} from './store/city-helper.store';
import {CityHelperService} from './city-helper.service';
import {StoreModule} from '@ngrx/store';
import {CityHelperReducer} from './store/city-helper.reducer';
import {metaReducers} from '../../../store-base/meta.reducers';
import {EffectsModule} from '@ngrx/effects';
import {CityHelperEffects} from './city-helper.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(CityHelperStore.storeName, CityHelperReducer.reducer, {
      metaReducers,
      initialState: CityHelperReducer.initialState
    }),
    EffectsModule.forFeature([CityHelperEffects])
  ],
  providers: [
    CityHelperStore,
    CityHelperService
  ]
})
export class CityHelperStoreModule {
}
