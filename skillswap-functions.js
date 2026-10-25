function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { filterSkillsByCategory };
}

function calculateTotalCosts(hourlyRate, hours) {
  return hourlyRate * hours;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports.calculateTotalCosts = calculateTotalCosts;
}
