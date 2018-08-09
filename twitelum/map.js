"use strict";

let lista = [1,2,3,4,5];

let nova = [];



for(let i = 0; i<lista.length; i++) {
    nova.push(lista[i]*lista[i]);
}

console.log(nova);

let novaMap = lista.map(function(x){
    return x*x;
});

/*

Função "BoldArrow"

Maneira 1:

let novaMapArrow = lista.map((x) => {
    return x*x;
});



Maneira 2:
*/

let novaMapArrow = lista.map(x => x*x); 
//quando a função boldarrow tem somente um argumento, não precisa do parenteses da função;
//quando a função boldarrow tem somente uma linha de execução, não precisa das chaves;
//quando a única linha é um "return", não precisa da palavra "return";


let novaMapText = lista.map((x,i) => `${i+1} - O quadrado de ${x} é: ${x*x}`); //string template com crase ;)

console.log(novaMap);
console.log(novaMapArrow);
console.log(novaMapText);