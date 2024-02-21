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
    `docker build -t delivery-control-main-back .`
    `docker run -p 3100:3100 delivery-control-main-back`

### Notification
    No diretório `backend/NotificationService/`:
    `docker build -t delivery-control-notification-back .`
    `docker run -p 3101:3101 delivery-control-notification-back`

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