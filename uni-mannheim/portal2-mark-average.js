// ==UserScript==
// @name         Uni Mannheim Portal2 average calculator
// @namespace    https://ivbeck.de
// @version      1.0
// @description  Calculates the average Grade you have and the total ECTS, because StudentCockpit sucks balls.
// @author       Iven Beck
// @match        https://portal2.uni-mannheim.de/portal2/rds?state=notenspiegelStudent&next=*
// @icon         https://portal2.uni-mannheim.de/HISinOne/images/mannheim/logos/favicon-32x32.png
// @grant        none
// ==/UserScript==

const appendText = (text) => {
    const node = document.createElement("div");
    const textnode = document.createTextNode(text);

    node.appendChild(textnode);
    node.style.cssText = 'font-weight: bold; margin: 5px;';
    document.getElementsByTagName("table")[1].appendChild(node);
}

(function() {
    'use strict';

    let totalWeight = 0;
    let average = 0.0;

    let tablePart = document.getElementsByClassName("tabelle1_alignright");
    let i = 0;
    let data = [];
    let tmp = {};

    console.log("Calculating the average Grade:");

    for(let part of tablePart){
        let content = part.innerHTML;
        content = content.replace( /(<([^>]+)>)/ig, '').trim();

        if(i==0){
            totalWeight += parseInt(content);
            tmp.weight = parseInt(content);
            i++;
        } else if(i == 1) {
            tmp.mark = parseFloat(content.replace(",", "."));
            i++;
        } else {
            data.push(tmp);
            i = 0;
            tmp = {};
        }
    }

    // Debug Print
    console.table(data);
    console.log("Total ECTS: " + totalWeight);

    data.forEach(ele => {
        average += (ele.weight/totalWeight) * ele.mark;
    });

    console.log("Average: " + average);

    appendText("Average: " + average.toFixed(2));
    appendText("Total ECTS: " + totalWeight)

})();
