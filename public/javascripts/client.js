console.log('this is a client js test ');
if ('geolocation' in navigator) {
    console.log('geolocation avaiable');
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        document.getElementById('latitude').textContent = position.coords.latitude;
        document.getElementById('longitude').textContent = position.coords.longitude;

        const data = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch('/', options);
    })
} else {
    console.log('location not avaiable');
}