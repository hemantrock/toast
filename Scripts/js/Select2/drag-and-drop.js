document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("sortable-list");
    let draggedItem = null;

    list.addEventListener("dragstart", (event) => {
        draggedItem = event.target;
        event.target.classList.add("dragging");
    });

    list.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging");
    });

    list.addEventListener("dragover", (event) => {
        event.preventDefault();
        const afterElement = getDragAfterElement(list, event.clientY);
        const draggingItem = list.querySelector(".dragging");

        if (afterElement == null) {
            list.appendChild(draggingItem);
        } else {
            list.insertBefore(draggingItem, afterElement);
        }
    });

    function getDragAfterElement(list, y) {
        const items = [...list.querySelectorAll("li:not(.dragging)")];

        return items.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
