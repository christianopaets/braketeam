import {BeforeInsert, Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {TSearchStatus} from '../../enums/search-status.enum';

@Entity()
export class SearchStatus {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20
  })
  status: TSearchStatus;

  constructor(status: TSearchStatus = null) {
    if (status) {
      this.status = status;
    }
  }

}
