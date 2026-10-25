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
const skillGrid = document.querySelector('.skill-grid');

skillGrid.insertAdjacentHTML('beforeend', `
  <article class="skill-card">
    <h3>Guitar Lessons</h3>
    <p>Learn basic chords and play simple songs.</p>
    <p><strong>Provider:</strong> Chris Taylor</p>
    <p><strong>Price:</strong> $15/hour</p>
  </article>
  <article class="skill-card">
    <h3>Resume Review</h3>
    <p>Get feedback on your resume before applying for jobs.</p>
    <p><strong>Provider:</strong> Morgan Davis</p>
    <p><strong>Price:</strong> Free</p>
  </article>
`);

const categories = [
  'Programming', 'Education', 'Languages', 'Music', 'Career'
];
const prices = [20, 15, 18, 15, 0];

const skills = Array.from(
  skillGrid.querySelectorAll('.skill-card')
).map((card, index) => ({
  title: card.querySelector('h3').textContent,
  category: categories[index],
  price: prices[index],
  element: card
}));

const filterButtons = document.querySelectorAll('[data-category]');

filterButtons.forEach(button => {
  button.setAttribute('aria-pressed', String(button.dataset.category === 'All'));

  button.addEventListener('click', () => {
    const matches = filterSkillsByCategory(skills, button.dataset.category);

    skills.forEach(skill => {
      skill.element.style.display = matches.includes(skill) ? '' : 'none';
    });

    filterButtons.forEach(filterButton => {
      filterButton.setAttribute('aria-pressed', String(filterButton === button));
    });

    document.getElementById('filter-message').textContent =
      matches.length === 0 ? 'No skills found in this category.' :
      `${matches.length} skill(s) found.`;
  });
});
