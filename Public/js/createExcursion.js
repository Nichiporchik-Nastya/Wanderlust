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

        let p = document.querySelector("#photo-input");

        if (formData.get("filesCount")) {
            formData.delete("filesCount");
            formData.append("filesCount", preview.childElementCount);
        } else {
            formData.append("filesCount", preview.childElementCount);
        }

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
            document.querySelector(".status").innerHTML = "Экскурсия создана";
            document.querySelector(".status").classList.add("show-status");
            setTimeout(function () { window.location.href = "/guide-dashbord"; }, 2000);

        }
    } catch (error) {
        console.log(error);
    }
}