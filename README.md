<h1 align="center">FLEM BD Domínio API</h1>
<p align=center><i align="center">API de conexão com o BD da Domínio, para o cliente FLEM</i></p>

<br>

<div align="center">

<a href="https://www.javascript.com"><img src="https://img.shields.io/badge/JavaScript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E" height="22" alt="JavaScript"/></a>
<a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white" height="22" alt="NodeJS"/></a>
<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white" height="22" alt="NextJS"/></a>
<a href="https://www.microsoft.com/pt-br/sql-server/sql-server-2019"><img src="https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?logo=microsoft%20sql%20server&logoColor=white" height="22" alt="MSSQLServer"/></a>

<a href=""><img src="https://img.shields.io/badge/maintenance-actively--developed-brightgreen.svg" height="22" alt="Maintenance-actively-developed"/></a>
<a href=""><img src="https://img.shields.io/github/last-commit/frtechdev/flem-bd-dominio-api" height="22" alt="LastCommit"></a>
<a href=""><img src="https://snyk.io/test/github/frtechdev/flem-bd-dominio-api/badge.svg" height="22" alt="Snyk"/></a>

<a href=""><img src="https://img.shields.io/github/repo-size/frtechdev/flem-bd-dominio-api" height="22" alt="RepoSize"/></a>
<a href=""><img src="https://img.shields.io/github/languages/code-size/frtechdev/flem-bd-dominio-api" height="22" alt="CodeSize"/></a>
<a href=""><img src="https://img.shields.io/github/contributors/frtechdev/flem-bd-dominio-api" height="22" alt="Contributors"></a>

<a href=""><img src="https://img.shields.io/github/forks/frtechdev/flem-bd-dominio-api" height="22" alt="Fork"></a>
<a href=""><img src="https://img.shields.io/github/release/DexDevLab/flem-bd-dominio-api.svg" height="22" alt="LatestRelease"></a>
<a href="https://github.com/frtechdev/flem-bd-dominio-api/blob/main/LICENSE"><img src="https://img.shields.io/github/license/frtechdev/flem-bd-dominio-api" height="22" alt="License"></a>

