// let accordeonItems = document.querySelectorAll(".accordion__item"),
//     soderjItems = document.querySelectorAll(".soderj li"),
//     answer = document.querySelectorAll(".accordion__text-block"),
//     questions = document.querySelectorAll(".accordion__title-block"),
//     answer_btns = document.querySelectorAll(".accordion__arrow");

// questions.forEach((question, index) => {
//     question.addEventListener('click', () => {
//         // questions.forEach((q, i) => {
//         //     answer[i].classList.remove('is_open');
//         //     answer_btns[i].classList.remove('close');
//         // });
//         answer[index].classList.toggle('is_open');
//         answer_btns[index].classList.toggle('close');
//     });
// });

let accordionItemsheads = document.querySelectorAll(".accordion__title-block"),
    accordionItemsBodys = document.querySelectorAll(".accordion__text-block"),
    answer_btns = document.querySelectorAll(".accordion__arrow");

accordionItemsheads.forEach((item, index) => {
    accordionItemsBodys[index].style.maxHeight = "100%";

    item.addEventListener("click", () => {
        answer_btns[index].classList.toggle('close');
        if (accordionItemsBodys[index].style.maxHeight) {
            accordionItemsBodys[index].style.maxHeight = null;
        } else {
            accordionItemsBodys[index].style.maxHeight = "100%"; //accordionItemsBodys[index].scrollHeight + "px"
        }
    });
});


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