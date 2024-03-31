async function LoginSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await fetch('/auth/api/login', { 
        method: "POST",
        body: formData
    });

    let result = await response.json();
    if(result.errors){
        console.log(result.errors[0]);
    } else console.log("Выполнен вход");
}