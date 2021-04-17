const Personagem = require("./personagem.js");

function rodarTeste(text, value) {
  if (value) {
    console.log("\x1b[32m", text);
    console.log("\x1b[0m");
    return 1;
  }
  console.log("\x1b[31m", text);
  console.log("\x1b[0m");
  return 0;
}

function testarPersonagem() {
  var totalTestes = 24;
  var testesCorretos = 0;

  console.log("### Personagem\n");

  const p = new Personagem(500, 70, 100, 10, 200);

  testesCorretos += rodarTeste("Nivel inicia em 1", p.getNivel() == 1);

  testesCorretos += rodarTeste(
    "Nivel 1 pode melhorar habilidade",
    p.melhorarHabilidade(0)
  );

  testesCorretos += rodarTeste(
    "Nivel 1 pode melhorar apenas uma habilidade",
    !p.melhorarHabilidade(0)
  );
  p.adicionarXP(100);

  testesCorretos += rodarTeste(
    "Personagem pode subir de nível",
    p.getNivel() == 2
  );

  testesCorretos += rodarTeste(
    "Personagem pode melhorar outra habilidade",
    p.melhorarHabilidade(1)
  );
  p.adicionarXP(50);
  p.adicionarXP(50);

  testesCorretos += rodarTeste(
    "Personagem sobe de nivel mesmo recebendo experiência aos poucos",
    p.getNivel() == 3
  );

  testesCorretos += rodarTeste(
    "Personagem não pode melhorar ultimate antes do nivel 6",
    !p.melhorarHabilidade(3)
  );
  p.adicionarXP(300);

  testesCorretos += rodarTeste(
    "Personagem pode chegar no nivel 6",
    p.getNivel() == 6
  );

  testesCorretos += rodarTeste(
    "Personagem pode melhorar ultimate no nivel 6",
    p.melhorarHabilidade(3)
  );

  testesCorretos += rodarTeste(
    "Personagem não pode usar habilidade com nível de melhoria 0",
    !p.usarHabilidade(2)
  );
  p.melhorarHabilidade(2);

  testesCorretos += rodarTeste(
    "Personagem pode usar habilidade com nível de melhoria >0",
    p.usarHabilidade(2)
  );
  // até aqui: personagem nivel 6 com habilidades nivel: 1 1 1 1; mana: 490/500
  p.usarHabilidade(3);
  p.usarHabilidade(3);
  // mana 90/500

  testesCorretos += rodarTeste(
    "Personagem não pode usar habilidade se não tiver mana suficiente",
    !p.usarHabilidade(3)
  );

  // console.log(!p.usarHabilidade(3));
  // // poção
  // p.consumirPocao(); // 440/500

  // testesCorretos += rodarTeste(
  //   "Personagem pode recuperar mana com poção",
  //   p.usarHabilidade(3)
  // );
  // p.consumirPocao(); // mana 500/500
  // p.consumirPocao(); // tomar outras vezes nao deveria deixar passar dos 500
  // p.consumirPocao();
  // p.consumirPocao();
  // // mana 500/500
  // p.usarHabilidade(3);
  // p.usarHabilidade(3);
  // p.usarHabilidade(1);
  // // mana 0/500

  // testesCorretos += rodarTeste(
  //   "poção não recupera além da mana máxima",
  //   !p.usarHabilidade(2)
  // );

  // // Niveis mÃ¡ximos
  // p.adicionarXP(2500);

  // testesCorretos += rodarTeste(
  //   "não é possível passar do nível 25",
  //   p.getNivel() == 25
  // );
  // // habilidades ainda 1 1 1 1
  // p.melhorarHabilidade(0);
  // p.melhorarHabilidade(0);

  // testesCorretos += rodarTeste(
  //   "Habilidade 0 chega ao nível 4",
  //   p.melhorarHabilidade(0)
  // );

  // testesCorretos += rodarTeste(
  //   "Habilidade 0 não passa do nível 4",
  //   !p.melhorarHabilidade(0)
  // );
  // p.melhorarHabilidade(1);
  // p.melhorarHabilidade(1);

  // testesCorretos += rodarTeste(
  //   "Habilidade 1 chega ao nível 4",
  //   p.melhorarHabilidade(1)
  // );

  // testesCorretos += rodarTeste(
  //   "Habilidade 1 não passa do nível 4",
  //   !p.melhorarHabilidade(1)
  // );
  // p.melhorarHabilidade(2);
  // p.melhorarHabilidade(2);

  // testesCorretos += rodarTeste(
  //   "Habilidade 2 chega ao nível 4",
  //   p.melhorarHabilidade(2)
  // );

  // testesCorretos += rodarTeste(
  //   "Habilidade 2 não passa do nível 4",
  //   !p.melhorarHabilidade(2)
  // );
  // p.melhorarHabilidade(3);

  // testesCorretos += rodarTeste(
  //   "Habilidade 3 chega ao nível 3",
  //   p.melhorarHabilidade(3)
  // );

  // testesCorretos += rodarTeste(
  //   "Habilidade 3 não passa do nível 3",
  //   !p.melhorarHabilidade(3)
  // );

  // p.consumirPocao();
  // p.consumirPocao();

  // // mesmo os 500 de mana não são suficientes
  // // para usar a ult no nivel 3 (200 * 3 = 600)

  // testesCorretos += rodarTeste(
  //   "Consumo de mana é proporcional ao nível da habilidade",
  //   !p.usarHabilidade(3)
  // );

  // console.log(`testesCorretos ${testesCorretos}`, `totalTestes ${totalTestes}`);
}

testarPersonagem();
