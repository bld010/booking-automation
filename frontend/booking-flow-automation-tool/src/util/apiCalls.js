export const startFullBooking = async () => {
    const url = 'http://localhost:3001/fullBooking';
    let result = await fetch(url);
    if (!result.ok) {
        throw new Error("There was an error starting the automation process.")
    } else {
        let data = await result.json();
        console.log('apiCalls data response:', data);
        return data;
    }
}