var Nightmare = require('nightmare');
var nightmare = Nightmare({ 
    show: true,
    typeInterval: 500,
    openDevTools: {
        mode: 'detach'
      }
});

var tripType = "OW"; // "OW or RT"
var origin = "DEN";


nightmare
    .goto('https://ll-75cxnh2.flyfrontier.com/')
    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click('[data-value="DEN"]')
    .type('#toInput', 'ATL')
    .wait('[data-value="ATL"]')
    .click('[data-value="ATL"]')
    .click('label.radio:nth-child(2)')
    //set child in global scope, then pass it in above!
    // check for one way or rt
    // one way needs to select one way radio
    .wait('.wait')
    .end()
    .then(function (result) {
        console.log(document.querySelector('#oneWayTrip'));
        console.log('Finished: ', result)
    })
    .catch(function (error) {
        console.error('Failure: ', error)
    })