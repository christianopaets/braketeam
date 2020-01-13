import {IState} from '../../../../store-base/state.interface';
import {IApiStation} from '../../interfaces/api/api-station.interface';
import {IStation} from '../../interfaces/station.interface';

export interface ICityHelperState extends IState<IApiStation[], IStation[]> {

}
