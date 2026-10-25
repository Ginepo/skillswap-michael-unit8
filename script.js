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

const calculatorSection = document.createElement('section');
calculatorSection.id = 'calculator';
calculatorSection.innerHTML = `
  <h2>Session Cost Calculator</h2>
  <form id="cost-form">
    <p>
      <label for="hourly-rate">Hourly rate ($)</label>
      <input id="hourly-rate" type="number" min="0" step="0.01" required>
    </p>
    <p>
      <label for="session-hours">Hours</label>
      <input id="session-hours" type="number" min="0" step="0.01" required>
    </p>
    <button type="submit">Calculate Cost</button>
  </form>
  <p id="cost-result" role="status"></p>
`;

document.querySelector('main').insertBefore(
  calculatorSection,
  document.getElementById('offer')
);

document.getElementById('cost-form').addEventListener('submit', event => {
  event.preventDefault();

  const rate = Number(document.getElementById('hourly-rate').value);
  const hours = Number(document.getElementById('session-hours').value);
  const total = calculateTotalCosts(rate, hours);

  document.getElementById('cost-result').textContent =
    `Total cost: $${total.toFixed(2)}`;
});

const matchSection = document.createElement('section');
matchSection.id = 'matcher';
matchSection.innerHTML = `
  <h2>Find My Match</h2>
  <form id="match-form">
    <p>
      <label for="match-category">Category</label>
      <select id="match-category">
        <option>Programming</option>
        <option>Music</option>
        <option>Career</option>
        <option>Education</option>
        <option>Languages</option>
      </select>
    </p>
    <p>
      <label for="match-budget">Maximum hourly price ($)</label>
      <input id="match-budget" type="number" min="0"
             step="0.01" required>
    </p>
    <button type="submit">Find My Match</button>
  </form>
  <div id="match-results" role="status"></div>
`;

document.querySelector('main').insertBefore(
  matchSection,
  document.getElementById('offer')
);

document.getElementById('match-form').addEventListener('submit', event => {
  event.preventDefault();

  const needs = {
    category: document.getElementById('match-category').value,
    maxPrice: Number(document.getElementById('match-budget').value)
  };

  const matches = matchSkillsToUser(needs, skills);
  const results = document.getElementById('match-results');
  results.replaceChildren();

  if (matches.length === 0) {
    results.textContent = 'No skills match your category and budget.';
    return;
  }

  matches.forEach(skill => {
    const item = document.createElement('p');
    const price = skill.price === 0 ? 'Free' : `$${skill.price}/hour`;
    item.textContent = `${skill.title} - ${price}`;
    results.appendChild(item);
  });
});
