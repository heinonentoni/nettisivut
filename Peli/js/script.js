// Kartta
const map = [];
map[0] = "Vanha torni";
map[1] = "Syvä kaivo";
map[2] = "Aurinkoinen metsä";
map[3] = "Lohikäärme";
map[4] = "Kapea metsäpolku";
map[5] = "Vanha portti";
map[6] = "Joen ranta";
map[7] = "Vanha puupenkki";
map[8] = "Kaukainen mökki";
// Aloitussijainti
let mapLocation = 4;

const images = [];
images[0] = "torni.jpg";
images[1] = "kaivo.jpg";
images[2] = "aukio.jpg";
images[3] = "dragon.jpg";
images[4] = "polku.jpg";
images[5] = "portti.jpg";
images[6] = "joki2.jpg";
images[7] = "penkki.jpg";
images[8] = "mokki.jpg";

const blockMessage = [];

blockMessage[0] = "<br>Liian vaarallinen reitti.";
blockMessage[1] = "<br>Salaperäinen voima estää etenemisen.";
blockMessage[2] = "<br>Et voi kulkea tuohon suuntaa.";
blockMessage[3] = "<br>Et pääse ohittamaan lohikäärmettä tuota kautta.";
blockMessage[4] = "";
blockMessage[5] = "<br>Portti sulkeutui yllättäen.";
blockMessage[6] = "<br>Joki on liian syvä ylitettäväksi.";
blockMessage[7] = "<br>Metsä on liian tiheä läpäistäväksi.";
blockMessage[8] = "<br>Liian pelottava suunta.";

let playersInput = "";
let gameMessage = "";
// Pelin komennot
const actionsForPlayer = [
  "ylös",
  "oikea",
  "alas",
  "vasen",
  "poimi",
  "käytä",
  "pudota",
];
let action = "";

// Pelissä olevat esineet
let items = ["huilu", "kivi", "miekka", "hammas"];
let itemLocations = [1, 6, 8, 3];
let backPack = [];
const knownItems = ["huilu", "kivi", "miekka", "hammas"];
let item = "";

// Käyttöliittymäelementit
const img = document.querySelector("#img");
const input = document.querySelector("#input");
const button = document.querySelector("button");
button.addEventListener("click", clickHandler, false);
input.addEventListener(
  "keyup",
  function (event) {
    if (event.key === "Enter") {
      clickHandler();
    }
  },
  false
);
const output = document.querySelector("#output");
const info = document.querySelector("#info");
button.addEventListener("click", clickHandler, false);
info.addEventListener("click", showInfoAlert, false);
button1.style.cursor = "pointer";
button1.addEventListener("click", startAgain, false);

render();

function render() {
  img.src = "images/" + images[mapLocation];
  output.innerHTML = "SIJAINTISI: " + map[mapLocation] + "<br>";
  if (backPack.length > 0) {
    output.innerHTML += "Mukanasi on: " + backPack.join(", ");
  }
  for (let i = 0; i < items.length; i++) {
    if (mapLocation === itemLocations[i]) {
      if (mapLocation === 6) {
        output.innerHTML += "<br>" + "Näet esineen: " + items[i];
      }
    }
    input.value = "";
  }
  output.innerHTML += "<em>" + gameMessage + "</em>";
  const minimapCells = document.querySelectorAll("#mapTable td");
  minimapCells.forEach((cell) => {
    cell.classList.remove("active");
  });

  // Lisää aktiivinen luokka nykyiselle sijainnille
  minimapCells[mapLocation].classList.add("active");

  // Muuta minimap-tekstin väriä
  minimapCells.forEach((cell, index) => {
    if (index === mapLocation) {
      cell.style.color = "gold";
    } else {
      cell.style.color = "white";
    }
  });
}

input.value = "";

function clickHandler() {
  playGame();
}

function showInfoAlert() {
  const message =
    "Ongelma tilanteissa ota yhteyttä: toni.p.heinonen@student.lab.fi";
  alert(message);
}

function startAgain() {
  location.reload();
}

