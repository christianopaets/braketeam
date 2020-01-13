import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SearchParams} from './SearchParams';
import {SearchStatus} from './SearchSatus';

@Entity()
export class Search {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => SearchStatus, {
    cascade: true
  })
  @JoinColumn()
  status: SearchStatus;

  @OneToOne(type => SearchParams, {
    cascade: true
  })
  @JoinColumn()
  params: SearchParams;
}
