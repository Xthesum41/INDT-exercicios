const funcionarios = ["Ana", "Beto", "Caio", "Duda"];

const recebendoPedidos = setInterval(() => {
  console.log("[SISTEMA]: Recebendo pedido online...");
}, 300);

let passo = 0;
const totalPassos = 15;

function girarMonitor() {
  passo++;

  const indice = (passo - 1) % funcionarios.length;
  const nomeAtual = funcionarios[indice];

  if (passo < totalPassos) {
    console.log(`Monitor: Próximo pode ser ${nomeAtual}...`);

    const delay = passo * 40;

    setTimeout(girarMonitor, delay);
  } else {
    clearTimeout(recebendoPedidos)
    console.log(`O PEDIDO VAI PARA: ${nomeAtual}!`);
  }
}

girarMonitor();
