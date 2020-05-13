export const startAutomation = async (url, ibeUrl, flightInformation) => {
    console.log('FlightInformation from UserInput state: ', flightInformation);

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ibeUrl: ibeUrl})
    }

    console.log('request body in StartAutomation', request)

    let result = await fetch(url, request);
    console.log('result in apiCalls', result)
    if (!result.ok) {
        throw new Error("There was an error starting the automation process.")
    } else {
        let data = await result.json();
        console.log('apiCalls data response:', data);
        return data;
    }
}

