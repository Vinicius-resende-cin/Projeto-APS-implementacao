# Delivery Control

## Descrição

Projeto criado para a disciplina de APS (Análise e Projeto de Sistemas) do curso de Ciência da Computação do Centro de Informática da Universidade Federal de Pernambuco (UFPE).

## Equipe

- Dário Vasconcelos
- Karen Samara
- Marco Santana
- Vinícius Resende

## Arquitetura

### Front-end

O front-end foi desenvolvido utilizando o framework [React](https://reactjs.org/) com Typescript, e foi estruturado da seguinte forma:

- `public/`: Contém os arquivos estáticos do projeto, como o `index.html` e `manifest.json`.
- `src/`: Contém os arquivos do projeto, como os componentes React e os arquivos de estilo.
  - `components/`: Contém os componentes React do projeto.
  - `pages/`: Contém as páginas do projeto.
  - `services/`: Agrupa serviços relacionados ao backend, como chamadas de API ou lógica de negócios.
  - `config/`: Contém arquivos de configuração do projeto.

_Importante:_ Cada componente corresponde a uma classe de projeto, cada página corresponde a uma tela da GUI e cada service corresponde a um subsistema ou acesso à camada de dados. Dessa forma, o front-end implementa as camadas de GUI e Negócios do projeto.

### Back-end

O back-end foi desenvolvido utilizando o framework [Node](https://nodejs.org/) com Typescript, e foi estruturado da seguinte forma:

- `node_modules/`
- `src/`
  - `controllers/`
  - `models/`
  - `routes/`
  - `data/`
  - `index.js`
- `utils/`
- `package.json`
- `README.md`

#### Descrição

- A pasta node_modules contém as dependências do projeto instaladas pelo npm.
- A pasta src contém o código-fonte do projeto, com subpastas para controllers, models, routes e data.
- O arquivo index.js é o ponto de entrada do projeto e contém a configuração do servidor e a definição das rotas.
- O arquivo package.json contém as informações do proj eto, como nome, versão e dependências.
- O arquivo README.md contém a documentação do projeto.
- A pasta utils pode ser utilizada para armazenar funções utilitárias que podem ser utilizadas em diferentes partes do projeto.
Essa é uma estrutura básica e pode ser expandida ou modificada de acordo com as necessidades do projeto.


## Rodando o projeto:
Requisitos:
1. [Docker](https://docs.docker.com)
2. [docker-compose](https://docs.docker.com/compose/)

Em um terminal na pasta inicial do projeto rode:
1. `docker-compose build` Para buildar os serviços
2. `docker-compoes up` Para iniciar os serviços
3. Acesse a url: http://localhost:3000 