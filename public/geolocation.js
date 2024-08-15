window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function success(position) {
    if (position && position.coords) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        
        // Set latitude and longitude in the hidden input fields
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;
    } else {
        console.error('Position object or coords not available');
    }
}

function error(error) {
    console.log("Unable to retrieve location.");
    console.warn(`ERROR(${error.code}): ${error.message}`);
    alert(`${error.message}`)
}

// Handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent form from submitting immediately
    
    const city = document.getElementById('city').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    // Perform your form submission logic here, e.g., send the data to a server
    console.log(`City: ${city}, Latitude: ${latitude}, Longitude: ${longitude}`);
}