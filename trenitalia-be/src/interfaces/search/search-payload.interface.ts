import {IsDate, IsDefined, IsIn, IsNotEmpty, Matches, Max, Min, ValidateNested} from 'class-validator';
import {TTripType} from '../../enums/trip-type.enum';
import {Type} from 'class-transformer';

export class IPassengersPayload {

  @Max(6, {message: 'validation.search.passengers.adults.max'})
  @Min(1, {message: 'validation.search.passengers.adults.max'})
  adults: number;

  @Max(6, {message: 'validation.search.passengers.children.max'})
  @Min(0, {message: 'validation.search.passengers.children.max'})
  children: number;
}

export class ISearchPayload {

  @IsNotEmpty({message: 'validation.search.from.empty'})
  from: string;

  @IsNotEmpty({message: 'validation.search.to.empty'})
  to: string;

  @IsNotEmpty({message: 'validation.search.date.empty'})
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}[+-]\d{1,2}$/, {message: 'validation.search.date.format'})
  date: string;

  @ValidateNested()
  @Type(() => IPassengersPayload)
  passengers: IPassengersPayload;

  @IsNotEmpty({message: 'validation.search.trip-type.empty'})
  @IsIn([TTripType.OneWay, TTripType.Round], {message: 'validation.search.trip-type.value'})
  tripType: TTripType;
}
