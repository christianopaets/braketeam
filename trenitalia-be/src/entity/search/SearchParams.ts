import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {TTripType} from '../../enums/trip-type.enum';
import {ISearchPayload} from '../../interfaces/search/search-payload.interface';

@Entity()
export class SearchParams {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '30'
  })
  from: string;

  @Column({
    type: 'varchar',
    length: '30'
  })
  to: string;

  @Column({
    type: 'varchar',
    length: '30'
  })
  date: string;

  @Column({
    type: 'varchar',
    length: '20'
  })
  tripType: TTripType;

  @Column({
    type: 'int'
  })
  adults: number;

  @Column({
    type: 'int'
  })
  children: number;

  constructor(params: ISearchPayload = null) {
    if (params) {
      this.from = params.from;
      this.to = params.to;
      this.date = params.date;
      this.adults = params.passengers.adults;
      this.children = params.passengers.children;
      this.tripType = params.tripType;
    }
  }
}
