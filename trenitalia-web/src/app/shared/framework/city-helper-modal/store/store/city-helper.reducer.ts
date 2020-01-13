import {ICityHelperState} from './city-helper.state';
import {CityHelperActions} from './city-helper.actions';

export namespace CityHelperReducer {

  export const initialState: ICityHelperState = {
    loading: false,
    loaded: false,
    data: [],
    apiData: []
  };

  export function reducer(state: ICityHelperState, action: CityHelperActions.TAll): ICityHelperState {
    switch (action.type) {
      case CityHelperActions.TActions.Load: {
        return {
          ...state,
          loaded: false,
          loading: true
        };
      }

      case CityHelperActions.TActions.Success: {
        return {
          ...state,
          loading: false,
          loaded: true,
          apiData: action.payload
        };
      }

      case CityHelperActions.TActions.Transformed: {
        return {
          ...state,
          data: action.payload
        };
      }

      case CityHelperActions.TActions.Fail: {
        return {
          ...state,
          loading: false,
          loaded: false
        };
      }
    }
    return state;
  }
}
