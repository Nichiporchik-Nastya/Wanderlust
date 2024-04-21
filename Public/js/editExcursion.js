async function EditExcursionSubmit(event) {
    try {
        event.preventDefault();
        let formData = new FormData(event.target);

        startTimes.forEach(time => {
            formData.append("startTimes", time);
        });

        deletedStartTime.forEach(time => {
            formData.append("deletedStartTime", time);
        });

        fileList.forEach(file => {
            formData.append("photos", file);
        });

        deletedPhotos.forEach(time => {
            formData.append("deletedPhotos", time);
        });

        if (formData.get("childCost") == "") {
            formData.delete("childCost");
        }

        if (formData.get("extraInfo") == "") {
            formData.delete("extraInfo");
        }

        if (formData.get("startTime") == "") {
            formData.delete("startTime");
        }

        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        let response = await fetch('/api/excursions/edit', {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        console.log(result)
        if (result?.errors) {

            console.log(result.errors);

            document.querySelectorAll(".box-input__error-text").forEach(err => {
                err.innerText = "";
            });

            result.errors.forEach(error => {
                document.querySelector(`.${error.path}-error`).innerText = error.msg;
            });


        } else {
            document.querySelector(".status").innerHTML = "Экскурсия отредактирована";
            document.querySelector(".status").classList.add("show-status");
            setTimeout(function () { window.location.href = "/guide-dashbord"; }, 2000);

        }
    } catch (error) {
        console.log(error);
    }
}