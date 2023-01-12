<hr>
<h1 align="center">flem-bd-dominio-api</h1>
<p align=center><i align="center">API de conexão com o BD da Domínio, para o cliente FLEM</i></p>

<br>

<div align="center">

<a href="">![Known Vulnerabilities](https://snyk.io/test/github/frtechdev/flem-bd-dominio-api/badge.svg)</a>
<a href="">![Code Size](https://img.shields.io/github/languages/code-size/frtechdev/flem-bd-dominio-api)</a>
<a href="">![Repo Size](https://img.shields.io/github/repo-size/frtechdev/flem-bd-dominio-api)</a>
<a href="">[![Contributors](https://img.shields.io/github/contributors/frtechdev/flem-bd-dominio-api)](https://github.com/frtechdev/flem-bd-dominio-api/graphs/contributors)</a><br>
<a href="">![Last Commit](https://img.shields.io/github/last-commit/frtechdev/flem-bd-dominio-api)</a>
<a href="">[![Fork](https://img.shields.io/github/forks/frtechdev/flem-bd-dominio-api)](https://github.com/frtechdev/flem-bd-dominio-api/fork) </a>
<a href="">![Version](https://img.shields.io/badge/version-0.0.14-005bff) </a>
<a href="">[![license](https://img.shields.io/github/license/frtechdev/flem-bd-dominio-api)](https://github.com/frtechdev/flem-bd-dominio-api/LICENSE)</a>

<br>

</div>

<hr>

<br>

API que consome requisições das aplicações FLEM para o Banco de Dados de terceiros (Domínio Sistemas).

<br>

## Conteúdo

- [Objetivo](#section-obj)
- [Características](#section-carac)
- [Especificações](#section-specs)
- [Stack](#section-stack)
- [Documentação](#section-docs)
- [Como usar este repositório](#section-como-usar)
- [Notas de versão](#section-changelog)
- [Autores](#section-autores)
- [Contato](#section-contato)
- [Licença](#section-licenca)

<hr>

<br>

<a name="section-obj">

## Objetivo

</a>

- Fornecer uma API de alta performance e baixo custo computacional que consuma de maneira segura e estável os dados requisitados;
- Manipular de maneira independente e com controle integrado dados provenientes do BD da Domínio.

<hr>

<br>

<a name="section-carac">

## Características

</a>

- Facilita os processos resumindo todas as suas funcionalidades centradas no consumo dos dados sem comprometer a performance.

<hr>

<br>

<a name="section-specs">

## Especificações

</a>

- **Tipo de Software:** Interface de Programação de Aplicações
- **Distribuição:** Web
- **Arquitetura:** MVC
- **Metodologia de Projeto:** Metodologia Ágil
- **Estrutura de Biblioteca:** Baseada em Framework
- **Protocolo de Banco de Dados:** ODBC
- **Dialeto de Banco de Dados:** SQL
- **Disponibilidade de Código:** Open Source

<hr>

<br>

<a name="section-stack">

## Stack

</a>

- **Linguagem Principal:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Framework Principal:** [Node.js](https://nodejs.org/en/docs/)
- **Framework estrutural:** [Next.js](https://nextjs.org/docs/getting-started)
- **Biblioteca de Conexão ODBC:** [Sybase-Promised](https://www.npmjs.com/package/sybase-promised)
- **Gerenciador de Bibliotecas:** [Yarn](https://yarnpkg.com/getting-started)
- **Bibliotecas:** Para uma lista completa de bibliotecas e dependências nos mais variados escopos, conferir o arquivo [package.json](https://github.com/frtechdev/flem-bd-dominio-api/blob/main/package.json).

<hr>

<br>

<a name="section-docs">

## Documentação

</a>

Confira a documentação completa [aqui](https://frtechdev.github.io/flem-bd-dominio-api/).

<hr>

<br>

<a name="section-como-usar">

## Como usar este repositório

</a>

<br>

<a name="section-use-project">

### Como Projeto

</a>

1 - Faça um git clone ou o download do repositório, da forma que preferir

`git clone https://github.com/frtechdev/flem-bd-dominio-api.git`

2 - Instale um gerenciador de pacotes (preferencialmente yarn) utilizando um terminal no diretório raiz do repositório clonado

`yarn` ou `npm install`

3 - Execute a aplicação no terminal

`yarn dev` ou `npm run dev`

<br>

<a name="section-vars">

### Variáveis de Ambiente

</a>

Para testar a aplicação, crie um arquivo .env com as seguintes variáveis de ambiente:

| Variável                 | Uso  |
| ------------------- | -------|
|`DB_HOST=`| Define o endereço do Servidor de Banco de Dados Sybase |
|`DB_PORT=`| Define a porta de conexão ao Servidor |
|`DB_DBNAME=`| Define o nome do Banco de Dados |
|`DB_USERNAME=`| Define o nome de usuário de acesso ao Banco de Dados |
|`DB_PASSWORD=`| Define a senha de acesso ao Banco de Dados |

<hr>

<br>

<a name="section-changelog">

## Notas de versão

</a>

<br>

### v0.0.14-230112

- Atualização da Documentação
- Correção do método POST em api/funcionarios para inclusão dos critérios de filtragem
- Implementação da biblioteca Forever para gerenciamento do processo Node a fim de que este reinicialize em caso de erro com o conector Sybase
- Alteração do parâmetro de script "yarn dev" para inicializar uma instância Forever invocando a aplicação
- Adição de parâmetro de script "yarn stop" para finalizar corretamente o processo-filho do Forever e contornar o bug do Node no Windows

<br>

### v0.0.13-230110

- Atualização da Documentação
- Adição de método POST para critérios de condições longas

<br>

### v0.0.12-230109

- Atualização do GITIGNORE
- Adição de comando yarn para realizar o contorno do update do caniuse (browserslist update)
- Atualização do README
- Alteração na API para utilizar um único queryComposer
- Ajuste nos utilitários de conversão de array para o queryComposer

<br>

### v0.0.11-221111

- Atualização da documentação

<br>

### v0.0.10-221110

- Atualização da documentação

<br>

### v0.0.9-221110

- Remoção do utilitário de composição da query de cada controller e agrupado em um utilitário específico
- Criados controllers para query de afastamentos e de beneficiários
- Atualização da documentação

<br>

### v0.0.8-220922

- Atualização da documentação
- Atualização do GITIGNORE
- Modificação do controller de busca de funcionários para uma melhor organização entre as funções e as queries
- Criação de um controller para pesquisa de histórico de férias, ausências e licenças de funcionários
- Criação de um controller para pesquisa de dados de beneficiários dentre os dados dos funcionários
- Criação de rota API para busca de dados de beneficiários, afastamentos e lista geral
- Resolvido bug de performance causado pela desconexão mal resolvida do Sybase-Promised
- Criado componente específico para armazenamento de queries realizadas pelos controllers
- Reformulação das queries para trazer informações mais legíveis e completas
- Criado componente para parametrizar fragmentos condicionais das queries (CASE, IF)
- Acrescentados utilitários
- Revisados utilitários de manipulação de array
- Revisados métodos de composição de filtro de pesquisa de query dos controllers

<br>

### v0.0.7-220902

- Atualização da documentação
- Remoção do CHANGELOG e inclusão no README

<br>

### v0.0.6-220726dx

- Adição de arquivos .env e yarn lock ao gitignore
- Adição de configurações de linting
- Removidos dados de versão no Changelog
- Remoção do template da API
- Atualização da documentação
- Atualização dos parâmetros jsdoc para compilação da documentação
- Ajustes ao next coinfig para direcionamento automático de rota para alteração de Home Page da API
- Remoção do parâmetro de porta de conexão separadamente em arquivo .env e retorno da menção da porta pelo script do package.json
- Criação de Controller para manipulação e aquisição de dados
- Alteração da Rota de API para pesquisas de funcionários
- Implementação de função para controller customizado utilizando filtros de critério de pesquisa
- Criada função para alteração do título da Home Page da documentação visto limitação da biblioteca jsdoc
- Implementado método para aplicar CORS dentro da rota
- Implementada função de query ao BD utilizando o conector do Sybase
- Adicionados e revisados utilitários de máscaras e parsers

<br>

### v0.0.5-220322fr

- v0.0.4-220322rl

<br>

### v0.0.4-220228fr

- Efetuado criação da rota 'Funcionário' para consulta de dados do colaborador pela matrícula

<br>

### v0.0.3-220228fr

- v0.0.2-220228fr
- v0.0.1-220228dx

 <br>

### v0.0.2-220228fr

- v0.0.1-220228dx

 <br>

### v0.0.1-220228dx

- Criação do README
- Criação do CHANGELOG
- Recompilação da documentação inicial

<hr>

<br>

<a name="section-autores">

## Autores

</a>

<a href="https://github.com/frtechdev/flem-bd-dominio-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=frtechdev/flem-bd-dominio-api" />
</a>

<hr>

<br>

<a name="section-contato">

## Contato

</a>

Se você gostou desse projeto, nos dê uma <a href="https://github.com/frtechdev/flem-bd-dominio-api" data-icon="octicon-star" aria-label="Star frtechdev/flem-bd-dominio-api on GitHub">estrela</a>. Isso agirá como um indicador da qualidade dos nossos serviços. <br>
Para contato, envie um email a: <a href="mailto:devops@frtechnologies.com.br">devops@frtechnologies.com.br</a>

<hr>

<br>

<a name="section-licenca">

## Licença

</a>

Licenciado sob a [MIT License](https://github.com/frtechdev/flem-bd-dominio-api/blob/main/LICENSE).
