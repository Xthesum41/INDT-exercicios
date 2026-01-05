const luzes = ["ACESO", "APAGADO"];
let contador = 0;

setInterval(() => {

  let posicao = contador % luzes.length;
  console.log(`Luz do painel: ${luzes[posicao]}`);
  contador++;
}, 1000);
console.log("SISTEMA DO CARRO INICIADO!");