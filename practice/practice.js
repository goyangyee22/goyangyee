const boxes = document.querySelectorAll(".box");
const imgBox = document.querySelector(".imageBox")

boxes.forEach((el) => {
    el.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("hovered");
    });
    el.addEventListener("dragleave", (e) => {
        e.currentTarget.classList.remove("hovered");
    })
    el.addEventListener("drop", (e) => {
        e.currentTarget.classList.remove("hovered");
        e.currentTarget.append(imgBox);
    })
}) 