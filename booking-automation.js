var start = new Date();

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
var cardNumber = "4012001021000605";
var cvv = "123";



function setTripTypeSelector(tripType) {
    if (tripType == "OW") {
        tripTypeSelector = 'label.radio:nth-child(2)'
    } else {
        tripTypeSelector = 'label.radio:nth-child';
    }
}

setTripTypeSelector(tripType);



nightmare
    .goto('https://ll-75cxnh2.flyfrontier.com/')  //Put in your local IBE 

    //#region Flight Search
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
    //#endregion


    //#region Flight Select (Chooses default selection)
    .wait('#submit_flight_search_button')
    .click('#submit_flight_search_button')
    //#endregion


    //#region Passenger Info Page (One passenger)
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
    //#endregion

    //#region Bundle Page (Doesn't select a bundle)
    .wait('.js-bundlesSubmitButton')
    .click('.js-bundlesSubmitButton')
    //#endregion

    //#region Seat Selection (Doesn't select seats)
    .wait('#saveSelectedSeats')
    .click('#saveSelectedSeats')
    .wait('.f9-btn.f9-btn-link-green.cd-btn')
    .click('.f9-btn.f9-btn-link-green.cd-btn')
    //#endregion


    //#region For one-way flights with two legs, comment in the below code
    // .wait('#saveSelectedSeats')
    // .click('#saveSelectedSeats')
    // .wait('.f9-btn.f9-btn-link-green.cd-btn')
    // .click('.f9-btn.f9-btn-link-green.cd-btn')
    //#endregion


    //#region Bag Selection (No COB, no checked bags)
    .wait('.js-bagsCarryOnSelect')
    .select('.js-bagsCarryOnSelect', 'CO_0') //CO_1 is 1 carry-on ... make dynamic
    .click('.js-bagsSubmitButton')
    //#endregion


    //#region Extras (No extras selected)
    .wait('.js-extrasSubmitButton')
    .click('.js-extrasSubmitButton')
    //#endregion


    //#region Payment Page
    .wait('#cardholder_name')
    .type('#cardholder_name', `${passenger1FirstName} ${passenger1LastName}`)
    // .wait(20000)
    .type('#card_number', cardNumber)
    .select('#card_expiration_month', "1")
    .select('#card_expiration_year', "49")
    .type('#card_cvv', cvv)

    // .type('#billing_payment_address_1', "123 Main St.")
    // .type('#billing_payment_city', 'Denver')
    // .select('#billing_payment_state', 'CO')

    // .click('.js-paymentSubmitButton')
    //#endregion


    //Close slideout (maybe?)
    // .wait('#btnReturnToBooking')
    // .click('#btnReturnToBooking')


    //Grab PNR
    // .wait('.itin-header span.pnr')
    // .evaluate(() => {
    //     pnr = document.querySelector('.itin-header span.pnr').innerText;
    //     console.log("The PNR is " + pnr) // this is in the browser scope
    //     return pnr;
    // })
    // .then((pnr) => {

    //     console.log('\n\n')
    //     console.table({
    //         PNR: pnr,
    //         LastName: passenger1LastName
    //     })
    //     console.log('\n\n')
    //     // this is in node scope

    //     // comment in below line if you just want a PNR (and don't want to stop at a specific part of the flow)
    //     return nightmare.end();
    // })

    // .end()

    // This command closes the browser (Only do this if you just want a PNR)
    .then(function (result) {
        var end = new Date() - start;
        console.log('Duration: ', end);    
    })
    .catch(function (error) {
        console.error('Failure: ', error)
    })

    