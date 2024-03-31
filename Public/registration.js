async function RegistrationSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await fetch('/api/admin/registration', { //объект отправки и получения запроса, путь прописывается без точки, так как бек и фронт находятся на одном ломене
        method: "POST",
        body: formData
    });

    let result = await response.json();
    if(result.errors){
        console.log(result.errors[0]);
    } else console.log("Регистрация прошла успешно");
}