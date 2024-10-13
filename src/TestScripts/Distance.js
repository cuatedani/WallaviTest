// R E T O   2 5   A D V E N T J S
//https://adventjs.dev/es/challenges/2023/25

function travelDistance(map) {
  let coordinates = {};
  let matriz = [];
  let kids = 0;
  let distance = 0;
  let y = map.split("\n");
  for (let x = 0; x < y.length; x++) {
    matriz.push(y[x].split(""));
  }

  for (let y = 0; y < matriz.length; y++) {
    for (let x = 0; x < matriz[y].length; x++) {
      if (matriz[y][x] === "S") {
        coordinates["S"] = [x, y];
      } else if (!isNaN(matriz[y][x])) {
        kids++;
        coordinates[matriz[y][x]] = [x, y];
      }
    }
  }

  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

  for (let k = 0; k <= kids; k++) {
    if (k === 0) {
      x1 = coordinates["S"][0];
      y1 = coordinates["S"][1];
    } else {
      x2 = coordinates[k][0];
      y2 = coordinates[k][1];
      let d = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      distance += d;

      x1 = coordinates[k][0];
      y1 = coordinates[k][1];
    }
  }

  return distance;
}

const map = `.....1....
..S.......
..........
....3.....
......2...`;
console.log(`Distancia Recorrida: ${travelDistance(map)}`);
