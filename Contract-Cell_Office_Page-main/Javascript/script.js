
function updateDateAndTime() {
    var dateElement = document.getElementById("dateq");
    var timeElement = document.getElementById("timeq");
    var wishElement = document.getElementById("wish");
    var wishElement2 = document.getElementById("wish2")
    var notesElement = document.getElementById("notes");
    var list1Element = document.getElementById("list1");
    var list2Element = document.getElementById("list2");

    // Make a request to the WorldTimeAPI to get the current time
    fetch("https://worldtimeapi.org/api/ip")
        .then(response => response.json())
        .then(data => {
            var datetime = new Date(data.utc_datetime);

            var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            var timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            var hour = datetime.getHours();
            var minute = datetime.getMinutes();
            var second = datetime.getSeconds();
            var day = datetime.getDay();

            // Update wish & Office  message Start******************************************************
            let msg = '';
            let msg2 = '';

            if (day === 0) {
                msg = `Office remains closed on Sundays. Wishing you a great weekend!`
            }
            else if (hour >= 0 && hour <= 4) {
                msg = 'Office Closed!';
            } else if (hour >= 5 && hour <= 11) {  // 5 AM to 11 AM
                msg = 'Good Morning. Have a Nice Day!';
            } else if (hour == 12) {  // 12 PM to 1 PM 
                msg = 'Good Afternoon!';
            } else if (hour == 13) {  // Nested if condition, - if hour = 8 then it will check minutes
                if (minute >= 0 && minute <= 29) {
                    msg2 = `Contract cell is going to close in just a short while.`
                    wishElement2.style.color = `orange`
                }
                else {
                    msg = `Office Closed!`;
                }

            } else if (hour == 14) {
                msg = `Office Closed For Lunch Break.`  // workin fine
            } else if (hour == 15 && minute <= 29) {
                msg = `Office Closed for Lunch Break. Re-Open at 03:30 PM`

            } else if (hour == 15 && minute >= 30 && minute <= 59) {      // 03:30 to 4 PM
                msg = 'Good Afternoon!';
            } else if (hour == 16) {  // 4 PM to 5 PM
                msg = 'Good Afternoon!';
            } else if (hour == 17) {  // 5 PM  to 6 PM
                msg = 'Good Evening!';
            } else if (hour == 18 && minute <= 29) {
                msg = `Good Evening!`  // 6 PM to 6:30 PM
            } else if (hour == 18) {  // Nested if condition, - if hour = 8 then it will check minutes
                if (minute >= 30 && minute <= 40) {
                    msg2 = `Contract cell is going to close in just a short while.`
                    wishElement2.style.color = `orange`

                }
                else {
                    msg = `Office Closed!`;
                }
            } else if (hour >= 19 && hour <= 24) {
                msg = `Office Closed!`
            } 
            // for any other holidays just comment the below lines and write msg in html part in the wish box
            wishElement.textContent = msg;
            wishElement2.textContent = msg2;
            

            // Update wish & Office  message End************************************************************


            // Format date
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var formattedDate = `${days[day]}, ${datetime.toLocaleDateString(undefined, dateOptions)}`;
            dateElement.textContent = formattedDate;

            // Format time
            var ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12 || 12; // Convert to 12-hour format
            var formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')} ${ampm}`;
            timeElement.textContent = formattedTime;

        })
        .catch(error => {
            console.error("Error fetching data: " + error);
        });
}

// Update the date and time every second
setInterval(updateDateAndTime, 1000);

// Initial call to display the date and time immediately
updateDateAndTime();
