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
let deliverPrice = 5; // Nun kein Array mehr (keine Index Position mehr) da Klammer weg

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
    let getMenuIndexOf = getMenuIndex(menuArray[index]['name']);

    if (getMenuIndexOf == -1) {
        orderAmountArray.push(amount);
        orderMenuArray.push(menuArray[index]['name']);
        const price = amount * menuArray[index]['price'];
        orderPriceArrayTotal.push(price);
        orderPriceArraySolo.push(menuArray[index]['price']);

    } else {
        orderAmountArray[getMenuIndexOf] += amount;
        orderPriceArrayTotal[getMenuIndexOf] = orderAmountArray[getMenuIndexOf] * menuArray[index]['price'];

    }
    document.getElementById("amountID" + index).value = 1; 
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

            Lieferkosten: ${deliverPrice} € <br><br> <!-- habe indexBasket entfernt, nun keine Indexinierung mehr, Programm läuft -->

            Gesamtpreis: ${deliverPrice + orderPriceArrayTotal[indexBasket]} € <br><br>
                                                  
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
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    orderAmountArray[getMenuIndexOf] += 1;
    orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf]; 
    renderBasket();
}

function downNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[getMenuIndexOf] > 1) {
        orderAmountArray[getMenuIndexOf] -= 1;
        orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf]; 
        renderBasket();
    }
}

