const cartes = [
  "IMG/frontal1.png",
  "IMG/frontal2.png",
  "IMG/frontal3.png",
  "IMG/frontal4.png",
  "IMG/frontal5.png",
  "IMG/frontal6.png",
  "IMG/frontal7.png",
  "IMG/frontal8.png",
  "IMG/frontal9.png",
  "IMG/frontal10.png",
  "IMG/frontal11.png",
  "IMG/frontal12.png",
];

class WhereDuoGame {
  constructor(div_for_game, number_cards) {
    this.container = document.getElementById(div_for_game);
    this.numberOfCards = number_cards;
    if (!this.container) {
      console.error(
        `Error: No s'ha trobat el contenidor amb ID "${div_for_game}".`,
      );
      return;
    } else if (
      this.numberOfCards !== 8 &&
      this.numberOfCards !== 10 &&
      this.numberOfCards !== 12
    ) {
      console.error(
        `Error: El nombre de cartes ha de ser de 8, 10 o 12 i has proporcionat: ${number_cards}.`,
      );
      return;
    }
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = `repeat(${this.numberOfCards / 2}, 100px)`;
    this.container.style.justifyContent = "center";
    this.container.style.gap = "15px";

    this.attempts = 0;
    this.matches = 0;
    this.drawn_Card = null;
    this.intentsText = "";
    this.encertsText = "";

    this.board = this.createBoard();
    this.startGame(this.board, this.attempts, this.matches);
  }

  startGame(board) {
    let ruta = "IMG/trasera.png";
    for (let i = 0; i < board.length; i++) {
      let carta = document.createElement("img");
      carta.setAttribute("data-card", board[i]);
      carta.src = ruta;
      this.container.appendChild(carta);

      carta.addEventListener("click", () => {
        if (carta.getAttribute("src") === ruta) {
          if (this.drawn_Card === null) {
            this.mostrarCarta(carta);
            this.drawn_Card = carta;
          } else {
            this.mostrarCarta(carta);
            if (
              this.drawn_Card.getAttribute("data-card") !==
              carta.getAttribute("data-card")
            ) {
              setTimeout(() => {
                this.amagarCartes(carta, ruta);
              }, 1000);
              this.attempts++;
              this.intentsText.textContent = `Intents: ${this.attempts}`;
            } else {
              this.drawn_Card = null;
              this.matches++;
              this.encertsText.textContent = `Encerts: ${this.matches}`;

              if (this.matches === this.numberOfCards) {
                let msg = document.createElement("p");
                msg.textContent = "Felicitats, has trobat totes les parelles";
                msg.classList.add("win-message");
                this.container.appendChild(msg);
              }
            }
          }
        }
      });
    }
  }

  amagarCartes(carta, ruta) {
    carta.setAttribute("src", ruta);
    carta.classList.remove("mostrar");
    carta.classList.add("amagar");
    this.drawn_Card.setAttribute("src", ruta);
    carta.classList.remove("mostrar");
    this.drawn_Card.classList.add("amagar");
    this.drawn_Card = null;
  }

  mostrarCarta(carta) {
    carta.setAttribute("src", carta.getAttribute("data-card"));
    carta.classList.remove("amagar");
    carta.classList.add("mostrar");
  }

  createBoard() {
    this.intentsText = document.createElement("p");
    this.intentsText.textContent = `Intents: ${this.attempts}`;
    this.intentsText.classList.add("stats-intents");
    this.container.appendChild(this.intentsText);

    this.encertsText = document.createElement("p");
    this.encertsText.textContent = `Encerts: ${this.matches}`;
    this.encertsText.classList.add("stats-encerts");
    this.container.appendChild(this.encertsText);

    const cartesSelecionades = cartes.slice(0, this.numberOfCards);
    let parelles = [];
    for (let i = 0; i < cartesSelecionades.length; i++) {
      parelles.push(cartesSelecionades[i]);
      parelles.push(cartesSelecionades[i]);
    }
    return this.barallarCartes(parelles);
  }
  barallarCartes(cartes) {
    for (let i = 0; i < cartes.length; i++) {
      let j = Math.floor(Math.random() * cartes.length);
      let temp = cartes[i];
      cartes[i] = cartes[j];
      cartes[j] = temp;
    }
    // for (let i = 0; i < cartes.length-1; i++) {
    //   while (cartes[i] === cartes[i + 1]) {
    //     let j = Math.floor(Math.random() * cartes.length);
    //     if (){}
    //     let temp = cartes[i];
    //     cartes[i] = cartes[j];
    //     cartes[j] = temp;
    //   }
    // }
    return cartes;
  }
}
