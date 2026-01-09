const http = require('http');
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // SUA LÓGICA AQUI
  if (req.url === '/status' && req.method === 'GET') {
    res.end('✅ Sistema funcionando normalmente');
  }
  else if (req.url === '/fabrica' && req.method === 'GET') {
    res.end('🏭 Polo Industrial - Manaus/AM');
  }
  else if (req.url === '/dados' && req.method === 'GET') {
    const dados = {
      empresa: 'Polo Industrial',
      unidade: 'Manaus',
      status: 'operacional',
      maquinas_ativas: 24,
      capacidade_maxima: 50
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dados));
  }
  else if (req.url === '/estoque' && req.method === 'GET') {
    const estoque = {
      telas: 150,
      placas_mae: 85,
      controles: 200,
      alerta_reposicao: true
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(estoque));
  }
  else if (req.url === '/clima' && req.method === 'GET') {
    res.end('Temperatura atual: 24°C - Ar condicionado operando.');
  }
  else if (req.url === '/producao' && req.method === 'GET') {
    const producao = {
      pecas_produzidas: Math.floor(Math.random() * 100)
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(producao));
  }
  else {
    res.statusCode = 404;
    res.end('❌ Rota não encontrada');
  }
});

server.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
