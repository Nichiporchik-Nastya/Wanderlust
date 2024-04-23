async function OrderSubmit(event) {
    try {
        event.preventDefault();
        let formData = new FormData(event.target);
        let orderDay = document.querySelector(".isOrderDay.selected");
        if (!orderDay) {
            document.querySelector(`.orderDay-error`).innerText = "Выберите один из доступных дней";
        }
        formData.append('day', orderDay.dataset.caldate);
        
        // formData.append("adultCost", Number(clientCountCounts[0].innerText));


        // for (let [key, value] of formData.entries()) {
        //      console.log(key, value);
        // }

        let response = await fetch('/api/excursions/order', { //объект отправки и получения запроса, путь прописывается без точки, так как бек и фронт находятся на одном ломене
            method: "POST",
            body: formData
        });

        let result = await response.json();
        if (result?.errors) {

            console.log(result.errors);

            document.querySelectorAll(".box-input__error-text").forEach(err => {
                err.innerText = "";
            });

            result.errors.forEach(error => {
                document.querySelector(`.${error.path}-error`).innerText = error.msg;
            });


        } else {
            document.querySelector(".status").innerHTML = "Заказ успешно оформлен. Менеджер савяжется с вами в ближайшее время";
            document.querySelector(".status").classList.add("show-status");
            setTimeout(() => document.querySelector(".status").classList.remove("show-status"), 3000);
        }
    } catch (error) {
        console.log(error);
    }
}