function isInViewport(element) {
    let boundingBox = element.getBoundingClientRect();
    return boundingBox.top < window.innerHeight / 2 && boundingBox.bottom >= 0;
}

let accordionItems = document.querySelectorAll(".accordion__item");

function handleScroll() {
    
    accordionItems.forEach(item => {
        if (isInViewport(item)) {
            console.log(item.dataset.accitemindex);
            accordeonTabs.forEach(elemnt => {
                elemnt.classList.remove('active');
            });
            accordeonTabs[item.dataset.accitemindex].classList.add("active");
        }
    });
}




handleScroll();