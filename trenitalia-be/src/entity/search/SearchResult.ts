import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SearchResultChange} from './SearchResultChange';
import {TDirection} from '../../enums/direction.enum';

@Entity()
export class SearchResult {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  origin: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  destination: string;

  @Column({
    type: 'varchar',
    length: 1
  })
  direction: TDirection;

  @Column({
    type: 'bigint'
  })
  departureTime: number;

  @Column({
    type: 'bigint'
  })
  arrivalTime: number;

  @Column({
    type: 'varchar',
    length: 10
  })
  minPrice: string;

  @Column({
    type: 'varchar',
    length: 10
  })
  duration: string;

  @Column({
    type: 'int'
  })
  changesNumber: number;

  @Column({
    type: 'boolean'
  })
  bookable: boolean;

  @Column({
    type: 'boolean'
  })
  saleable: boolean;

  @OneToMany(type => SearchResultChange, changes => changes.result, {
    cascade: true
  })
  changes: SearchResultChange[];

  @Column({
    type: 'boolean'
  })
  onlyCustom: boolean;

  @Column({
    type: 'boolean'
  })
  showSeat: boolean;

  // specialOffer: any;
  // transportMeasureList: any[];
  // optionalText: string;
  // extraInfo: any[];
}
