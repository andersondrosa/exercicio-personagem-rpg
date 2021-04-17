public class Personagem {

  int nivel = 1;
  int xp = 0;
  int mana;
  int maxMana;
  Habilidade[] habilidades = new Habilidade[4];
  int bonus = 1;

  public Personagem(int maxMana, int hab1, int hab2, int hab3, int hab4) {
    this.mana = maxMana;
    this.maxMana = maxMana;
    this.habilidades[0] = new Habilidade(this, hab1, 4, 0);
    this.habilidades[1] = new Habilidade(this, hab2, 4, 0);
    this.habilidades[2] = new Habilidade(this, hab3, 4, 0);
    this.habilidades[3] = new Habilidade(this, hab4, 3, 6);
  }

  public int getNivel() {
    return this.nivel;
  }

  public void adicionarXP(int xp) {
    this.xp += xp;
    this.subirDeNivel();
  }

  public void consumirPocao() {
    int nivelPocao = 350;
    this.mana =
      (this.mana + nivelPocao) > this.maxMana
        ? this.maxMana
        : this.mana + nivelPocao;
  }

  public boolean melhorarHabilidade(int habID) {
    if (this.habilidades[habID] == null) {
      return false;
    }
    return this.habilidades[habID].melhorar();
  }

  public boolean usarHabilidade(int habID) {
    if (this.habilidades[habID] == null) {
      return false;
    }
    return this.habilidades[habID].usar();
  }

  public int getMana() {
    return this.mana;
  }

  public void useMana(int mana) {
    this.mana -= mana;
  }

  public int getBonus() {
    return this.bonus;
  }

  public void useBonus(int bonus) {
    this.bonus -= bonus;
  }

  public void useXP(int xp) {
    this.xp -= xp;
  }

  private void addNivel(int niveis) {
    this.nivel += niveis;
    this.bonus += niveis;
  }

  private int getNiveisValidos() {
    int niveis = (int) Math.floor(this.xp / 100);
    int niveisPermitidos = 25 - this.nivel;
    return niveisPermitidos > niveis ? niveis : niveisPermitidos;
  }

  private void subirDeNivel() {
    int niveis = this.getNiveisValidos();

    if (niveis <= 0) return;

    this.addNivel(niveis);
    this.useXP(niveis * 100);
  }

  static class Habilidade {

    int nivelGT = 0;
    int nivel = 0;
    int baseMana;
    int maxNivel;
    Personagem personagem;

    private Habilidade(
      Personagem personagem,
      int baseMana,
      int maxNivel,
      int nivelGT
    ) {
      this.personagem = personagem;
      this.baseMana = baseMana;
      this.maxNivel = maxNivel;
      this.nivelGT = nivelGT;
    }

    public boolean melhorar() {
      if (!this.validarMelhoria()) return false;
      this.nivel++;
      this.personagem.useBonus(1);
      return true;
    }

    public boolean usar() {
      if (!this.validarUso()) {
        return false;
      }
      this.personagem.useMana(this.getCustoMana());
      return true;
    }

    public boolean validarMelhoria() {
      Personagem p = this.personagem;

      // Se o personagem nao pode melhorar habilidades, retorna falso
      if (p.getBonus() == 0) return false;

      if (this.nivel == this.maxNivel) return false;

      // se possui e nao passar, retorna falso
      if (this.nivelGT > 0 && p.getNivel() < this.nivelGT) return false;

      return true;
    }

    public int getCustoMana() {
      return this.nivel * this.baseMana;
    }

    public boolean validarUso() {
      if (this.nivel == 0) {
        return false;
      }

      if (this.personagem.getMana() >= this.getCustoMana()) {
        return true;
      }
      return false;
    }
  }
}

public class Main {

  private static int rodarTeste(String titulo, boolean resultado) {
    System.out.println("- " + (resultado ? "OK" : "X ") + "\t" + titulo);
    return resultado ? 1 : 0;
  }

  private static void mostrarResultado(int testesCorretos, int totalTestes) {
    System.out.println(
      "\n> Testes corretos: " +
      testesCorretos +
      "/" +
      totalTestes +
      " (" +
      (100 * testesCorretos / totalTestes) +
      "%)"
    );
    if (testesCorretos == totalTestes) {
      System.out.println("> Tudo certo!!!");
    } else {
      System.out.println(">  Ainda falta um pouquinho, mas vocÃª consegue!");
    }
  }

