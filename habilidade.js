class Habilidade {
  regras = {};
  constructor(personagem, baseMana, maxNivel, regras = {}) {
    this.personagem = personagem;
    this.baseMana = baseMana;
    this.nivel = 0;
    this.maxNivel = maxNivel;
    this.regras = regras;
  }

  // PUBLICAS ------------------------------------------------------------------

  melhorar() {
    if (!this.validarMelhoria()) return false;
    this.nivel++;
    this.personagem.useBonus(1);
    return true;
  }

  usar() {
    if (!this.validarUso()) return false;
    this.personagem.useMana(this.getCustoMana());
    return true;
  }

  // PRIVADAS ------------------------------------------------------------------

  validarMelhoria() {
    const p = this.personagem;

    // Se o personagem nao pode melhorar habilidades, retorna falso
    if (p.getBonus() == 0) return false;

    if (this.nivel == this.maxNivel) return false;

    // Se a habilidade nao possui regras, retorna true
    if (!this.regras) return true;

    // se possui e nao passar, retorna falso
    if (this.regras.nivelGT && p.getNivel() < this.regras.nivelGT) return false;

    return true;
  }

  getCustoMana() {
    return this.nivel * this.baseMana;
  }

  validarUso() {
    if (!(this.nivel > 0)) return false;
    if (this.personagem.getMana() >= this.getCustoMana()) return true;
  }
}

module.exports = Habilidade;
