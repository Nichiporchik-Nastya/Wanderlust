async function CreateExcursionSubmit(event) {
    try {
        event.preventDefault();
        let formData = new FormData(event.target);

        startTimes.forEach(time => {
            formData.append("startTimes", time);
        });

        fileList.forEach(file => {
            formData.append("photos", file);
        });

        if (formData.get("childCost") == "") {
            formData.delete("childCost");
        }

        if (formData.get("extraInfo") == "") {
            formData.delete("extraInfo");
        }

        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value); 
        // }
        

        let response = await fetch('/api/excursions/create', { //объект отправки и получения запроса, путь прописывается без точки, так как бек и фронт находятся на одном ломене
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
            console.log("Экскурсия создана");
            // window.location.href = "/ ";
        }
    } catch (error) {
        console.log(error);
    }
}