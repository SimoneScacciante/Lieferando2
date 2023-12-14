let menus = [{
    'name': 'Pizza Salami',
    'price': '12.99',
    'zutaten': ['Tomatensoße', 'Salami', 'Käse'],
},
{
    'name': 'Pizza Margherita',
    'price': '9.99',
    'zutaten': ['Tomatensoße', 'Käse'],
},
{
    'name': 'Pizza Funghi',
    'price': '12.99',
    'zutaten': ['Tomatensoße', 'frische Champignons', 'Käse'],
},
{
    'name': 'Pizza Tuna',
    'price': '13.99',
    'zutaten': ['Tomatensoße', 'Thunfisch', 'Zwiebeln', 'Käse'],
},
{
    'name': 'Pasta Bolo',
    'price': '10.49',
    'zutaten': ['Bolognesesoße'],
},
]
let orderMenu = []
let orderPrice = []
let orderAmount = []


function render() {
    let menu = document.getElementById('menu');
    menu.innerHTML = '';
    for (let i = 0; i < menus.length; i++) {
        menuLoad(i);
    }
}


function menuLoad(i) {
    let menu = document.getElementById('menu');
    const element = menus[i]
    menu.innerHTML += `
<div class="menuCard">
    <span>
    <h2>${element['name']}</h2>
    ${element['zutaten']}
    </span>
    <div class = "addArea">
    ${element['price']}
        <div class = "addArea">
            <input id="amount${i}" type="number" min="1" max ="10" value="1">
            <img class ="imgBasketAdd" src="img/basket.png" onclick="addToBasket(${i})">
        </div>

    </div>
</div>
`;
}
