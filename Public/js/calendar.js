let calendayDaysArr = [];
async function getCalendarDays() {
    let formData = new FormData();
    formData.append("excursionId", excursionId.value);

    let response = await fetch('/api/excursions/getExcursionDays', {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    if (result.errors) {
        console.log(result.errors[0]);
    } else {
        return result;
    }

}

// calendayDaysArr = getCalendarDays().then();
// console.log(Promise.resolve(calendayDaysArr)[0]);

getCalendarDays().then(value => renderCalendar(value));
getCalendarDays().then(value => canSelectday());




const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    month = date.getMonth();

// storing full name of all months in array
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const renderCalendar = (value) => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),  //номер дня недели, начиная с 0
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(),
        curDate = new Date().getDate();
    let liTag = "";

    // console.log(value);

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    let calDate, isOrderDay, i = 1;

    if (month === currMonth) {
        for (i = firstDayofMonth; i < curDate; i++) {
            liTag += `<li class="inactive">${i}</li>`;
        }
        i = curDate;
    }

    for (i; i <= lastDateofMonth; i++) { // creating li of all days of current month

        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";

        calDate = new Date(currYear, currMonth, i);
        dayOfWeek = calDate.getDay();
        dayOfWeek++;

        value.forEach(element => {
            if (dayOfWeek == element.dayNumber) {
                isOrderDay = "isOrderDay";
            }
        });

        liTag += `<li class="${isToday} ${isOrderDay}" data-caldate="${calDate}">${i}</li>`;
        isOrderDay = "";
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerHTML = `<strong>${months[currMonth]},</strong> ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
// document.querySelector("#prev").style.opacity = 0.2;

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        // if (icon.id === "next") {
        //     document.querySelector("#prev").style.opacity = 1;
        // }

        if (month === currMonth) {
            // document.querySelector("#prev").style.opacity = 0.2;
            currMonth = icon.id === "next" ? currMonth + 1 : currMonth;
        } else {
            document.querySelector("#prev").style.opacity = 1;
            if (Math.abs(currMonth - month) < 3) {
                currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
            } else {
                currMonth = icon.id === "prev" ? currMonth - 1 : currMonth;
            }

        }


        if (currMonth < 0 || currMonth > 11) {

            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date(); // pass the current date as date value
        }
        getCalendarDays().then(value => renderCalendar(value));
        getCalendarDays().then(value => canSelectday());

        // renderCalendar(); // calling renderCalendar function
    });
});

const canSelectday = () => {

    let daysLi = document.querySelectorAll(".isOrderDay");
    daysLi.forEach(element => {
        element.addEventListener("click", () => {
            console.log(element.innerText);
            daysLi.forEach(element => {
                element.classList.remove("selected");
            });
            element.classList.add("selected");

        });
    });

};



