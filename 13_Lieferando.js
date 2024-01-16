let menuArray = [
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

    for (let i = 0; i < menuArray.length; i++) {
        menuLoad(i);
    }
}

function menuLoad(i) {
    let menuID = document.getElementById('menuID');
    const element = menuArray[i]

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
    let OrderNameIndexOf = getMenuIndex(menuArray[index]['name']);

    if (OrderNameIndexOf == -1) {
        orderAmountArray.push(amount);
        orderMenuArray.push(menuArray[index]['name']);
        const price = amount * menuArray[index]['price'];
        orderPriceArray.push(price);

    } else {
        orderAmountArray[OrderNameIndexOf] += amount;
        orderPriceArray[OrderNameIndexOf] = orderAmountArray[OrderNameIndexOf] * menuArray[index]['price'];

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
            Einzelpreis: ${menuArray[k]['price']}€ <br>
           Gesamtpreis: ${orderPriceArray[k]}€ <br> 
           Anzahl: ${orderAmountArray[k]} <br>                                      <!-- Zeile: 92 im value des Input kommt orderAmountArray somit wird immer  aktuelle amount Zahl immer angezeigt innerhalb Inputfeld -->
           <div class="button"><input id="amountBasket${k}" type="number" min="1" max ="10" value="${orderAmountArray[k]}"><br> <img onclick="reloadNewAmount(${k})" src="img/reload.png" > <img src="img/delete.png"></div>  
        </div> <br> <br>
        `;
    }
}

function reloadNewAmount(index) {   // Aktualisierung von amount Wert des neuen Inputfeldes
    let amountValue = +document.getElementById("amountBasket" + index).value; // Der neue von die gewählte Amount Wert im neuen Inputfeld "
    let OrderNameIndexOf = getMenuIndex(menuArray[index]['name']); // IndexOf von "orderMenuArray" vom Namen "Hamburger" oder "Carbonara" oder "Pizza"  // menuArray[index] könntest mit =  "const menu = menuArray[index];" Zusammenfassen
    orderAmountArray.splice(OrderNameIndexOf, 1, amountValue);
    renderBasket();
}
0

// <<<<====== orderAmountArray.splice(OrderNameIndexOf, 1, amountValue); =====>>>>>>>>>

// OrderNameIndexOf sagt uns, an welcher Position im orderAmountArray wir etwas ändern möchten.
// Die 1 bedeutet, dass wir genau ein Element an dieser Position ersetzen möchten.
// amountValue ist der neue Wert, den wir an dieser Stelle einsetzen möchten.
// Zusammengefasst bedeutet dies, dass wir den Wert in orderAmountArray an der Position OrderNameIndexOf 
// durch amountValue ersetzen, um die Bestellmenge für ein bestimmtes Gericht zu aktualisieren. 
// Dies geschieht, wenn Sie die Menge im Eingabefeld ändern und auf das "reload"-Bild klicken.

// Fazit: Die reloadNewAmount(index) Funktion führt dazu das sobald du auf reload button klickst
// deine eingegebene Input zahl im orderAmountArray erscheint bzw. ersetzt wird durch die erste zahl die beim ersten klick erschien  (amountID)
