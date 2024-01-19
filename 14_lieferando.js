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

    for (let indexBasket = 0; indexBasket < orderMenuArray.length; indexBasket++) {

        basket.innerHTML += /*html*/ `
       <div class="border"> 
            Gericht: ${orderMenuArray[indexBasket]}  <br>
            Einzelpreis Fix: ${menuArray[indexBasket]['price']}€ <br>
            <br>
<<<<<<< HEAD
            Gesamtpreis: ${orderPriceArray[indexBasket]}€ <br>  
            Gesamtpreis: ${orderAmountArray[indexBasket] * menuArray[indexBasket]['price']}€ <br> <!-- Achtung: hier wird falscher Index vergeben! Siehe Debuger -->                 
            <br>                                                                                <!-- Aufgabe 15_Lieferando.js ist Aufgabe richtig gelöst-->
            Gesamtanzahl: ${orderAmountArray[indexBasket]} <br>                                   
=======
            Gesamtpreis: ${orderPriceArray[k]}€ <br>  
<<<<<<< HEAD
            Gesamtpreis: ${orderAmountArray[k] * menuArray[k]['price']}€ <br> <!-- Achtung: [k] stimmt nicht! siehe Debuger, wenn du Carbonara klickst bekommt es Index: 0 obwohl es 1 ist-->                 
=======
            Gesamtpreis: ${orderAmountArray[k] * menuArray[k]['price']}€ <br>                       
>>>>>>> 03a5c4c944ff46e6acd288fe83995bdb6ec09500
            <br>            
            Gesamtanzahl: ${orderAmountArray[k]} <br>                                   
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
        

            <div class="basketStyle">
                <div class="button"> 
<<<<<<< HEAD
                    <img src="./img/down.png" onclick="downNewAmount(${indexBasket})"> <!--"decrease" Funktion-->
=======
                    <img src="./img/down.png" onclick="downNewAmount(${k})"> <!--"decrease" Funktion-->
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
                </div>
            
                <div id="amountBasket${indexBasket}"> 
                    ${orderAmountArray[indexBasket]} 
                </div>

                <div class="button">
<<<<<<< HEAD
                    <img src="./img/up.png" onclick="upNewAmount(${indexBasket})"> <!--"increase" Funktion-->
=======
                    <img src="./img/up.png" onclick="upNewAmount(${k})"> <!--"increase" Funktion-->
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
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
    
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======


>>>>>>> 03a5c4c944ff46e6acd288fe83995bdb6ec09500
>>>>>>> 8e180ba51b1366951544009053bb8de9be23b07d
    renderBasket();
}

function downNewAmount(index) {
    let OrderNameIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[OrderNameIndexOf] > 1) { // wenn meine Zahl größer als 1 ist dann führe nächste Zeile also -1 aus
        orderAmountArray[OrderNameIndexOf] -= 1; // wenn aber Zahl die Bedingung NICHT erfüllt, dann führe NIX aus (da keine Else definiert)
        renderBasket();
    }
}


