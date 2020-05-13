import React, { Component } from 'react';
import './JourneyInfo.css';

class JourneyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: 'DEN',
            destination: 'ATL',
            tripType: 'OW',
            departureDate: '5/11/2010',
            returnDate: null,
            passenger1FirstName: 'TestFirstNameZ',
            passenger1LastName: 'TestLastNameZ',
            passenger1Gender: 'male',
            passenger1BirthDate: '1/6/1980',
            emailAddress: 'automation@flyfrontier.com',
            phoneNumber: '555-555-5555',
            zipCode: '80201',
            cardNumber: '4012001021000605',
            cvv: '123'

        }
    }

    componentDidMount = () => {
        this.props.updateJourneyInfo(this.state);
    }

    handleInputChange = async (property, e) => {
        await this.setState({[property]: e.target.value});
        this.props.updateJourneyInfo(this.state);
        
    }

    render () {
        return (
            <div className="JourneyInfo">
                <form>
                    <label>Origin Airport Code</label>
                    <input value={this.state.origin} onChange={(e) => this.handleInputChange('origin', e)}></input>
                    <label>Destination Airport Code</label>
                    <input value={this.state.destination} onChange={(e) => this.handleInputChange('destination', e)}></input>
                    <label>Trip Type</label>
                    <input value={this.state.tripType} disabled={true}></input>
                    <label>Departure Date</label>
                    <input value={this.state.departureDate} onChange={(e) => this.handleInputChange('departureDate', e)}></input>
                    <label>Return Date</label>
                    <input value={this.state.returnDate || ''} disabled={true}></input>
                </form>
                <form>
                    <label>Passenger 1 First Name</label>
                    <input value={this.state.passenger1FirstName} onChange={(e) => this.handleInputChange('passenger1FirstName', e)}></input>
                    <label>Passenger 1 Last Name</label>
                    <input value={this.state.passenger1LastName} onChange={(e) => this.handleInputChange('passenger1LastName', e)}></input>
                    <label>Passenger 1 Gender</label>
                    <input value={this.state.passenger1Gender} onChange={(e) => this.handleInputChange('passenger1Gender', e)}></input>
                    <label>Passenger 1 Birth Date</label>
                    <input value={this.state.passenger1BirthDate} onChange={(e) => this.handleInputChange('passenger1BirthDate', e)}></input>
                    <label>Email Address</label>
                    <input value={this.state.emailAddress} onChange={(e) => this.handleInputChange('emailAddress', e)}></input>
                    <label>Phone Number</label>
                    <input value={this.state.phoneNumber} onChange={(e) => this.handleInputChange('phoneNumber', e)}></input>
                    <label>Zip Code</label>
                    <input value={this.state.zipCode} onChange={(e) => this.handleInputChange('zipCode', e)}></input>
                </form>
                <form> 
                    <label>Credit Card Number</label>
                    <input value={this.state.cardNumber} onChange={(e) => this.handleInputChange('cardNumber', e)}></input>
                    <label>Cvv</label>
                    <input value={this.state.cvv} onChange={(e) => this.handleInputChange('cvv', e)}></input>
                </form>
            </div>
        )
    }
}


export default JourneyInfo;