function playGame() {
  console.log("Nappia painettu");
  // Muuttaa pieniksi kirjaimiksi
  playersInput = input.value.toLowerCase();

  gameMessage = "";
  action = "";

  // Tarkista pelaajan syöte ja vertaa hyväksyttäviin.
  for (let i = 0; i < actionsForPlayer.length; i++) {
    if (playersInput.indexOf(actionsForPlayer[i]) !== -1) {
      action = actionsForPlayer[i];
      console.log("Pelaajan komento oli: " + action);
      break;
    }
  }

  for (let i = 0; i < knownItems.length; i++) {
    if (playersInput.indexOf(knownItems[i]) !== -1) {
      item = knownItems[i];
    }
  }

  switch (action) {
    case "ylös":
      if (mapLocation >= 3) {
        mapLocation -= 3;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "oikea":
      if (mapLocation % 3 !== 2) {
        mapLocation += 1;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "alas":
      if (mapLocation <= 5) {
        mapLocation += 3;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "vasen":
      if (mapLocation % 3 !== 0) {
        mapLocation -= 1;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "poimi":
      takeItem();
      break;

    case "käytä":
      useItem();
      break;

    case "pudota":
      dropItem();
      break;

    default:
      gameMessage = "<br>Tuntematon toiminto";
  }

  input.value = "";
  render();
}

function takeItem() {
  console.log("Komento: poimi");
  let itemIndexNumber = items.indexOf(item);
  if (
    itemIndexNumber !== -1 &&
    itemLocations[itemIndexNumber] === mapLocation
  ) {
    gameMessage = "<br>Poimit esineen: " + item + ".";
    backPack.push(item);
    items.splice(itemIndexNumber, 1);
    itemLocations.splice(itemIndexNumber, 1);
    console.log("Kartalla: " + items);
    console.log("Repussa: " + backPack);
    if (mapLocation === 3) {
      images[3] = "dragon3.jpg";
    }
    if (mapLocation === 1) {
      images[1] = "kaivo.jpg";
    }
    if (mapLocation === 6) {
      images[6] = "joki.jpg";
    }
    if (mapLocation === 8) {
      images[8] = "mokki3.jpg";
    }
    console.log("Kartalla: " + items);
    console.log("Repussa: " + backPack);
  } else {
    gameMessage = "<br>Et voi tehdä tuota toimintoa.";
  }
  input.value = "";
}

function useItem() {
  console.log("Komento: Käytä");
  let backPackIndexNumber = backPack.indexOf(item);
  if (backPackIndexNumber === -1) {
    gameMessage = "<br>Sinulla ei ole esinettä " + item + " mukana.";
  }
  if (backPack.length === 0) {
    gameMessage = "Sinulla ei ole mitään mukana.";
  }

  if (backPackIndexNumber !== -1) {
    switch (item) {
      case "huilu":
        if (mapLocation === 8) {
          gameMessage =
            "<br>Onnistuit ilahduttamaan minua!<br>Voit poimia tämän miekan jotta voit <br>tehdä tehtäväsi loppuun.";
          images[8] = "mokki2.jpg";
        } else {
          gameMessage = "<br>♫♪♬♩Soi kauniisti♫♪♬♩";
        }
        break;

      case "miekka":
        if (mapLocation === 3) {
          gameMessage =
            "<br>Työnnät miekan kitaan! <br>Tapoit lohikäärmeen.<br>Irroita lohikäärmeen hammas.";
          images[3] = "dragon2.jpg";
        } else {
          gameMessage = "<br>Tällä tappaisi lohikäärmeen.";
        }
        break;

      case "kivi":
        if (mapLocation === 1) {
          gameMessage = "Pudotit kiven kaivoon.<br>Näet huilun.";
          images[1] = "kaivo2.jpg";
          backPack.splice(backPackIndexNumber, 1);
        } else {
          gameMessage = "<br>Pitäisikö tämä heittää kaivoon?";
        }
        break;

      case "hammas":
        if (mapLocation === 2) {
          gameMessage = "<br>Voitit pelin!";
          images[2] = "aukio2.jpg";
          backPack.splice(backPackIndexNumber, 3);
        } else {
          gameMessage = "<br>Tämä ei ole oikea paikka.";
        }
        break;
    }
  }
  input.value = "";
}
function dropItem() {
  console.log("Komento: Pudota");
  if (backPack.length !== 0) {
    let backPackIndexNumber = backPack.indexOf(item);
    if (backPackIndexNumber !== -1) {
      gameMessage = "<br>Pudotit esineen: " + item + ".";
      items.push(backPack[backPackIndexNumber]);
      itemLocations.push(mapLocation);
      backPack.splice(backPackIndexNumber, 1);
    } else {
      gameMessage = "<br>Et voi jättää esinettä.";
    }
  } else {
    gameMessage = "Sinulla ei ole mitään repussa.";
  }
  if (mapLocation === 1) {
    images[1] = "kaivo2.jpg";
  }
  if (mapLocation === 6) {
    images[6] = "joki2.jpg";
  }
  if (mapLocation === 8) {
    images[8] = "mokki2.jpg";
  }

  input.value = "";
}
