import { ProdutosDTO } from './ProdutosDTO';

export class ResponseUpdateProduto {
  public message: string;
  public produto: ProdutosDTO;

  public constructor(produto: ProdutosDTO) {
    this.message = "Produto atualizado com sucesso.";
    this.produto = produto;
  }
}