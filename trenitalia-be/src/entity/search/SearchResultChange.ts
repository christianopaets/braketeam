import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SearchResult} from './SearchResult';

@Entity()
export class SearchResultChange {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  trainIdentifier: string;

  @Column({
    type: 'varchar',
    length: 10
  })
  trainAcronym: string;

  @Column({
    type: 'varchar',
    length: 10
  })
  trainType: string;

  @Column({
    type: 'varchar',
    length: 10
  })
  priceType: string;

  @ManyToOne(type => SearchResult, result => result.changes, {
    cascade: ['insert', 'update']
  })
  result: SearchResult;
}
