// 1. CLASSE BASE: Piloto
class Piloto {
    #nome;
    #numero;
    //contructor da vida a um obejto com seus atributos
    constructor(nome, numero) {
        this.#nome = nome;
        this.#numero = numero;
    }
    getNome() { return this.#nome; }
    getNumero() { return this.#numero; }
}

// 2. CLASSE FILHA: PilotoF1
class PilotoF1 extends Piloto {
    #totalVoltas = 0;
    constructor(nome, numero) {
        super(nome, numero);
    }
    
    correr(voltas) {
        this.#totalVoltas += voltas;
        return `O piloto ${this.getNome()} completou ${voltas} voltas.`;
    }
    
    getVoltas() { return this.#totalVoltas; }
}

// 3. CLASSE: Equipe (Ações diretas)
class Equipe {
    #nomeEquipe;
    #orcamento;
    constructor(nome, orcamento) {
        this.#nomeEquipe = nome;
        this.#orcamento = orcamento;
    }

    // Gasta o dinheiro diretamente, sem perguntar se tem saldo
    realizarPitStop(custo) {
        this.#orcamento -= custo;
        return `Pit stop da ${this.#nomeEquipe} realizado. Novo orçamento: R$${this.#orcamento}`;
    }
}

// 4. CLASSE: Circuito
class Circuito {
    #nomePista;
    constructor(nome) {
        this.#nomePista = nome;
    }

    exibirStatus(piloto) {
        return `Status em ${this.#nomePista}: Piloto ${piloto.getNome()} está na volta ${piloto.getVoltas()}.`;
    }//cifrão colocar variáveis dentro de um texto de forma fáci

}

// --- EXECUTANDO O FLUXO ---

const Mclaren = new Equipe('Mclaren', 240000);//Orçamento atual equipe
const Oscar = new PilotoF1('Oscar Piastri', 81);
const Belgica = new Circuito('Bélgica');

// O código apenas executa as ordens:
console.log(Oscar.correr(39));           // Adiciona voltas
console.log(Mclaren.realizarPitStop(500)); // Subtrai do orçamento
console.log(Belgica.exibirStatus(Oscar)); // Mostra a posição atual