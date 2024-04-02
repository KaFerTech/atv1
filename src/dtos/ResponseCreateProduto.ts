import { ProdutosDTO } from './ProdutosDTO';

export class ResponseCreateProduto {
  public message: string;
  public produto: ProdutosDTO;

  public constructor(message, produto: ProdutosDTO) {
    this.message = message;
    this.produto = produto;
  }
}