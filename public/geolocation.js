let formSubmitted = false;

// Automatically fetch user's geolocation on page load
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

// Success callback: Sets latitude and longitude, then auto-submits the form
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Set the latitude and longitude values in the hidden input fields
    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

     // Check if form is already submitted
     if (!formSubmitted) {
        formSubmitted = true;  // Mark as submitted to prevent future submissions
        document.getElementById('locationForm').submit();  // Submit the form
    }
}

// Error callback: Handle errors if geolocation fails
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
