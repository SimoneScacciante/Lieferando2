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
let deliverPrice = 5;

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
       <div class="basketContainerStyle"> 
            Gericht: ${orderMenuArray[indexBasket]}  <img onclick="removeFromBasket(${indexBasket})" src="./img/close.png" class="cursor" > <!-- removeFromBasket Funktion hinzugefügt-->
            <br><br>

            Einzelpreis Fix: ${orderPriceArraySolo[indexBasket]}€ <br><br>

            Zwischenpreis_1: ${orderPriceArraySolo[indexBasket] * orderAmountArray[indexBasket]}€ <br>  
            Zwischenpreis_2: ${orderPriceArrayTotal[indexBasket]}€ <br>  <br> 

            Lieferkosten: ${deliverPrice} € <br><br> 

            Gesamtpreis: ${deliverPrice + orderPriceArrayTotal[indexBasket]} € <br><br>
                                                  
            Gesamtanzahl: ${orderAmountArray[indexBasket]} <br> <br>                                 

            <div class="basketStyle">
                <div class="button"> 
                    <img class="cursor" src="./img/down.png" onclick="downNewAmount(${indexBasket})">
                </div>
            
                <div id="amountBasket${indexBasket}"> 
                    ${orderAmountArray[indexBasket]} 
                </div>

                <div class="button">
                    <img class="cursor" src="./img/up.png" onclick="upNewAmount(${indexBasket})"> 
                </div> <br>
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

function removeFromBasket(index) { 
    orderAmountArray.splice(index, 1); //Erinnerung wenn z.B steht ...splice(1,2) dann heißt die 1 = Position wo was entfernt wird z.B könnte stattdessen index stehen.. und die zahl 2 die anzahl der Elemente indemfall zwei Stück (zwei Elemente)
    orderMenuArray.splice(index, 1); // Du entfernst somit alle Index Positionen die du zuvor vergeben hast durch das klicken bei "kaufen"
    orderPriceArrayTotal.splice(index, 1); // kein Array mit Index Position = kein Array was erscheinen könnte = Basket verschwindet!
    orderPriceArraySolo.splice(index, 1);
    renderBasket();
}

