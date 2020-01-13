import {ILefrecceSearchResultTrain} from './lefrecce-search-result-train.interface';
import {TDirection} from '../../../enums/direction.enum';

export interface ILefrecceSearchResult {
  idsolution: string;
  origin: string;
  destination: string;
  direction: TDirection;
  departuretime: number;
  arrivaltime: number;
  minprice: string;
  optionaltext: string;
  duration: string;
  changesno: number;
  bookable: boolean;
  saleable: boolean;
  trainlist: ILefrecceSearchResultTrain[];
  onlycustom: boolean;
  extraInfo: any[];
  showSeat: boolean;
  specialOffer: any;
  transportMeasureList: any[];
}
