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

let orderMenuArray = [];
let orderPriceArrayTotal = [];
let orderPriceArraySolo = [];
let orderAmountArray = [];
let deliverPrice = [5]; // FEHLER: Deine Fixe Zahl sollte kein Array sein! nun hat es Index position 0 das führt unten zu probleme 

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
    let IndexOfNameArray = getMenuIndex(menuArray[index]['name']);

    if (IndexOfNameArray == -1) {
        orderAmountArray.push(amount);
        orderMenuArray.push(menuArray[index]['name']);
        const price = amount * menuArray[index]['price'];
        orderPriceArrayTotal.push(price);
        orderPriceArraySolo.push(menuArray[index]['price']);

    } else {
        orderAmountArray[IndexOfNameArray] += amount;
        orderPriceArrayTotal[IndexOfNameArray] = orderAmountArray[IndexOfNameArray] * menuArray[index]['price'];

    }
    document.getElementById("amountID" + index).value = 1; // setzt dein input wieder auf 0
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

    for (let indexBasket = 0; indexBasket < orderMenuArray.length; indexBasket++) {

        basket.innerHTML += /*html*/ `
       <div class="border"> 
            Gericht: ${orderMenuArray[indexBasket]}  <br><br>

            Einzelpreis Fix: ${orderPriceArraySolo[indexBasket]}€ <br><br>

            Zwischenpreis_1: ${orderPriceArraySolo[indexBasket] * orderAmountArray[indexBasket]}€ <br>  
            Zwischenpreis_2: ${orderPriceArrayTotal[indexBasket]}€ <br>  <br> 

            Lieferkosten: ${deliverPrice[indexBasket]} € <br><br> <!-- du hast indexBasket++ definiert, somit sobald du zwei Gerichte anwählst geht es nicht da deliverPrice[indexBasket] (aldo das deliverPrice Array) nur die Index 0 definiert hat  -->

            Gesamtpreis: ${deliverPrice[indexBasket] + orderPriceArrayTotal[indexBasket]} € <br><br> <!-- Gesamtpreis berechnung Deliverpreis von 5 immer + entsprechender Total Wert = Zwischenwert + Lieferwert = Gesamtpreis-->
                                                    <!-- Bei Zeile 100 erscheint NaN als Fehler Meldung, das heißt number is not defined, da er delivePrice nicht erkennnt + orderPriceArrayTotal (hier erkennt Zahl) sein Fazit: NaN -->
            Gesamtanzahl: ${orderAmountArray[indexBasket]} <br> <br> <br>                                

            <div class="basketStyle">
                <div class="button"> 
                    <img src="./img/down.png" onclick="downNewAmount(${indexBasket})"> <!--"decrease" Funktion-->
                </div>
            
                <div id="amountBasket${indexBasket}"> 
                    ${orderAmountArray[indexBasket]} 
                </div>

                <div class="button">
                    <img src="./img/up.png" onclick="upNewAmount(${indexBasket})"> <!--"increase" Funktion-->
                </div>
            </div>
        </div>
        <br> <br> <br>
        `;
    }
}


function upNewAmount(index) {
    let IndexOfNameArray = getMenuIndex(orderMenuArray[index]);
    orderAmountArray[IndexOfNameArray] += 1;
    orderPriceArrayTotal[IndexOfNameArray] = orderPriceArraySolo[IndexOfNameArray] * orderAmountArray[IndexOfNameArray];  
    renderBasket();
}

function downNewAmount(index) {
    let IndexOfNameArray = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[IndexOfNameArray] > 1) {
        orderAmountArray[IndexOfNameArray] -= 1;
        orderPriceArrayTotal[IndexOfNameArray] = orderPriceArraySolo[IndexOfNameArray] * orderAmountArray[IndexOfNameArray];
        renderBasket();
    }
}

