import {TTripType} from '../enum/trip-type.enum';

export interface IPassengersPayload {
  adults: number;
  children: number;
}

export interface ISearchPayload {
  from: string;
  to: string;
  dateFrom: string;
  passengers: IPassengersPayload;
  tripType: TTripType;
}
