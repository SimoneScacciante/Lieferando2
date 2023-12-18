let menusArray = [
    {
        'name': 'Hamburger',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 10,
    },

    {
        'name': 'Pasta Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 7.5,
    },

    {
        'name': 'Pizza Salami',
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
        Anzahl: ${orderAmountArray[i]} <br>
        Bestellung: 
        <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br> 
        <button onclick="addToBasket(${i})"> Kaufen </button> 
    <br> <br> <br>   
    </div> 
`
}


function addToBasket(index) {
    let amount = getAmountFromInput(index);
    const menu = menusArray[index]; // nun bekommt "menusArray" jedes einzelene Gericht (Json-String Abschnitt inner {}-Klammer) eine Index-Position
    let orderBasket = getMenuIndex(orderMenuArray['name']);

    if (orderMenuArray == -1) {
        orderMenuArray.push(orderBasket)
    } else {
        
    }

}

function getMenuIndex (menu) {
    let indexOf = orderMenuArray.IndexOf(menu);
    return indexOf;
}


function getAmountFromInput(input) {
    let amountValue = +document.getElementById('amountID', input).value; //hier greift auf "amountID" und verknüpfung mit  Index-Wert
    return amountValue;
}

