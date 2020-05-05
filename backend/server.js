const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


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

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(bodyParser.json())
app.locals.title = 'Booking Flow Automation';

app.get('/', (request, response) => {
  response.json('Welcome to the Booking Flow Automation Tool!');
});

app.post('/fullBooking', (request, response) => {

    var requestBody = request.body;

    console.log('/full booking request body', requestBody);

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(requestBody.ibeUrl)  //Put in your local IBE 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
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


    .wait('.js-bagsCarryOnSelect')
    .select('.js-bagsCarryOnSelect', 'CO_0') //CO_1 is 1 carry-on ... make dynamic
    .click('.js-bagsSubmitButton')


    .wait('.js-extrasSubmitButton')
    .click('.js-extrasSubmitButton')


    .wait('#cardholder_name')
    .type('#cardholder_name', `${passenger1FirstName} ${passenger1LastName}`)
    // .wait(20000)
    .type('#card_number', cardNumber)
    .select('#card_expiration_month', "1")
    .select('#card_expiration_year', "49")
    .type('#card_cvv', cvv)

    .type('#billing_payment_address_1', "123 Main St.")
    .type('#billing_payment_city', 'Denver')
    .select('#billing_payment_state', 'CO')

    .click('.js-paymentSubmitButton')


    .wait('#btnReturnToBooking')
    .click('#btnReturnToBooking')


    .wait('.itin-header span.pnr')
    .evaluate(() => {
        pnr = document.querySelector('.itin-header span.pnr').innerText;
        console.log("The PNR is " + pnr) // this is in the browser scope
        return pnr;
    })
    .then((pnr) => {

        let pnrInfo = {
            pnr: pnr,
            lastName: passenger1LastName
        }

        response.json({pnrInfo});
        return nightmare.end();
    })
    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });


  app.post('/flightSelect', (request, response) => {

    var body = request.body;

    console.log(body)

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(body.ibeUrl) 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
    .wait('.hasDatepicker')
    .type('.hasDatepicker', departureDate)
    .click('#searchButton')

    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });

  app.post('/passengerInfo', (request, response) => {

    var body = request.body;

    console.log(body)

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(body.ibeUrl) 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
    .wait('.hasDatepicker')
    .type('.hasDatepicker', departureDate)
    .click('#searchButton')

    .wait('#submit_flight_search_button')
    .click('#submit_flight_search_button')

    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });

  app.post('/bundles', (request, response) => {

    var body = request.body;

    console.log(body)

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(body.ibeUrl) 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
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

    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });

  app.post('/seatSelect', (request, response) => {

    var body = request.body;

    console.log(body)

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(body.ibeUrl) 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
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

    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });

  app.post('/bags', (request, response) => {

    var body = request.body;

    console.log(body)

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(body.ibeUrl) 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
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

    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });


  app.post('/extras', (request, response) => {

    var body = request.body;

    console.log(body)

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(body.ibeUrl) 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
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

    .wait('.js-bagsCarryOnSelect')
    .select('.js-bagsCarryOnSelect', 'CO_0') //CO_1 is 1 carry-on ... make dynamic
    .click('.js-bagsSubmitButton')


    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });

  app.post('/payment', (request, response) => {

    var body = request.body;

    console.log(body)

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ 
        show: true,
        typeInterval: 10,
        openDevTools: {
            mode: 'detach'
          }
        });

    nightmare
    .goto(body.ibeUrl) 

    .type('#fromInput', origin)
    .wait(`[data-value="${origin}"]`)
    .click(`[data-value="${origin}"]`)
    .type('#toInput', destination)
    .wait(`[data-value="${destination}"]`)
    .click(`[data-value="${destination}"]`)
    .click('label.radio:nth-child(2)')
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

    .wait('.js-bagsCarryOnSelect')
    .select('.js-bagsCarryOnSelect', 'CO_0') //CO_1 is 1 carry-on ... make dynamic
    .click('.js-bagsSubmitButton')

    .wait('.js-extrasSubmitButton')
    .click('.js-extrasSubmitButton')

    .catch(function (error) {
        console.error('Failure: ', error)
    })
    
  });

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});


