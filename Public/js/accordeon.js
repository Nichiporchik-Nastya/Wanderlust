let accordeonItems = document.querySelectorAll(".accordion__item"),
    soderjItems = document.querySelectorAll(".soderj li"),
    answer = document.querySelectorAll(".accordion__text-block"),
    questions = document.querySelectorAll(".accordion__title-block"),
    answer_btns = document.querySelectorAll(".accordion__arrow");

questions.forEach((question, index) => {
    question.addEventListener('click', () => {
        // questions.forEach((q, i) => {
        //     answer[i].classList.remove('is_open');
        //     answer_btns[i].classList.remove('close');
        // });
        answer[index].classList.toggle('is_open');
        answer_btns[index].classList.toggle('close');
    });
});

// let elsToggle = document.querySelectorAll(".accordion__title-block"),
// elBlock = document.querySelectorAll(".accordion__text-block");

// elsToggle.forEach((elToggle, index) => {
//     elToggle.addEventListener("click", () => {
//         if (elBlock[index].style.height === "0px") {
//             elBlock[index].style.height = `${elBlock[index].scrollHeight}px`
//         } else {
//             elBlock[index].style.height = `${elBlock[index].scrollHeight}px`;
//             window.getComputedStyle(elBlock[index], null).getPropertyValue("height");
//             elBlock[index].style.height = "0";
//         }
//     });
// });


// function handleScroll() {
//     accordeonItems.forEach((element, index) => {
//         if (isInViewport(element)) {
//             soderjItems[index].style.color = 'red';

//         }
//     });
// }

// function isInViewport(element) {
//     let boundingBox = element.getBoundingClientRect();
//     return boundingBox.top < window.innerHeight / 2 && boundingBox.bottom >= 0;
// }

// window.addEventListener('scroll', handleScroll);