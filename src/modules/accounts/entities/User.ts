import {Entity, PrimaryColumn,Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_users")
class User {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;
}

export {User}
