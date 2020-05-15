export const startAutomation = async (url, ibeUrl, journeyInfo) => {
    console.log('JourneyInformation: ', journeyInfo);

    let requestBody = {
        ibeUrl: ibeUrl,
        journeyInfo: journeyInfo
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }

    console.log('request in StartAutomation', request)

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

