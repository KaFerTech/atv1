import { Controller, Get, Param, Body, Post, Query, Put, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { ProdutosDTO } from './dtos/ProdutosDTO';
import { InjectModel } from '@nestjs/sequelize';
import { Produtos } from './models/Produtos';
import { ResponseCreateProduto } from './dtos/ResponseCreateProduto';
import { ResponseUpdateProduto } from './dtos/ResponseUpdateProduto';
import { ResponseDeleteProduto } from './dtos/ResponseDeleteProduto';

@Controller()
export class AppController {
  constructor(
    @InjectModel(Produtos)
    private produtos: typeof Produtos,
    private readonly appService: AppService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


//3 - Crie uma rota get que exibe todos os produtos
  @Get('/produtos')
  async getProdutos(): Promise<Produtos[]> {
    return this.produtos.findAll();
  }

//4 - Crie uma rota get que exibe apenas os produtos especificados por meio do nome, mediante querystring
  @Get('/produto-nome')
  async getProdutoByQueryString(@Query('nome') nome: string): Promise<Produtos[]> {
    return this.produtos.findAll({
      where: {
        nome,
      },
    });
  }

//5 - Crie uma rota post que faz o insert de produtos novos
  @Post('/produto')
  async createProdutosWithService(
    @Body() postData: ProdutosDTO,
  ): Promise<ResponseCreateProduto> {
    this.appService.createProduto(postData);
    return new ResponseCreateProduto('the insert was successfulll', postData);
  }

//6 - Crie uma rota put que faz update dos produtos
@Put('/produto')
  async putProdutoWithService(
    @Query('id') id: number,
    @Body() body: ProdutosDTO,
  ) : Promise<ResponseUpdateProduto> {
    this.validation(id, body);

    return new ResponseUpdateProduto(
      await this.appService.putProduto(id, body)
    ); 
  }

//7 - Crie uma rota delete que faz a remoção dos produtos '' Pode fazer na linguagem/framework que se sentir mais confortável.
@Delete('/produto')
async deleteProduto(
  @Query('id') id: number,
): Promise<ResponseDeleteProduto> {
  this.validationIdElement(id);
  const deletedProduto = await this.appService.deleteProduto(id);

  return new ResponseDeleteProduto(deletedProduto);
}



@Get('/produto/:id')
async getProdutoById(@Param('id') id: number): Promise<Produtos[]> {
  return this.produtos.findAll({
    where: {
      id,
    },
  });
}




private validation(
  id: number,
  body: ProdutosDTO
) {
  this.validationIdElement(id)
  this.validationBody(body)
}

private validationIdElement(id: number) {
  if(!id) {
    throw new HttpException(
      'Server Error - ID não encontrado', 
      HttpStatus.BAD_REQUEST
    )
  }
}

private validationBody(body: ProdutosDTO) {
  if (!Object.keys(body).length) {
    throw new HttpException(
      'Server Error - Body não encontrado', 
      HttpStatus.BAD_REQUEST
    );
  }
}
}
