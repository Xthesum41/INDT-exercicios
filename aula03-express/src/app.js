const express = require('express');
const app = express();
const PORT = 3000;

// PARTE 4 — ROTAS REST COM EXPRESS

// ROTA: Status do sistema
app.get('/status', (req, res) => {
    res.status(200).send('Sistema do Polo Industrial funcionando');
});

// ROTA: Fábrica
app.get('/fabrica', (req, res) => {
    res.status(200).send('Polo Industrial - Unidade Manaus');
});

// ROTA: Máquinas
app.get('/maquinas', (req, res) => {
    res.status(200).send('Maquinas em operacao: 24');
});

// PARTE 5 — RESPOSTAS JSON (BOA PRÁTICA REST)

// ROTA: Dados gerais
app.get('/dados', (req, res) => {
    const dados = {
        empresa: 'Polo Industrial',
        cidade: 'Manaus',
        status: 'Operando',
        maquinasAtivas: 24,
        funcionarios: 120,
        turnoAtual: 'Manhã'
    };
    res.status(200).json(dados);
});

// ROTA: Relatório dinâmico
app.get('/relatorio', (req, res) => {
    const agora = new Date();
    const relatorio = {
        data: agora.toLocaleDateString(),
        hora: agora.toLocaleTimeString(),
        statusGeral: 'Operação normal',
        mensagem: 'Todos os sistemas estão funcionando corretamente'
    };
    res.status(200).json(relatorio);
});

// PARTE 6 — STATUS CODES E ERROS
// Rota inexistente (404)
app.use((req, res) => {
    res.status(404).send('Rota não encontrada');
});

// Criar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});