  public static void main(String[] args) {
    int totalTestes = 24;
    int testesCorretos = 0;

    System.out.println("### Personagem\n");

    Personagem p = new Personagem(500, 70, 100, 10, 200);
    testesCorretos += rodarTeste("Nivel inicia em 1", p.getNivel() == 1);
    testesCorretos +=
      rodarTeste("Nivel 1 pode melhorar habilidade", p.melhorarHabilidade(0));
    testesCorretos +=
      rodarTeste(
        "Nivel 1 pode melhorar apenas uma habilidade",
        !p.melhorarHabilidade(0)
      );
    p.adicionarXP(100);
    testesCorretos +=
      rodarTeste("Personagem pode subir de nível", p.getNivel() == 2);
    testesCorretos +=
      rodarTeste(
        "Personagem pode melhorar outra habilidade",
        p.melhorarHabilidade(1)
      );
    p.adicionarXP(50);
    p.adicionarXP(50);
    testesCorretos +=
      rodarTeste(
        "Personagem sobe de nivel mesmo recebendo experiCB*ncia aos poucos",
        p.getNivel() == 3
      );
    testesCorretos +=
      rodarTeste(
        "Personagem nCB#o pode melhorar ultimate antes do nivel 6",
        !p.melhorarHabilidade(3)
      );
    p.adicionarXP(300);
    testesCorretos +=
      rodarTeste("Personagem pode chegar no nivel 6", p.getNivel() == 6);
    testesCorretos +=
      rodarTeste(
        "Personagem pode melhorar ultimate no nivel 6",
        p.melhorarHabilidade(3)
      );
    testesCorretos +=
      rodarTeste(
        "Personagem nCB#o pode usar habilidade com nCB-vel de melhoria 0",
        !p.usarHabilidade(2)
      );

    p.melhorarHabilidade(2);
    testesCorretos +=
      rodarTeste(
        "Personagem pode usar habilidade com nCBf-vel de melhoria >0",
        p.usarHabilidade(2)
      );
    // atCB) aqui: personagem nivel 6 com habilidades nivel: 1 1 1 1; mana: 490/500
    p.usarHabilidade(3);
    p.usarHabilidade(3);
    // mana 90/500
    testesCorretos +=
      rodarTeste(
        "Personagem nCB#o pode usar habilidade se nCB#o tiver mana suficiente",
        !p.usarHabilidade(3)
      );

    p.consumirPocao(); // 440/500
    testesCorretos +=
      rodarTeste(
        "Personagem pode recuperar mana com poCB'CB#o",
        p.usarHabilidade(3)
      );
    p.consumirPocao(); // mana 500/500
    p.consumirPocao(); // tomar outras vezes nao deveria deixar passar dos 500
    p.consumirPocao();
    p.consumirPocao();
    // mana 500/500
    p.usarHabilidade(3);
    p.usarHabilidade(3);
    p.usarHabilidade(1);
    // mana 0/500
    testesCorretos +=
      rodarTeste(
        "PoCB'CB#o nCB#o recupera alCB)m da mana mCB!xima",
        !p.usarHabilidade(2)
      );

    // Niveis mCB!ximos
    p.adicionarXP(2500);
    testesCorretos +=
      rodarTeste(
        "NCB#o CB) possCB-vel passar do nCB-vel 25",
        p.getNivel() == 25
      );
    // habilidades ainda 1 1 1 1
    p.melhorarHabilidade(0);
    p.melhorarHabilidade(0);
    testesCorretos +=
      rodarTeste("Habilidade 0 chega ao nCB-vel 4", p.melhorarHabilidade(0));
    testesCorretos +=
      rodarTeste(
        "Habilidade 0 nCB#o passa do nCB-vel 4",
        !p.melhorarHabilidade(0)
      );
    p.melhorarHabilidade(1);
    p.melhorarHabilidade(1);
    testesCorretos +=
      rodarTeste("Habilidade 1 chega ao nCB-vel 4", p.melhorarHabilidade(1));
    testesCorretos +=
      rodarTeste(
        "Habilidade 1 nCB#o passa do nCB-vel 4",
        !p.melhorarHabilidade(1)
      );
    p.melhorarHabilidade(2);
    p.melhorarHabilidade(2);
    testesCorretos +=
      rodarTeste("Habilidade 2 chega ao nCB-vel 4", p.melhorarHabilidade(2));
    testesCorretos +=
      rodarTeste(
        "Habilidade 2 nCB#o passa do nCB-vel 4",
        !p.melhorarHabilidade(2)
      );
    p.melhorarHabilidade(3);
    testesCorretos +=
      rodarTeste("Habilidade 3 chega ao nCB-vel 3", p.melhorarHabilidade(3));
    testesCorretos +=
      rodarTeste(
        "Habilidade 3 nCB#o passa do nCB-vel 3",
        !p.melhorarHabilidade(3)
      );

    p.consumirPocao();
    p.consumirPocao();
    // mesmo os 500 de mana nCB#o sCB#o suficientes para usar a ult no nivel 3 (200*3 = 600)
    testesCorretos +=
      rodarTeste(
        "Consumo de mana CB) proporcional ao nCB-vel da habilidade",
        !p.usarHabilidade(3)
      );

    mostrarResultado(testesCorretos, totalTestes);

    System.out.println("Hello World");
  }
}
