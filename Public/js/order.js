async function OrderSubmit(event) {
    try {
        event.preventDefault();
        let formData = new FormData(event.target);

        // formData.append("adultCost", Number(clientCountCounts[0].innerText));


        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
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
            console.log("Ошибок нет");
            // window.location.href = "/ ";
        }
    } catch (error) {
        console.log(error);
    }
}