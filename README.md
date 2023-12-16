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

O front-end foi desenvolvido utilizando o framework [React](https://reactjs.org/), e foi estruturado da seguinte forma:

- `public/`: Contém os arquivos estáticos do projeto, como o `index.html` e `manifest.json`.
- `src/`: Contém os arquivos do projeto, como os componentes React e os arquivos de estilo.
  - `components/`: Contém os componentes React do projeto.
  - `pages/`: Contém as páginas do projeto.
  - `services/`: Agrupa serviços relacionados ao backend, como chamadas de API ou lógica de negócios.

_Importante:_ Cada componente corresponde a uma classe de projeto, cada página corresponde a uma tela da GUI e cada service corresponde a um subsistema. Dessa forma, o front-end implementa as camadas de GUI e Negócios do sistema.

### Back-end
