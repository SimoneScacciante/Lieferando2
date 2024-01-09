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
        Bestellung: <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br>
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
            Einzelpreis Fix: ${menuArray[k]['price']}€ <br>
           Gesamtpreis "NUR IF FUNKTION": ${orderPriceArray[k]}€ <br> <!-- Funktioniert NUR in der IF-Funktion!!!--> 

           Gesamtpreis TEST: ${orderAmountArray[k] * menuArray[k]['price']}€ <br>                                   
           Gesamtanzahl: ${orderAmountArray[k]} <br>                                   
        </div>

        <div class="basketStyle">
            <div class="button"> 
                <img src="/img/down.png" onclick="downNewAmount(${k})"> 
            </div>
            
             <div id="amountBasket${k}"> 
                    ${orderAmountArray[k]} 
             </div>

            <div class="button">
             <img src="/img/up.png" onclick="upNewAmount(${k})"> 
            </div>
        </div>
        <br> <br>
        `;
    }
}


function upNewAmount(index) {
    let OrderNameIndexOf = getMenuIndex(orderMenuArray[index]);
    orderAmountArray[OrderNameIndexOf] += 1; // Erhöhe die Menge um 1
    renderBasket();
}

function downNewAmount(index) {
    let OrderNameIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[OrderNameIndexOf] > 1) { // wenn meine Zahl größer als 1 ist dann führe nächste Zeile also -1 aus
        orderAmountArray[OrderNameIndexOf] -= 1; // wenn aber Zahl die Bedingung NICHT erfüllt, dann führe NIX aus (da keine Else definiert)
        renderBasket();
    }
}

