//https://adventjs.dev/es/challenges/2023/20
function distributeGifts(weights) {
  let prom = weights.map((row) => [...row]);
  let sum = 0;
  let nei = 0;
  for (let y = 0; y < weights.length; y++) {
    for (let x = 0; x < weights[y].length; x++) {
      if (x < weights[y].length - 1 && weights[y][x + 1] !== null) {
        sum += weights[y][x + 1];
        nei++;
      }
      if (x > 0 && weights[y][x - 1] !== null) {
        sum += weights[y][x - 1];
        nei++;
      }
      if (y < weights.length - 1 && weights[y + 1][x] !== null) {
        sum += weights[y + 1][x];
        nei++;
      }
      if (y > 0 && weights[y - 1][x] !== null) {
        sum += weights[y - 1][x];
        nei++;
      }
      if (weights[y][x] !== null) {
        sum += weights[y][x];
        nei++;
      }
      if (nei !== 0) {
        sum;
        let p = sum / nei;
        prom[y][x] = Math.round(p);
      } else {
        prom[y][x] = 0;
      }
      sum = 0;
      nei = 0;
    }
  }
  return prom;
}
const weights = [
  [4, 5, 1],
  [6, null, 3],
  [8, null, 4],
];
const res = distributeGifts(weights);
console.log("Resultado;", res);
