import React, { Component } from 'react';
import './UserInput.css';
import { startFullBooking } from './util/apiCalls.js';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stopBookingFlowPage: null,
            pnr: null
        };
        this.bookingFlowPages = [
            "Flight Select",
            "Passenger Info",
            "Seat Select",
            "Bundles",
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

    handleSubmitClick = async (e) => {
        e.preventDefault();

        try {
            let result = await startFullBooking();
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
                <p>Where do you want the automation to stop?</p>
                <ul className="bookingFlowPageSelections">
                    {this.generateBookingFlowSelectionElements()}
                </ul>
                <button onClick={this.handleSubmitClick}>Submit</button>
                {this.renderPnr()}
            </div>
            
        )
    }
}

export default UserInput;