setInterval(() => {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const seconds = today.getSeconds();
    const timeString = 'Current Time: ' + hour + ":" + minute + ":" + seconds;
    document.getElementById("displayTime").textContent = timeString;
}, 1000);