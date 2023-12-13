
function bla(id){
    return document.getElementById(id).value;
}

function blabla(){
    let InputValue1 = document.getElementById("banane").value;
    let InputValue1 = bla("banane");
}

// Zeile 7 und 8 ist das selbe nur anders geschrieben
// Zeile 8 ist clean coding, die banane von Zeile 8 wird in Zeile 2 mit id ausgetauscht so das da auch Banane steht
// und Zeile 3 erfolgt auch tauschso das dort auch Banane steht