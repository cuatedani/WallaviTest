const readline = require("readline");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function MasterMind() {
  let GameType = 0;
  let valT = false;
  let CodeA = [];
  let CodeB = [];
  let UsedCodes = [];
  let codePos = {};
  let CountCol = 0;
  let CountCorrect = 0;
  let Tries = 0;
  const valid = ["rojo", "verde", "azul", "amarillo", "naranja", "morado"];

  const SelType = async () => {
    valT = false;
    while (!valT) {
      const t = parseInt(await askQuestion("Selecciona una Opción: "));
      if (t === 1 || t === 2) {
        valT = true;
        GameType = t;
      } else {
        console.log(`¡Por favor ingrese una opción válida!`);
      }
    }
  };

  const TypeCode = async () => {
    let validCode = false;
    let usedColors = [];
    while (!validCode) {
      const c = await askQuestion(
        "Ingresa el código (colores separados por espacio, sin repetir colores): "
      );
      CodeA = c.split(" ");
      if (CodeA.length === 4) {
        for (let color of CodeA) {
          if (!valid.includes(color) || usedColors.includes(color)) {
            console.log(`¡Código no válido o con colores repetidos!`);
            validCode = false;
            break;
          }
          usedColors.push(color);
        }
        if (UsedCodes.includes(CodeA)) {
          console.log(`¡Código ya ingresado!`);
          validCode = false;
        } else {
          validCode = true;
          UsedCodes.push(CodeA);
        }
      } else {
        console.log(`¡Código no válido! Debes ingresar 4 colores.`);
      }
    }
  };

  const GenSecretCode = () => {
    let availableColors = [...valid];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const color = availableColors[randomIndex];
      availableColors.splice(randomIndex, 1);
      codePos[i] = color;
      CodeB.push(color);
    }
  };

  const GuessPlayer = async () => {
    CountCorrect = 0;
    CountCol = 0;

    // Comprobar cuantas posiciones estan correctas
    for (let i = 0; i < CodeA.length; i++) {
      if (CodeA[i] === codePos[i]) {
        CountCorrect++;
      }
    }

    // Comprobar cuantos colores estan correctos
    for (let i = 0; i < CodeA.length; i++) {
      if (CodeB.includes(CodeA[i])) {
        CountCol++;
      }
    }

    console.log("Colores Correctos: ", CountCol);
    console.log("Posición Correcta: ", CountCorrect);
  };

  function Combinations(colors) {
    const comb = [];

    function permute(arr, m = []) {
      if (m.length === 4) {
        comb.push(m);
        return;
      }

      for (let i = 0; i < arr.length; i++) {
        let current = arr.slice();
        let next = current.splice(i, 1);
        permute(current, m.concat(next));
      }
    }

    permute(colors);
    return comb;
  }

  const GuessPC = async () => {
    let allCombinations = Combinations(valid);
    let posComb = [...allCombinations];
    let CodePCGuess = [];
    let guessedColors = [];
    let phase = 1; // 1 encontrar colores, 2 encontrar posicion
    let usedColors = [];
    let ColorsIndex = [];

    while (CountCorrect !== 4) {
      // Seleccionar aleatoriamente una combinación de las posibles combinaciones
      let randomIndex = Math.floor(Math.random() * posComb.length);
      CodePCGuess = posComb[randomIndex];
      console.log(`Intento de la PC: ${CodePCGuess.join(", ")}`);

      CountCorrect = 0;
      CountCol = 0;
      usedColors = [];

      // Comprobar cuantas posiciones estan correctas
      for (let i = 0; i < CodeA.length; i++) {
        if (CodeA[i] === CodePCGuess[i]) {
          CountCorrect++;
          guessedColors[i] = CodeA[i];
          ColorsIndex.push([i, CodeA[i]]);
        }
      }

      // Comprobar cuantos colores estan correctos
      for (let i = 0; i < CodeA.length; i++) {
        if (CodeA.includes(CodePCGuess[i])) {
          CountCol++;
          usedColors.push(CodePCGuess[i]);
        }
      }

      // Fase 1: Identificar colores correctos
      if (CountCol !== 4) {
        posComb = posComb.filter((comb) => {
          return usedColors.every((color) => comb.includes(color));
        });
      } else {
        posComb = posComb.filter((comb) => {
          return usedColors.every((color) => comb.includes(color));
        });
        phase = 2;
      }

      // Fase 2: Buscar el orden correcto
      if (phase === 2) {
        for (let i = 0; i < CodeA.length; i++) {
          posComb = posComb.filter((comb) => {
            return ColorsIndex.every(([k, v]) => {
              return comb[k] === v;
            });
          });
        }
      }

      console.log("Colores Correctos: ", CountCol);
      console.log("Posiciones Correctas: ", CountCorrect);

      Tries++;
      if (CountCorrect !== 4) {
        await askQuestion(
          "Presiona Enter para que la PC intente nuevamente..."
        );
      }
    }

    console.log(`¡La PC adivino tu codigo en ${Tries} intentos!`);
  };

  const PlayAgain = async () => {
    const answer = await askQuestion("¿Quieres jugar otra vez? (s/n): ");
    return answer.toLowerCase() === "s" || !answer.toLowerCase() === "n";
  };

  const startGame = async () => {
    console.log(`Bienvenido a: M A S T E R   M I N D`);
    console.log(`1 .- Quiero adivinar`);
    console.log(`2 .- Quiero que la máquina adivine`);

    await SelType();

    if (GameType === 1) {
      console.log("¡Comenzando Partida!");
      GenSecretCode();

      console.log(`Colores: `, valid.join(", "));

      while (CountCorrect !== 4) {
        Tries++;
        console.log(`Intento #${Tries}`);
        await TypeCode();
        await GuessPlayer();
      }

      console.log(`¡Felicidades! Adivinaste el código en ${Tries} intentos.`);
    } else {
      console.log("¡Comenzando Partida!");
      console.log(`Colores: `, valid.join(", "));
      console.log(`Por favor, ingresa un código para que la PC lo adivine.`);
      await TypeCode();
      await GuessPC();
    }
  };

  let Again = true;
  while (Again) {
    await startGame();
    Again = await PlayAgain();
    if (Again) {
      Tries = 0;
      CountCorrect = 0;
      CountCol = 0;
      CodeA = [];
    }
  }

  console.log("Gracias por jugar.");
}

MasterMind();
