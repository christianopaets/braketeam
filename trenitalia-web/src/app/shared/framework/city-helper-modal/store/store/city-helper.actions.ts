import {Action} from '@ngrx/store';
import {IApiStation} from '../../interfaces/api/api-station.interface';
import {IStation} from '../../interfaces/station.interface';

export namespace CityHelperActions {

  export enum TActions {
    Load = '[City helper] Load',
    Success = '[City helper] Load success',
    Transformed = '[City helper] Transformed success',
    Fail = '[City helper] Load fail',
  }

  export class Load implements Action {
    readonly type = TActions.Load;

    constructor(readonly payload: string) {
    }
  }

  export class Success implements Action {
    readonly type = TActions.Success;

    constructor(readonly payload: IApiStation[]) {
    }
  }

  export class Transformed implements Action {
    readonly type = TActions.Transformed;

    constructor(readonly payload: IStation[]) {
    }
  }

  export class Fail implements Action {
    readonly type = TActions.Fail;
  }

  export type TAll = Load | Success | Transformed | Fail;
}
