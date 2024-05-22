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

getCalendarDays().then(value => renderCalendar(value));
getCalendarDays().then(value => canSelectday());



const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    month = date.getMonth();

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
    // return;

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
        count = 0;


        value.days.forEach(el => {
            if (dayOfWeek == el.dayNumber) {
                let checkingdate = new Date(currYear, currMonth, i + 1)
                const formattedDate = checkingdate.toISOString().slice(0, 10);

                value.daysResult.forEach(element => {
                    
                    if (formattedDate === element.day) {
                        count = element.count;
                        strtTmId = document.querySelector('input[type="radio"][name="startTimeId"]:checked').dataset.sttid;
                        if (strtTmId === String(element.startTimeId)) {
                            if (element.count >= value.maxCount) {

                                console.log("нет свободных мест");
                            }
                        }
                        isOrderDay = "isOrderDay";
                        return;
                    }
                });
                isOrderDay = "isOrderDay";
            }

        });




        console.log(value.daysResult);

        // console.log();

        if (!(value.maxCount - count)) {
            isOrderDay = "";
        }

        liTag += `<li class="${isToday} ${isOrderDay}" data-caldate="${calDate}" data-orderscount="${value.maxCount - count}">${i}</li>`;
        isOrderDay = "";
        count = 0;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerHTML = `<strong>${months[currMonth]},</strong> ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}


prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {

        if (month === currMonth) {
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
    });
});

const canSelectday = () => {
    let daysLi = document.querySelectorAll(".isOrderDay");
    daysLi.forEach(element => {
        element.addEventListener("click", async () => {
            console.log(element.innerText);
            daysLi.forEach(element => {
                element.classList.remove("selected");
            });
            element.classList.add("selected");

            let response = await fetch(`/api/excursions/places/${document.querySelector('#excursionId').value}/${element.dataset.caldate}`);

            let result = await response.json();
            document.querySelector('.free-places').innerHTML = 'Доступно мест: '+ result;
            element.dataset.orderscount = result;
            document.querySelectorAll('.count-error').forEach(el => {
                el.innerHTML = '';
            })

            if (!(element.dataset.orderscount)) {
                document.querySelector(".status").innerText = "на эти день и время доступно мест: " + element.dataset.orderscount;
                document.querySelector(".status").classList.add("show-status");
                setTimeout(() => document.querySelector(".status").classList.remove("show-status"), 3000);
            }



            ////////////не удалять!!!!!!!!!!!!!!!!!!!!!!!!///////////


            // let startTimesstrs = document.querySelectorAll('label[for^="startTime-"]');
            // const currentTime = new Date(); 
            // const modifiedTime = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000); //бронирование за 2 часа до начала

            // startTimesstrs.forEach(element => {
            //     let timeParts = element.innerText.split(":");
            //     let time = new Date();
            //     time.setHours(parseInt(timeParts[0], 10));
            //     time.setMinutes(parseInt(timeParts[1], 10));

            //     console.log(time, modifiedTime);

            //     if (time < modifiedTime) {
            //         element.remove();
            //         document.querySelector(`#${element.getAttribute("for")}`).remove();
            //     }
            // });



        });
    });
};




