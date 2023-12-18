import express from 'express'

const app = express()

import { router } from './routes/routes'

app.use(express.json())
app.use(router)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
