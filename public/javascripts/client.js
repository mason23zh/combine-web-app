(function () {
    const noGeolocation = function () {
        console.log('cant find location.');
    };

    if (!navigator.geolocation || !document.querySelector) {
        noGeolocation();
    } else {
        document.getElementById("display-weather-form").submit();
        navigator.geolocation.getCurrentPosition((position) => {
            document.querySelector("#latitude").value = position.coords.latitude;
            document.querySelector("#longitude").value = position.coords.longitude;
        }, (err) => {
            noGeolocation();
        })
    }
})