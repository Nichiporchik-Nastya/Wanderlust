async function LoginSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.target),
        emailErrArr = [], passwordErrArr = [];

    let response = await fetch('/auth/api/login', {
        method: "POST",
        body: formData
    });

    let result = await response.json();
    if (result?.errors) {

        console.log(result.errors);
        result.errors.forEach(error => {
            if (error.path == "email") emailErrArr.push(error.msg);
            else if(!error.msg.includes("required")) passwordErrArr.push(error.msg);

            document.querySelector(`.email-error`).innerText = (emailErrArr[0] ?? " ");
            document.querySelector(`.password-error`).innerText = (passwordErrArr[0] ?? " ");
        });
        emailErrArr = [], passwordErrArr = []
    } else {
        window.location.href = "/dashbord";
    }
}