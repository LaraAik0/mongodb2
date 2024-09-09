/*
const { MongoClient, ServerApiVersion } = require('mongodb');

// Substitua pela sua URI de conexão
const uri = "mongodb+srv://larasagaiif:iiw2022@projeto.9fh2p.mongodb.net/?retryWrites=true&w=majority&appName=projeto";

// Cria uma instância do MongoClient com as opções de API estável
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Função para conectar ao MongoDB
async function connectToMongoDB() {
    try {
        // Conecta o cliente ao servidor (opcional a partir da versão 4.7)
        await client.connect();
        // Envia um ping para confirmar uma conexão bem-sucedida
        await client.db("admin").command({ ping: 1 });
        console.log("Conexão estabelecida com sucesso ao MongoDB!");

        // Retorna o cliente para uso em outras partes do projeto
        return client;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        // Se a conexão falhar, encerra o processo com um código de erro
        process.exit(1);
    }
}

// Executa a conexão
connectToMongoDB().then(client => {
    // Aqui você pode começar a usar o cliente para interagir com o banco de dados
    console.log("MongoDB pronto para uso.");

    // Exemplo de operação com o banco de dados
    // const db = client.db('nome_do_seu_banco_de_dados');
    // Faça operações com o db aqui, como db.collection('sua_colecao').find({});

}).catch(console.error);

// Certifique-se de fechar a conexão ao finalizar o uso
process.on('SIGINT', async () => {
    await client.close();
    console.log("Conexão com o MongoDB encerrada.");
    process.exit(0);
});

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Configuração da string de conexão com o MongoDB
const mongoURI = 'mongodb+srv://larasagaiif:iiw2022.mongodb.net/<db_lara>?retryWrites=true&w=majority';

// Conectar ao MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definir o modelo de dados para o histórico de ações
const actionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Action = mongoose.model('Action', actionSchema);

// Rota para registrar uma nova ação
app.post('/actions', async (req, res) => {
  const { userId, action } = req.body;

  if (!userId || !action) {
    return res.status(400).json({ message: 'userId e action são obrigatórios' });
  }

  const newAction = new Action({
    userId,
    action,
  });

  try {
    const savedAction = await newAction.save();
    res.status(201).json(savedAction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para servir o frontend HTML
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
*/







// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configuração do Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Conexão com o MongoDB Atlas
const mongoURI = 'mongodb+srv://larasagaiif:iiw2022@projeto.9fh2p.mongodb.net/?retryWrites=true&w=majority&appName=projeto'; // Substitua pelo seu URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.log('Erro de conexão com o MongoDB:', err));

// Definindo o schema e o modelo
const historicoSchema = new mongoose.Schema({
  usuario: String,
  acao: String,
  data: { type: Date, default: Date.now }
});

const Historico = mongoose.model('Historico', historicoSchema);

// Endpoint para registrar ações
app.post('/registro', async (req, res) => {
  const { usuario, acao } = req.body;
  if (!usuario || !acao) {
    return res.status(400).json({ error: 'Usuário e ação são obrigatórios' });
  }
  
  try {
    const novoRegistro = new Historico({ usuario, acao });
    await novoRegistro.save();
    res.status(201).json({ message: 'Ação registrada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar ação', details: error });
  }
});

// Endpoint de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
