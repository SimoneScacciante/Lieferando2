let menuArray = [
    {
        'name': 'Hamburger',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 10,
    },

    {
        'name': 'Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 15,
    },

    {
        'name': 'Pizza',
        'recepte': ['Kartoffel', 'Curry', 'Ketchup'],
        'price': 20,
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
        Bestellung: <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br> <!-- im Project 15_lieferando.js entferne Input (veränderung am Value findet statt) -->
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
       <div class="border"> 
            Gericht: ${orderMenuArray[k]}  <br>
            Einzelpreis Fix: ${menuArray[k]['price']}€ <br>
            <br>
            Gesamtpreis: ${orderPriceArray[k]}€ <br>  
            Gesamtpreis: ${orderAmountArray[k] * menuArray[k]['price']}€ <br> <!-- Achtung: [k] stimmt nicht! siehe Debuger, wenn du Carbonara klickst bekommt es Index: 0 obwohl es 1 ist-->                 
            <br>            
            Gesamtanzahl: ${orderAmountArray[k]} <br>                                   
        

            <div class="basketStyle">
                <div class="button"> 
                    <img src="./img/down.png" onclick="downNewAmount(${k})"> <!--"decrease" Funktion-->
                </div>
            
                <div id="amountBasket${k}"> 
                    ${orderAmountArray[k]} 
                </div>

                <div class="button">
                    <img src="./img/up.png" onclick="upNewAmount(${k})"> <!--"increase" Funktion-->
                </div>
            </div>
        </div>
        <br> <br> <br>
        `;
    }
}


function upNewAmount(index) {
    let OrderNameIndexOf = getMenuIndex(orderMenuArray[index]); // vom neuen Array der Index Name z.B neu eingefügten "Hamburger" = OrderNameIndexOf (wichtig für Position erkennung = setzt Index Position)
    orderAmountArray[OrderNameIndexOf] += 1; // Erhöhe die Menge um 1 bei jeden Klick am entsprechenden angewählten Namen z.B Hamburger
    
    renderBasket();
}

function downNewAmount(index) {
    let OrderNameIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[OrderNameIndexOf] > 1) { // wenn meine Zahl größer als 1 ist dann führe nächste Zeile also -1 aus
        orderAmountArray[OrderNameIndexOf] -= 1; // wenn aber Zahl die Bedingung NICHT erfüllt, dann führe NIX aus (da keine Else definiert)
        renderBasket();
    }
}

// EINZELPREIS ab Aufgabe 11_Lieferando.js funktioniert nicht, wieso?
// orderPriceArray // funktioniert gar nicht
