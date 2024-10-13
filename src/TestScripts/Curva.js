function Curva(exp, inf, sup) {
    let c = 0;
    let n = 50;
    let ranges = []; // Puntos distribuidos entre inf y sup
    let s = (sup - inf) / (n - 1); // Separacion entre valores
    
    // Generar los puntos entre inf y sup
    for (let i = 0; i < n; i++) {
      ranges.push(inf + i * s);
    }
  
    // Método del trapecio para aproximar el área bajo la curva
    for (let i = 1; i < ranges.length - 1; i++) {
      c += processExpression(exp, ranges[i]) * s;
    }
  
    return c;
  }

function processExpression(exp, val) {
  // Eliminar espacios en blanco
  exp = exp.replace(/\s+/g, "");

  // Eliminar Paréntesis solo si encapsulan toda la expresión
  if (exp[0] === "(" && exp[exp.length - 1] === ")") {
    let depth = 0;
    let isEncapsulated = true;
    for (let i = 0; i < exp.length; i++) {
      if (exp[i] === "(") depth++;
      if (exp[i] === ")") depth--;
      if (depth === 0 && i < exp.length - 1) {
        isEncapsulated = false;
        break;
      }
    }
    if (isEncapsulated) {
      return processExpression(exp.slice(1, -1), val);
    }
  }

  //Identificar si es la variable 'x'
  if (exp === "x") {
    return val;
  }

  //Identificar si es un numero
  if (!isNaN(exp)) {
    return parseFloat(exp);
  }

  let operator = "";
  let left = "";
  let right = "";

  //Identificar el operador fuera de paréntesis
  let depth = 0;
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "(") depth++;
    if (exp[i] === ")") depth--;

    // Encontrar el operador que no este dentro de paréntesis
    if (depth === 0 && ["+", "-", "*", "/", "^"].includes(exp[i])) {
      operator = exp[i];
      left = exp.slice(0, i);
      right = exp.slice(i + 1);
      break;
    }
  }

  // Si no encontramos un operador válido, lanzamos error
  if (!operator) {
    throw new Error("Expresión no válida");
  }

  // Analizar el operador con el switch
  switch (operator) {
    case "^":
      return Math.pow(
        processExpression(left, val),
        processExpression(right, val)
      );
    case "*":
      return processExpression(left, val) * processExpression(right, val);
    case "/":
      return processExpression(left, val) / processExpression(right, val);
    case "+":
      return processExpression(left, val) + processExpression(right, val);
    case "-":
      return processExpression(left, val) - processExpression(right, val);
    default:
      throw new Error("Operador no válido");
  }
}

// Expresiones () op ()
// Operadores ^ * / + -
let expression = "x^2";
let result = Curva(expression, 0, 1);
console.log(result);
