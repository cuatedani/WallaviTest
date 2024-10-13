function Pascal(levels) {
    var Triangle = [];
  
    for (let i = 0; i < levels; i++) {
      let tempL = [];
      if (i === 0) {
        tempL.push(1);
      } else {
        tempL.push(1);
        for (let j = 1; j < Triangle[i - 1].length; j++) {
          tempL.push(Triangle[i - 1][j - 1] + Triangle[i - 1][j]);
        }
        tempL.push(1);
      }
      Triangle.push(tempL);
    }
  
    return Triangle;
  }
  
  function Divisible(Triangle) {
    let Div = [];
    for (let row of Triangle) {
      for (let num of row) {
        if (num % 7 === 0) {
          Div.push(num);
        }
      }
    }
    return Div;
  }
  
  function NotDivisible(Triangle) {
    let Not = [];
    for (let row of Triangle) {
      for (let num of row) {
        if (num % 7 !== 0) {
          Not.push(num);
        }
      }
    }
    return Not;
  }
  
  function Test() {
    let levels = Math.pow(10,9);
    const triangle = Pascal(levels);
    //console.log(`Triángulo de Pascal de ${levels} niveles. \n`, triangle);
    //console.log(`Divisibles entre 7. \n`, Divisible(triangle));
    console.log(`No divisibles entre 7. \n`, NotDivisible(triangle));
  }
  
  Test();
  