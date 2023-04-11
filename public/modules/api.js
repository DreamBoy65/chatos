class Api {
  constructor() {

  }

  getQuote() {
    return fetch('https://api.api-ninjas.com/v1/quotes?category=' + "happiness", {
      method: "GET",
      headers: { 
        'X-Api-Key': 'LtQQAMx4/grtPajIVKuOEg==BzRNWmjYHrpU0EfR',
        "Content-Type": "application/json",
      }
    }).then(async data => await data.json())
  }
}