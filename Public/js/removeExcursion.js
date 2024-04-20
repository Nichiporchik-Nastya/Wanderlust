async function RemoveSubmit(event) {
    try {
        event.preventDefault();
        let formData = new FormData();

        formData.append("id", Number(event.target.dataset.exid)); 

        let response = await fetch('/api/excursions/delete', { //объект отправки и получения запроса, путь прописывается без точки, так как бек и фронт находятся на одном ломене
            method: "POST",
            body: formData
        });

        let result = await response.json();
        if (result?.errors) {

            console.log(result.errors);

        } else {
            console.log(result);
            infoWindowWrapper.classList.remove("show-info-window");
            document.querySelector(`#excursion-${event.target.dataset.exid}`).remove();
        }
    } catch (error) {
        console.log(error);
    }
}