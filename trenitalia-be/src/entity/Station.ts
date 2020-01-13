import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Station {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text'
  })
  stationName: string;

  @Column({
    type: 'int',
    default: 0
  })
  priority: number;

  constructor(stationName: string, priority: number = 0) {
    this.stationName = stationName;
    this.priority = priority;
  }
}
