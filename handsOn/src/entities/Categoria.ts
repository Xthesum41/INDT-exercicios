import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Produto } from "./Produto";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  nome!: string;

  @Column({ type: "text", nullable: true })
  descricao?: string | null;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos!: Produto[];

  @CreateDateColumn({ name: "data_criacao" })
  dataCriacao!: Date;

  @UpdateDateColumn({ name: "data_atualizacao" })
  dataAtualizacao!: Date;
}
