import * as dotenv from 'dotenv';
dotenv.config();

// Agora você pode acessar as variáveis de ambiente
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

console.log(accessKeyId);
console.log(secretAccessKey);