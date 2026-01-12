const express = require('express');
const app = express();
const PORT = 3001;

// PROJETO FINAL: Upgrade no Sistema da Unidade Manaus

// Desafio 1: O Painel de RH (/rh/resumo)
app.get('/rh/resumo', (req, res) => {
    const resumoRH = {
        total_colaboradores: 1250,
        turno_atual: "Segundo Turno",
        setor_vago: "Nenhum"
    };
    res.status(200).json(resumoRH);
});

// Desafio 2: Check-up de Manutenção (/manutencao)
app.get('/manutencao', (req, res) => {
    const manutencao = {
        maquinas_criticas: 0,
        ultima_revisao: "2023-10-25",
        proxima_revisao: "2023-11-25"
    };
    res.status(200).json(manutencao);
});

// Desafio 3: Rota de Pânico / Emergência (/emergencia)
app.get('/emergencia', (req, res) => {
    res.status(500).json({
        alerta: "ALERTA: Sensor de incêndio não detectado."
    });
});

// Rota inexistente (404)
app.use((req, res) => {
    res.status(404).send('Rota não encontrada');
});

// Criar o servidor
app.listen(PORT, () => {
    console.log(`Servidor RH rodando em http://localhost:${PORT}`);
});
