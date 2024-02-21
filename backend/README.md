# Guia de backend

## Setup de ambiente

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm test
```

Acesse o aplicativo em `http://localhost:3000`

## Rodando a aplicação em docker:
### Main
    No diretório `backend/MainService/`:
    `docker-compose build`
    `docker-compose up`

### Notification
    No diretório `backend/NotificationService/`:
    `docker-compose build`
    `docker-compose up`

## Contribuição

Crie uma branch para sua feature: 

```bash
  git checkout -b minha-feature
```

Faça o commit das suas alterações: 

```bash
  git commit -m 'feat: Minha nova feature"
```

Faça o push para a sua branch: git push origin minha-feature

```bash
  git push origin minha-feature
```

Abra um Pull Request