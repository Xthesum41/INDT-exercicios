import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Categoria } from "./Categoria";

@Entity("produtos")
export class Produto {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nome!: string;

  @Column({ type: "text", nullable: true })
  descricao?: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco!: number;

  @Column({ type: "int" })
  estoque!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  categoria!: Categoria;

  @CreateDateColumn({ name: "data_criacao" })
  dataCriacao!: Date;

  @UpdateDateColumn({ name: "data_atualizacao" })
  dataAtualizacao!: Date;
}
