import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Produtos } from './models/Produtos';
import { InjectModel } from '@nestjs/sequelize';
import { ProdutosDTO } from './dtos/ProdutosDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Produtos)
    private produtos: typeof Produtos
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createProduto(postData: ProdutosDTO) {
    this.produtos.create({
      nome: postData.nome,
      empresa: postData.empresa,
      descricao: postData.descricao,
      quantidade: postData.quantidade,
      marca: postData.marca,
      valor: postData.valor,
    });
  }


  async putProduto(
    id: number,
    putData: ProdutosDTO
  ) {
    const produto = await this.produtos.findOne({
      where: {
        id,
      }
    });

    if (!produto) {
      throw new HttpException(
        `Não encontrado produto com o ID ${id}`, 
        HttpStatus.NOT_FOUND
      );
    }
    return await produto.update(putData);
  }


  async deleteProduto(id: number): Promise<ProdutosDTO> {
    const produto = await this.produtos.findByPk(id);
  
    if (!produto) {
      throw new HttpException(
        `Não encontrado produto com o ID ${id}`, 
        HttpStatus.NOT_FOUND
      );
    }
  
    await produto.destroy();
  
    return produto.toJSON() as ProdutosDTO;
  }
  


}