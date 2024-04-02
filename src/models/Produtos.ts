import {
    Column,
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
  } from 'sequelize-typescript';
    
  @Table
  export class Produtos extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    nome: string;
  
    @Column
    empresa: string;

    @Column
    descricao: string;
  
    @Column
    quantidade: number;

    @Column
    marca: string;
  
    @Column
    valor: number;
  }