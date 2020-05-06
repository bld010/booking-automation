import React, { Component } from 'react';
import './UserInput.css';
import { startAutomation } from './util/apiCalls.js';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stopBookingFlowPage: null,
            pnr: null,
            ibeUrl: null
        };
        this.bookingFlowPages = [
            "Flight Select",
            "Passenger Info",
            "Bundles",
            "Seat Select",
            "Bags",
            "Extras",
            "Payment",
            "Full Booking"
        ]
        
    }

    handleBookingFlowPageClick = (e) => {
        this.setState({stopBookingFlowPage: e.target.innerText})
    }

    generateBookingFlowSelectionElements = () => {
        return this.bookingFlowPages.map(page => {
            return (
            <li 
                key={page} 
                onClick={this.handleBookingFlowPageClick}
                className={this.state.stopBookingFlowPage === page ? "active": ""}  
            >
                {page}
            </li>
            )
        })
    }

    handleIbeUrlChange = (e) => {
        this.setState({ibeUrl: e.target.value});
        this.updateLocalStorage(e.target.value);
    }

    updateLocalStorage = (ibeUrl) => {
        localStorage.setItem('ibeUrl', ibeUrl)
    }


    retrieveIbeUrlFromLocalStorage = () => {
        let ibeUrl = localStorage.getItem('ibeUrl');
        if (ibeUrl) {
            this.setState({ibeUrl: ibeUrl})
        }
    }

    componentDidMount = () => {
        this.retrieveIbeUrlFromLocalStorage();
    }

    getFetchRoute = () => {
        switch (this.state.stopBookingFlowPage) {
            case 'Flight Select':
                return "http://localhost:3001/flightSelect";
            case 'Passenger Info':
                return "http://localhost:3001/passengerInfo";
            case 'Bundles':
                return "http://localhost:3001/bundles";
            case 'Seat Select':
                return "http://localhost:3001/seatSelect";
            case 'Bags':
                return "http://localhost:3001/bags";
            case 'Extras':
                return "http://localhost:3001/extras";
            case 'Payment':
                return "http://localhost:3001/payment";
            default: 
                return "http://localhost:3001/fullBooking";

        }

    }

    handleSubmitClick = async (e) => {
        e.preventDefault();

        let fetchRoute = this.getFetchRoute();
        let ibeUrl = this.state.ibeUrl;

        try {
            let result = await startAutomation(fetchRoute, ibeUrl);
            this.setState({pnr: result.pnrInfo})
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }

    renderPnr = () => {
        if (this.state.pnr) {
            return <p>Last name: {this.state.pnr.lastName} PNR: {this.state.pnr.pnr} </p>
        }
    }

    render = () => {
        return(
            <div className="UserInput">
                <form>
                    <label>Local IBE URL</label>
                    <input placeholder="Enter your local IBE URL" onChange={this.handleIbeUrlChange} value={this.state.ibeUrl}></input>
                </form>
                <p>Where do you want the automation to stop?</p>
                <ul className="bookingFlowPageSelections">
                    {this.generateBookingFlowSelectionElements()}
                </ul>
                <button onClick={this.handleSubmitClick} disabled={!this.state.ibeUrl}>Submit</button>
                {this.renderPnr()}
            </div>
            
        )
    }
}

export default UserInput;