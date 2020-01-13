import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CityHelperService} from './city-helper.service';
import {CityHelperActions} from './store/city-helper.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CityHelperEffects {

  constructor(private readonly actions: Actions,
              private readonly cityHelperService: CityHelperService) {
  }

  @Effect()
  load$ = this.actions
    .pipe(ofType<CityHelperActions.Load>(CityHelperActions.TActions.Load))
    .pipe(switchMap(action => this.cityHelperService.get(action.payload)
      .pipe(map(res => new CityHelperActions.Success(res)))
      .pipe(catchError(err => of(new CityHelperActions.Fail())))
    ));

  @Effect()
  transform$ = this.actions
    .pipe(ofType<CityHelperActions.Success>(CityHelperActions.TActions.Success))
    .pipe(map(action => this.cityHelperService.transform(action.payload)))
    .pipe(map(res => new CityHelperActions.Transformed(res)));
}
