function Triplete(p) {
  if (p % 2 === 1) {
    console.log("Sin Solución ");
  }

  for (let i = 1; i < p - 3; i++) {
    for (let j = i; j < p - 3; j++) {
      for (let k = j; k < p - 3; k++) {
        if (i < j && j < k) {
          if (i + j + k === p) {
            if (i * i + j * j === k * k) {
              console.log("A: ", i);
              console.log("B: ", j);
              console.log("C: ", k);
              console.log("ABC = ", i * j * k);
            }
          }
        }
      }
    }
  }
}

// A + B + C = P
// A + B = P - C
// A^2 + B^2 = C^2
// A > B > C
// ABC = ?
Triplete(1000);
