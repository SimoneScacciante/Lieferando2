let menusArray = [
    {
        'name': 'Hamburger',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 10,
    },

    {
        'name': 'Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 7.5,
    },

    {
        'name': 'Pizza',
        'recepte': ['Kartoffel', 'Curry', 'Ketchup'],
        'price': 15,
    },
]

let orderMenuArray = []
let orderPriceArray = []
let orderAmountArray = []

function render() {
    let menuID = document.getElementById('menuID');
    menuID.innerHTML = '';

    for (let i = 0; i < menusArray.length; i++) {
        menuLoad(i);
    }
}

function menuLoad(i) {
    let menuID = document.getElementById('menuID');
    const element = menusArray[i]

    menuID.innerHTML += /*html*/`
    <div>
        Name: ${element['name']} <br>
        Zutaten: ${element['recepte']} <br>
        Preis: ${element['price']} €  <br> 
        Bestellung: 
        <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br> 
        <button onclick="addToBasket(${i})"> Kaufen </button> 
    <br> <br> <br>   
    </div> 
`
}


function addToBasket(index) {
    let amount = getAmountFromInput(index);
    const menuArrayIndex = menusArray[index];
    let OrderName = getMenuIndex(menuArrayIndex['name']);

    if (OrderName == -1) {
        orderAmountArray.push(amount);
        orderMenuArray.push(menuArrayIndex['name']);
        const price = amount * menuArrayIndex['price']; // die Berechnung um auf Gesamtpreis zu kommen
        orderPriceArray.push(price); // Berechnung Gesamtpreis in neuen Leeren Array Price einfügen
    } else {
        orderAmountArray[OrderName] += amount;  // [OrderName] einfügen da nicht wie im "if (...)" KLammer vordefiniert ist
        orderPriceArray[OrderName] = orderAmountArray[OrderName] * menuArrayIndex['price'];
    }
    renderBasket();
}


function getMenuIndex(menu) {
    let indexOf = orderMenuArray.indexOf(menu);
    return indexOf;
}    

function getAmountFromInput(input) {
    let amountValue = +document.getElementById("amountID" + input).value;
    return amountValue;
}

function renderBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = '';

    for (let k = 0; k < orderMenuArray.length; k++) {

        basket.innerHTML += /*html*/ `
       <div> 
            Gericht: ${orderMenuArray[k]}  <br>
           Preis einzeln: ${orderPriceArray[k]}€ <br> 
           Anzahl: ${orderAmountArray[k]} <br>  <!-- Anzahl wird übernommen-->     
       </div> <br> <br>
        `;
    }
}

