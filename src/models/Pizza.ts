export interface IPizza {
    pizzaId: string;
    name: string;
    price: string;
    favorites: boolean;
    ingredients: string[];
    active: boolean;
  }

  export type ICreatePizza = Omit<IPizza, "pizzaId">;

  export type IUpdatePizza = ICreatePizza;