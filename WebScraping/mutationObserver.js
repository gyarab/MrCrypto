
setTimeout(function(){
let observer;


document.addEventListener('DOMContentLoaded', init);

function init(){

    let p1 = document.querySelector(".list-art");
    let p2 = document.querySelector('#list-art-count');
    let p3 = document.querySelector('.perex');
  //  let p4 = document.querySelector(".gws-csf-randomnumber__result");
   //1st p

  //  p.addEventListener('click', change);
//  let counter = 0;
//let timer = setInterval(function() {
  //change("data");
  //change("p2");
  change(".perex'");
//  counter += 1;
//    if (counter >= 25) {
  //      clearInterval(timer);
//    }
//}, 1000);


    let config = {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['data-thing', 'title', 'style'],
        childList: true,
        subtree: true,
        characterData: true,
        characterDataOldValue: true
    };
    /* childList, attributes, characterData */

    observer = new MutationObserver(mutated);
    observer.observe(p1, config);
    observer.observe(p2, config);
    observer.observe(p3, config);
    console.log("AHOJ");
}
function change(idX){
    let p = document.getElementsByClassName(idX);
for (var i = 0; i < p.length; i++) {
    p[i].textContent = Math.round(Math.random() * 10);
  }
}

function mutated(mutationList){
    console.log( mutationList );
    for(let mutation of mutationList) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
            console.log( mutation.oldValue );
        }
    }

    //observer.takeRecords();
    //observer.disconnect();

    //target - Element
    //addNodes - NodeList
    //removedNodes - NodeList
    //oldValue
    //attributeName
    //attributeNamespace
    //nextSibling - Element / textNode
    //previousSibling - Element / textNode
    //type 'attributes' or 'childList'
 }
}, 15000);
console.log("AHOJ");
