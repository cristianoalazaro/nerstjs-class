import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ length: 63 })
    name: string;

    @Column({ length: 127, unique: true })
    email: string;

    @Column({ length: 127 })
    password: string;

    @Column({ type: 'date', nullable: true })
    birthAt?: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt?: string;

    @Column({ enum: Role, default: Role.User })
    role?: number;
}