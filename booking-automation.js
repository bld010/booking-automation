var start = new Date();
var hrstart = process.hrtime();

var Nightmare = require('nightmare');
var nightmare = Nightmare({ 
    show: true,
    typeInterval: 10,
    openDevTools: {
        mode: 'detach'
      }
});

//right now this only works for one-way
// need to figure out how to use datepicker for seasonal routes, as well as RT journeys


var tripType = "OW"; // "OW or RT"
var origin = "DEN";
var destination = "ATL";
var tripTypeSelector = null;
var departureDate = "5/11/2020";
var passenger1FirstName = "TestFirstNameZ";
var passenger1LastName = "TestLastNameZ";
var passenger1Gender = "male";
var passenger1BirthDate = "1/6/1980";
var emailAddress = "automation@flyfrontier.com";
var phoneNumber = "555-555-5555";
var zipCode = "80201";



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
    .wait('.hasDatepicker')
    .type('.hasDatepicker', departureDate)
    .click('#searchButton')
    .wait('#submit_flight_search_button')
    .click('#submit_flight_search_button')
    .wait('#frontierPassengers_0__Name_First')
    .click('#frontierPassengers_0__Name_First')
    .type('#frontierPassengers_0__Name_First', passenger1FirstName)
    .type('#frontierPassengers_0__Name_Last', passenger1LastName)
    .select('#frontierPassengers_0__Info_Gender', (passenger1Gender == 'male' ? '1' : '2'))
    .type('#date_of_birth_0', passenger1BirthDate)
    .type('#frontierContact_EmailAddress', emailAddress)
    .type('#js_first_phone_number', phoneNumber)
    .type('#frontierContact_PostalCode', zipCode)
    .click('#submit_passenger_info_button')
    .wait('.js-bundlesSubmitButton')
    .click('.js-bundlesSubmitButton')
    .wait('#saveSelectedSeats')
    .click('#saveSelectedSeats')
    .wait('.f9-btn.f9-btn-link-green.cd-btn')
    .click('.f9-btn.f9-btn-link-green.cd-btn')
    .wait('#saveSelectedSeats')
    .click('#saveSelectedSeats')
    // .wait('.f9-btn.f9-btn-link-green.cd-btn')
    // .click('.f9-btn.f9-btn-link-green.cd-btn')
    .wait('.js-bagsCarryOnSelect')
    .select('.js-bagsCarryOnSelect', 'CO_0') //CO_1 is 1 carry-on ... make dynamic
    .click('.js-bagsSubmitButton')
    .wait('.js-extrasSubmitButton')
    .click('.js-extrasSubmitButton')
    
    // .end()
    .then(function (result) {
        var end = new Date() - start;
        console.log('Duration: ', end);    
    })
    .catch(function (error) {
        console.error('Failure: ', error)
    })

    