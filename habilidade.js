class Habilidade {
  nivelGT = 0;
  nivel = 0;
  constructor(personagem, baseMana, maxNivel, nivelGT = 0) {
    this.personagem = personagem;
    this.baseMana = baseMana;
    this.maxNivel = maxNivel;
    this.nivelGT = nivelGT;
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

    // se possui e nao passar, retorna falso
    if (this.nivelGT > 0 && p.getNivel() < this.nivelGT) return false;

    return true;
  }

  getCustoMana() {
    return this.nivel * this.baseMana;
  }

  validarUso() {
    if (this.nivel == 0) return false;
    if (this.personagem.getMana() >= this.getCustoMana()) return true;
  }
}

module.exports = Habilidade;
