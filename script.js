// AI-assisted skill card interaction, created with ChatGPT assistance.
const detailButtons = document.querySelectorAll(".details-button");

detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const detailsId = button.getAttribute("aria-controls");
        const details = document.getElementById(detailsId);

        if (!details) {
            return;
        }

        const isExpanded = button.getAttribute("aria-expanded") === "true";

        details.hidden = isExpanded;
        button.setAttribute("aria-expanded", String(!isExpanded));
        button.textContent = isExpanded ? "Show details" : "Hide details";
    });
});