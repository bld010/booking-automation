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
var destination = "ATL";
var tripTypeSelector = null;

function setTripTypeSelector(tripType) {
    if (tripType == "OW") {
        tripTypeSelector = 'label.radio:nth-child(2)'
    } else {
        tripTypeSelector = 'label.radio:nth-child';
    }
}

setTripTypeSelector(tripType);


nightmare
    .goto('https://ll-75cxnh2.flyfrontier.com/')
    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click(tripTypeSelector)
    .wait('.wait')
    .end()
    .then(function (result) {
        console.log(document.querySelector('#oneWayTrip'));
        console.log('Finished: ', result)
    })
    .catch(function (error) {
        console.error('Failure: ', error)
    })