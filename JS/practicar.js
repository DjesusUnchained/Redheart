

const orden = "23456789TJQKA"; // este el orden de las cartas en el poker
var rank = 0;
var hand = [];
var opciones = { 
    1 : "Escalera real",
    2 : "Poker",
    3 : "Full House",
    4 : "Color",
    5 : "Escalera",
    6 : "Trio",
    7 : "Doble Pareja",
    8 : "Pareja",
    9 : "Carta Alta"
};

const obtenerValorMano = function(mano) {
    
    function contar(c, a) {
        c[a] = (c[a] || 0) + 1
        return c
    }
    //DIVIDIVOS LA CADENA EN CARAS Y PALOS
    const cartas = mano; // divide la cadena de texto en las 5 cartas
    const caras = cartas.map(a => String.fromCharCode([77 - orden.indexOf(a[0])])).sort();// mapea las cartas y extrae el valor segun el orden, y luego ordena las caras.
    const palos = cartas.map(a => a[1]).sort(); // mapea las cartas y extrae el palo de c/u  y las ordena


    // CALCULAMOS LOS POSIBLES VALORES DE LA MANO
    const contador = caras.reduce(contar, {}); //Cuenta las veces que se repite una cara y las devuelve en un objeto
    const duplicados = Object.values(contador).reduce(contar, {}); // obtenemos la cantidad de veces que tienen los valores (cuantas veces hay uno solo, cuantas veces un par, etc)
    const color = palos[0] === palos[4]; // como estan ordenadas, si el palo de la 1ra cartas es igual a la ultima, todas son del mismo palo.
    
    
    const primeraCarta = caras[0].charCodeAt(0);
    const escaleraBaja = caras.join("") === "AJKLM"; // si el charcode es igual significa que el valor de las cartas corresponde a una escalera del A al 5 (escalera baja)
    caras[0] = escaleraBaja ? "N" : caras[0]; // si hay una escalera baja el A toma el menor orden, sino el A mantiene el mayor valor.
    const escalera = escaleraBaja || caras.every((f, index) => f.charCodeAt(0) - primeraCarta === index); // calculamos si todas las caras son consecutivas
    

    // CREARMOS EL RANKING DE MANOS

    let ranking =
        (color && escalera && 1) ||                     // (1) Escalera de Color
        (duplicados[4] && 2) ||                         // (2) Poker
        (duplicados[3] && duplicados[2] && 3) ||        // (3) Full House
        (color && 4) ||                                 // (4) Color
        (escalera && 5) ||                              // (5) Escalera
        (duplicados[3] && 6) ||                         // (6) Trio
        (duplicados[2] > 1 && 7) ||                     // (7) Dos pares
        (duplicados[2] && 8) ||                         // (8) Un par
        9 ;                                             // (9) Carta Alta

    rank = ranking;
    return ranking;
 
}

const animarCarta = function(){
    document.getElementById("carta1").classList.add('animarCarta1');
    document.getElementById("carta2").classList.add('animarCarta2');
    document.getElementById("carta3").classList.add('animarCarta3');
    document.getElementById("carta4").classList.add('animarCarta4');
    document.getElementById("carta5").classList.add('animarCarta5');
}

const eliminarAnimacionCarta = function(){
    document.getElementById("carta1").classList.toggle('animarCarta1');
    document.getElementById("carta2").classList.toggle('animarCarta2');
    document.getElementById("carta3").classList.toggle('animarCarta3');
    document.getElementById("carta4").classList.toggle('animarCarta4');
    document.getElementById("carta5").classList.toggle('animarCarta5');
}

const barajar = function() {

    let palo = ["s", "d", "c", "h"];
    let cara = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K",];

    let mazo = [];
    let mano = [];

    for (let i = 0; i < palo.length; i++) {
        for (let x = 0; x < cara.length; x++) {
            let carta = { Value: cara[x], Suit: palo[i] };
            mazo.push(carta);
        };
    };
    for (let i = mazo.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = mazo[i];
    mazo[i] = mazo[j];
    mazo[j] = temp;
    };

    for (let i = 0; i < 5; i++) {
        mano.push(`${mazo[i].Value}${mazo[i].Suit}`)
    };

    document.getElementById("carta1").src = `./assets/img/Mazo/${mano[0]}.png`;
    document.getElementById("carta2").src = `./assets/img/Mazo/${mano[1]}.png`;
    document.getElementById("carta3").src = `./assets/img/Mazo/${mano[2]}.png`;
    document.getElementById("carta4").src = `./assets/img/Mazo/${mano[3]}.png`;
    document.getElementById("carta5").src = `./assets/img/Mazo/${mano[4]}.png`;

    animarCarta();
    setTimeout(eliminarAnimacionCarta,600);
    document.querySelector(".resultado").innerHTML = ""

    hand = mano;
    return mano;
}

const btnBorrar = function() {
    document.getElementById("carta1").src = `./assets/img/basicbackred.png`;
    document.getElementById("carta2").src = `./assets/img/basicbackred.png`;
    document.getElementById("carta3").src = `./assets/img/basicbackred.png`;
    document.getElementById("carta4").src = `./assets/img/basicbackred.png`;
    document.getElementById("carta5").src = `./assets/img/basicbackred.png`;

    document.querySelector(".resultado").innerHTML = "";
    hand = [];

}

const compararRank = function (value) {
    if (hand.length == 0){
        return false
    }
    obtenerValorMano(hand);

    if (value == rank) {
        document.querySelector(".resultado").classList.remove("incorrecto");
        document.querySelector(".resultado").classList.add("correcto");
        document.querySelector(".resultado").innerHTML = `CORRECTO!! El valor de mano es: ${opciones[rank]}`;

    }
    else {
        document.querySelector(".resultado").classList.remove("correcto");
        document.querySelector(".resultado").classList.add("incorrecto");
        document.querySelector(".resultado").innerHTML = `INCORRECTO!! El valor de mano es: ${opciones[rank]}`;
    }
}