|| [Conteúdo](#section-conteudo) || [Características](#section-caracteristicas) || [Stack](#section-stack) || [Documentação](#section-documentacao) || [Instruções](#section-instrucoes) ||

|| [Variáveis de Ambiente](#section-vars) || [Notas de versão](#section-changelog) || [Autores](#section-autores) || [Contato](#section-contato) || [Licença](#section-licenca) ||

</div>

<hr>

<a name="section-conteudo">

## Conteúdo

</a>

<br>

API de conexão com o BD da Domínio, para o cliente FLEM.

Tem os seguintes objetivos:

- Fornecer uma API de alta performance e baixo custo computacional que consuma de maneira segura e estável os dados requisitados;
- Manipular de maneira independente e com controle integrado dados provenientes do BD da Domínio.

<hr>

<a name="section-caracteristicas">

## Características

</a>

<br>

- Facilita os processos resumindo todas as suas funcionalidades centradas no consumo dos dados sem comprometer a performance.

<hr>

<a name="section-stack">

## Stack

</a>

<br>

- **Linguagem Principal:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Framework Principal:** [Node.js](https://nodejs.org/en/docs/)
- **Framework estrutural:** [Next.js](https://nextjs.org/docs/getting-started)
- **Biblioteca de Conexão ODBC / ORM:** [Sybase-Promised](https://github.com/mscamargo/sybase-promised)
- **Banco de Dados:** [Sybase](https://www.sap.com/brazil/products/technology-platform/sybase-ase.html)
- **Gerenciador de Dependências:** [Yarn](https://yarnpkg.com/getting-started)
- **Bibliotecas:** Para uma lista completa de bibliotecas e dependências nos mais variados escopos, conferir o arquivo [package.json](https://github.com/frtechdev/flem-bd-dominio-api/blob/main/package.json).

<hr>

<a name="section-documentacao">

## Documentação

</a>

<br>

Documentação adicional pode ser encontrada [aqui](https://frtechdev.github.io/flem-bd-dominio-api/).

<hr>

<a name="section-instrucoes">

## Instruções

</a>

<br>

### Utilizando o repositório como projeto

</a>

1 - Faça um git clone ou o download do repositório, da forma que preferir

```bash

git clone https://github.com/frtechdev/flem-bd-dominio-api.git

```

2 - Instale um gerenciador de pacotes (preferencialmente yarn) utilizando um terminal no diretório raiz do repositório clonado

`yarn` ou `npm install`

3 - Execute a aplicação no terminal

`yarn dev` ou `npm run dev`

### Implantando o projeto

</a>

#### Por um repositório clonado

**Lembre-se de executar `yarn build` ANTES de criar seu container com base no repositório local.**

Para criar a imagem, utilize o `docker build` referenciando o arquivo local do [Dockerfile](https://github.com/frtechdev/flem-bd-dominio-api/blob/main/Dockerfile):

```bash
docker build --env-file .env -f Dockerfile .
```

#### Diretamente do repositório remoto

Você pode utilizar o `docker build` referenciando diretamente o repositório:

```bash
docker build https://github.com/frtechdev/flem-bd-dominio-api.git#main
```

Alternativamente, pode usar o comando detalhado para alterar diretamente configurações como porta e nome do repositório:

```bash
docker run -p X:3000 --env-file .env -e github='https://github.com/frtechdev/flem-file-upload-api.git' -it frtechdev/flem-file-upload-api
```

**Lembre-se de criar um arquivo `.env` para definir as variáveis de ambiente utilizadas na imagem, ou especificar as variáveis utilizadas uma a uma na linha de comando acima.**

Onde "X" é uma porta externa de sua escolha. Por padrão, a porta interna é 4030.
Para alterar a porta interna, altere a linha `ENV PORT` do [Dockerfile](https://github.com/frtechdev/flem-bd-dominio-api/blob/main/Dockerfile).

Para mais informações, visite a [Documentação do Docker](https://docs.docker.com).

</a>

<hr>

<a name="section-vars">

### Variáveis de Ambiente

</a>

<br>

| Variável      | Uso   |
|---------------|-------|
|`DB_HOST` | Endereço do Servidor de BD Sybase Domínio. | |
|`DB_PORT` | Porta de conexão com o Servidor de BD Sybase Domínio. | |
|`DB_DBNAME` | Nome do BD do Servidor de BD Sybase Domínio. | |
|`DB_USERNAME` | Nome de usuário da conexão com o Servidor de BD Sybase Domínio. | |
|`DB_PASSWORD` | Senha da conexão com o Servidor de BD Sybase Domínio. | |

<hr>

<a name="section-changelog">

## Notas de versão

</a>

<br>

### v1.0.0-230625

- Criação de um script de Github Actions para Tag e Release automáticos das versões no branch `main`
- Adição de um script de Github Actions para deploy automático de imagem Docker
- Adição de script de limpeza de index de cache do Git
- Adição do arquivo `.yarnclean` para sanitização de módulos
- Inclusão de scripts yarn
- Documentação de todos os componentes, módulos, arquivos e componentes do projeto
- Criação de Handler para tratamento de Exceções e resposta para o usuário
- Atualização da Documentação

### v0.0.14-230112

- Atualização da Documentação
- Correção do método POST em api/funcionarios para inclusão dos critérios de filtragem
- Implementação da biblioteca Forever para gerenciamento do processo Node a fim de que este reinicialize em caso de erro com o conector Sybase
- Alteração do parâmetro de script "yarn dev" para inicializar uma instância Forever invocando a aplicação
- Adição de parâmetro de script "yarn stop" para finalizar corretamente o processo-filho do Forever e contornar o bug do Node no Windows

### v0.0.13-230110

- Atualização da Documentação
- Adição de método POST para critérios de condições longas

### v0.0.12-230109

- Atualização do GITIGNORE
- Adição de comando yarn para realizar o contorno do update do caniuse (browserslist update)
- Atualização do README
- Alteração na API para utilizar um único queryComposer
- Ajuste nos utilitários de conversão de array para o queryComposer

### v0.0.11-221111

- Atualização da documentação

### v0.0.10-221110

- Atualização da documentação

### v0.0.9-221110

- Remoção do utilitário de composição da query de cada controller e agrupado em um utilitário específico
- Criados controllers para query de afastamentos e de beneficiários
- Atualização da documentação

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

### v0.0.7-220902

- Atualização da documentação
- Remoção do CHANGELOG e inclusão no README

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

### v0.0.5-220322fr

- v0.0.4-220322rl

### v0.0.4-220228fr

- Efetuado criação da rota 'Funcionário' para consulta de dados do colaborador pela matrícula

### v0.0.3-220228fr

- v0.0.2-220228fr
- v0.0.1-220228dx

### v0.0.2-220228fr

- v0.0.1-220228dx

### v0.0.1-220228dx

- Criação do README
- Criação do CHANGELOG
- Recompilação da documentação inicial

<hr>

<a name="section-autores">

## Autores

</a>

<br>

<a href="https://github.com/frtechdev/flem-bd-dominio-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=frtechdev/flem-bd-dominio-api" />
</a>

<hr>

<a name="section-contato">

## Contato

</a>

<br>

Se você gostou deste projeto, dê uma <a href="https://github.com/frtechdev/flem-bd-dominio-api" data-icon="octicon-star" aria-label="Star frtechdev/flem-bd-dominio-api on GitHub">estrela</a>. <br>
Para contato, envie um email a: <a href="mailto:dex.houshi@hotmail.com">dex.houshi@hotmail.com</a>

<hr>

<a name="section-licenca">

## Licença

</a>

Licenciado sob a [MIT License](https://github.com/frtechdev/flem-bd-dominio-api/blob/main/LICENSE).
