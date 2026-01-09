const http = require('http');

// Dados simulados em memória
const entregas = [
  { id: 1, motorista: 'Carlos', status: 'em_rota', veiculo: 'Caminhão 01' },
  { id: 2, motorista: 'Ana', status: 'entregue', veiculo: 'Van 03' },
  { id: 3, motorista: 'João', status: 'pendente', veiculo: 'Caminhão 02' },
  { id: 4, motorista: 'Carlos', status: 'em_rota', veiculo: 'Van 01' }
];

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Rota: Listar todas as entregas
  if (req.url === '/entregas' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entregas));
  }
  
  // Rota: Entregas ativas (em rota)
  else if (req.url === '/entregas/ativas' && req.method === 'GET') {
    const entregasAtivas = entregas.filter(
      entrega => entrega.status === 'em_rota'
    );
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entregasAtivas));
  }
  
  // Rota: Resumo das entregas (apenas id e status)
  else if (req.url === '/entregas/resumo' && req.method === 'GET') {
    const resumo = entregas.map(entrega => ({
      id: entrega.id,
      status: entrega.status
    }));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resumo));
  }
  
  // Rota: Lista de motoristas (sem duplicados)
  else if (req.url === '/motoristas' && req.method === 'GET') {
    const motoristas = entregas
      .map(entrega => entrega.motorista)
      .filter((motorista, index, array) => {
        return array.indexOf(motorista) === index;
      });
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(motoristas));
  }
  
  // Rota: Relatório geral
  else if (req.url === '/relatorio' && req.method === 'GET') {
    const total = entregas.length;
    const emRota = entregas.filter(e => e.status === 'em_rota').length;
    const entregues = entregas.filter(e => e.status === 'entregue').length;
    
    const relatorio = {
      total,
      emRota,
      entregues
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(relatorio));
  }
  
  // DESAFIO 1: Rota /pendentes
  else if (req.url === '/pendentes' && req.method === 'GET') {
    const pendentes = entregas.filter(e => e.status === 'pendente');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(pendentes));
  }
  
  // DESAFIO 2: Rota /motoristas?nome=NomeMotorista
  else if (req.url.startsWith('/motoristas?') && req.method === 'GET') {
    const queryString = req.url.split('?')[1];
    const params = new URLSearchParams(queryString);
    const nomeMotorista = params.get('nome');
    
    const entregasMotorista = entregas.filter(
      e => e.motorista === nomeMotorista
    );
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entregasMotorista));
  }
  
  // DESAFIO 3: Relatório detalhado por motorista
  else if (req.url === '/relatorio/motoristas' && req.method === 'GET') {
    const contagemPorMotorista = {};
    
    // Contar entregas por motorista
    entregas.forEach(entrega => {
      if (contagemPorMotorista[entrega.motorista]) {
        contagemPorMotorista[entrega.motorista]++;
      } else {
        contagemPorMotorista[entrega.motorista] = 1;
      }
    });
    
    // Encontrar motorista com mais entregas
    let motoristaMaisEntregas = '';
    let maxEntregas = 0;
    
    for (const motorista in contagemPorMotorista) {
      if (contagemPorMotorista[motorista] > maxEntregas) {
        maxEntregas = contagemPorMotorista[motorista];
        motoristaMaisEntregas = motorista;
      }
    }
    
    const relatorioMotoristas = {
      totalPorMotorista: contagemPorMotorista,
      motoristaMaisEntregas: motoristaMaisEntregas,
      quantidadeMaxima: maxEntregas
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(relatorioMotoristas));
  }
  
  // Rota não encontrada
  else {
    res.statusCode = 404;
    res.end('❌ Rota não encontrada');
  }
});

server.listen(3000, () => {
  console.log('🚀 Servidor de Monitoramento Logístico rodando em http://localhost:3000');
  console.log('\nRotas disponíveis:');
  console.log('  GET /entregas');
  console.log('  GET /entregas/ativas');
  console.log('  GET /entregas/resumo');
  console.log('  GET /motoristas');
  console.log('  GET /relatorio');
  console.log('  GET /pendentes');
  console.log('  GET /motoristas?nome=Carlos');
  console.log('  GET /relatorio/motoristas');
});
