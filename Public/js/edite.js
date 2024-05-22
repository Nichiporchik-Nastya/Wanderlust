async function EditeSubmit(event) {
    try {
        event.preventDefault();
        let formData = new FormData(event.target);

        // let rand = (Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)), path;

        // fileList.forEach(file => {
        //     formData.append("photos", file); 
        // });

        // path = '/public/guideImages/' + rand + formData.get("photos").name;

        // formData.append("imgSRC", path);

        for (let [key, value] of formData.entries()) {
            console.log(key, value); 
        }

        let response = await fetch('/api/guide/edite/', { //объект отправки и получения запроса, путь прописывается без точки, так как бек и фронт находятся на одном ломене
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
            document.querySelector(".status").innerHTML = "Редактирование прошло успешно";
            document.querySelector(".status").classList.add("show-status");
            setTimeout(function () { window.location.href = "/dashbord"; }, 2000);

        }
    } catch (error) {
        console.log(error);
    }
}