const Habilidade = require("./habilidade.js");

class Personagem {
  nivel = 1;
  xp = 0;
  mana;
  maxMana;
  habilidades = [0, 0, 0, 0];
  bonus = 1;

  constructor(maxMana, manaHab1, manaHab2, manaHab3, manaHab4) {
    this.maxMana = maxMana;
    this.mana = maxMana;

    // Habilidade 1
    this.habilidades[0] = new Habilidade(this, manaHab1, 4);

    // Habilidade 2
    this.habilidades[1] = new Habilidade(this, manaHab2, 4);

    // Habilidade 3
    this.habilidades[2] = new Habilidade(this, manaHab3, 4);

    // Habilidade 4 - ULTIMATE com condicional
    this.habilidades[3] = new Habilidade(this, manaHab4, 3, 6);
  }

  // PUBLICAS ------------------------------------------------------------------

  getNivel() {
    return this.nivel;
  }

  adicionarXP(xp) {
    this.xp += xp;
    this.subirDeNivel();
  }

  consumirPocao() {
    const nivelPocao = 350;
    this.mana =
      this.mana + nivelPocao > this.maxMana
        ? this.maxMana
        : this.mana + nivelPocao;
  }

  melhorarHabilidade(habID) {
    const habilidade = this.habilidades[habID];
    // se nao existir a habilidade, retornar falso
    if (!habilidade) return false;
    // Executar o método da própria habilidade para melhorar a si mesma.
    return habilidade.melhorar();
  }

  usarHabilidade(habID) {
    const habilidade = this.habilidades[habID];
    // se nao existir a habilidade, retornar falso
    if (!habilidade) return false;
    // Usando a habilidade
    return habilidade.usar();
  }

  getMana() {
    return this.mana;
  }

  useMana(mana) {
    return (this.mana -= mana);
  }

  getBonus() {
    return this.bonus;
  }

  useBonus(bonus) {
    return (this.bonus -= bonus);
  }

  useXP(xp) {
    this.xp -= xp;
  }

  // PRIVADAS ------------------------------------------------------------------

  addNivel(niveis) {
    this.nivel += niveis;
    this.bonus += niveis;
  }

  getNiveisValidos() {
    const niveis = Math.floor(this.xp / 100);
    const niveisPermitidos = 25 - this.nivel;
    return niveisPermitidos > niveis ? niveis : niveisPermitidos;
  }

  subirDeNivel() {
    // Obter a quantidade de níveis que é possível ainda subir
    const niveis = this.getNiveisValidos();
    // Se nao conseguiu nenhum nivel ainda, retorna falso
    if (!niveis) return false;
    // Acrescenta os níveis ao nivel atual e adiciona os bonus para manas
    this.addNivel(niveis);
    // Remove a quantidade de XP que foi usado
    this.useXP(niveis * 100);
  }
}

module.exports = Personagem;
