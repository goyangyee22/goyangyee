const boxes = document.querySelectorAll(".box");
const imgBox = document.querySelector(".imageBox")

boxes.forEach((box) => {
    box.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("hovered");
    });
    box.addEventListener("dragleave", (e) => {
        e.currentTarget.classList.remove("hovered");
    })
    box.addEventListener("drop", (e) => {
        e.currentTarget.classList.remove("hovered");
        e.currentTarget.append(imgBox);
    })
}) 