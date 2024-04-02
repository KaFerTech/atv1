import { ProdutosDTO } from './ProdutosDTO';

export class ResponseDeleteProduto {
  public message: string;
  public produto: ProdutosDTO;

  public constructor(produto: ProdutosDTO) {
    this.message = "Produto excluido com sucesso.";
    this.produto = produto;
  }
}