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
<<<<<<< HEAD
let deliverPrice = 5; // Nun kein Array mehr (keine Index Position mehr) da Klammer weg
=======
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d

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
<<<<<<< HEAD
        Bestellung: <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br>
=======
        Bestellung: <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br> <!-- im Project 15_lieferando.js entferne Input (veränderung am Value findet statt) -->
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
        <button onclick="addToBasket(${i})"> Kaufen </button> 
    <br> <br> <br>   
    </div> 
`
}


function addToBasket(index) {
    let amount = getAmountFromInput(index);
<<<<<<< HEAD
    let getMenuIndexOf = getMenuIndex(menuArray[index]['name']);

    if (getMenuIndexOf == -1) {
=======
    let IndexOfNameArray = getMenuIndex(menuArray[index]['name']);

    if (IndexOfNameArray == -1) {
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
        orderAmountArray.push(amount);
        orderMenuArray.push(menuArray[index]['name']);
        const price = amount * menuArray[index]['price'];
        orderPriceArrayTotal.push(price);
        orderPriceArraySolo.push(menuArray[index]['price']);

    } else {
<<<<<<< HEAD
        orderAmountArray[getMenuIndexOf] += amount;
        orderPriceArrayTotal[getMenuIndexOf] = orderAmountArray[getMenuIndexOf] * menuArray[index]['price'];
=======
        orderAmountArray[IndexOfNameArray] += amount;
        orderPriceArrayTotal[IndexOfNameArray] = orderAmountArray[IndexOfNameArray] * menuArray[index]['price'];
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d

    }
    document.getElementById("amountID" + index).value = 1;
    renderBasket();
    foodBill();
}

function foodBill() {
    let bill = document.getElementById('billID');

    bill.innerHTML = /*html*/ `
    <div class="billContainerStyle"> 
        <div class="billOrderStyle"> 
             Mindest-Bestellwert ist noch nicht erreicht 
        </div> <br>
        <div class="billOptionsStyle">  
             1. Der Mindestbestellwert liegt bei 50 € <br>
             2. Bei einem Bestellwert ab 50€ ist die Lieferung frei Haus <br>
             3. Bei einem Bestellwert ab 80€ bekommen Sie eine Flasche erlesenen Qualitätswein gratis dazu <br>
        </div>
    </div>`;
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
<<<<<<< HEAD
       <div class="basketContainerStyle"> 
            Gericht: ${orderMenuArray[indexBasket]}  <br><br>

            Einzelpreis Fix: ${orderPriceArraySolo[indexBasket]}€ <br><br>

            Zwischenpreis_1: ${orderPriceArraySolo[indexBasket] * orderAmountArray[indexBasket]}€ <br>  
            Zwischenpreis_2: ${orderPriceArrayTotal[indexBasket]}€ <br>  <br> 

            Lieferkosten: ${deliverPrice} € <br><br> <!-- habe indexBasket entfernt, nun keine Indexinierung mehr, Programm läuft -->

            Gesamtpreis: ${deliverPrice + orderPriceArrayTotal[indexBasket]} € <br><br>
                                                  
            Gesamtanzahl: ${orderAmountArray[indexBasket]} <br> <br> <br>                                
=======
<<<<<<< HEAD
       <div class="border"> 
            Gericht: ${orderMenuArray[indexBasket]}  <br>
        
            Einzelpreis Fix: ${orderPriceArraySolo[indexBasket]}€ <br>
            <br>
            Gesamtpreis_1: ${orderPriceArraySolo[indexBasket] * orderAmountArray[indexBasket]}€ <br>   
            Gesamtpreis_2: ${orderPriceArrayTotal[indexBasket]}€ <br>  
                   
            <br>            
            Gesamtanzahl: ${orderAmountArray[indexBasket]} <br>                                   
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d

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
<<<<<<< HEAD
=======
        `;
    }
}

function upNewAmount(index) {
    let IndexOfNameArray = getMenuIndex(orderMenuArray[index]); 
    orderAmountArray[IndexOfNameArray] += 1; // Für Gesamtpreis_1 Berechnung
    orderPriceArrayTotal[IndexOfNameArray] =  orderPriceArraySolo[IndexOfNameArray] * orderAmountArray[IndexOfNameArray];  //Für Gesamtpreis_2 Berechnung
    renderBasket();
}

function downNewAmount(index) {
    let IndexOfNameArray = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[IndexOfNameArray] > 1) { 
        orderAmountArray[IndexOfNameArray] -= 1; //Für Gesamtpreis_1 Berechnung
        orderPriceArrayTotal[IndexOfNameArray] =  orderPriceArraySolo[IndexOfNameArray] * orderAmountArray[IndexOfNameArray]; //Für Gesamtpreis_2 Berechnung
        renderBasket();
    }
}

=======
       <div> 
            Gericht: ${orderMenuArray[k]}  <br>
            Einzelpreis: ${menuArray[k]['price']}€ <br>
           Gesamtpreis: ${orderPriceArray[k]}€ <br> 
           Anzahl: ${orderAmountArray[k]} <br>                                   
           <div class="button"><input id="amountBasket${k}" type="number" min="1" max ="10" value="${orderAmountArray[k]}"><br> <img onclick="reloadNewAmount(${k})" src="img/reload.png" > <img src="img/delete.png"></div>  
        </div> <br> <br>
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
        `;
    }
}


function upNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    orderAmountArray[getMenuIndexOf] += 1;
    orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];
    renderBasket();
}
<<<<<<< HEAD

function downNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[getMenuIndexOf] > 1) {
        orderAmountArray[getMenuIndexOf] -= 1;
        orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];
        renderBasket();
    }
}

// Aufgaben: Funktion Close /  Hinweis Mindest Bestellwert ist noch nicht erreicht
=======
>>>>>>> 03a5c4c944ff46e6acd288fe83995bdb6ec09500
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
