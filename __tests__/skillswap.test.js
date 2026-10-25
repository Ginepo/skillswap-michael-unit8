const { filterSkillsByCategory } = require('../skillswap-functions');

const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

describe('filterSkillsByCategory', () => {
  test('filters skills by category', () => {
    expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
      skills[0], skills[3]
    ]);
  });

  test('returns all skills for All', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns an empty array when no skills match', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });
});

describe('calculateTotalCosts', () => {
  const { calculateTotalCosts } = require('../skillswap-functions');

  test('calculates the cost for different rates and hours', () => {
    expect(calculateTotalCosts(20, 2)).toBe(40);
    expect(calculateTotalCosts(15, 3)).toBe(45);
  });

  test('handles free sessions', () => {
    expect(calculateTotalCosts(0, 3)).toBe(0);
  });

  test('handles zero hours', () => {
    expect(calculateTotalCosts(20, 0)).toBe(0);
  });

  test('calculates decimal hours', () => {
    expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
  });
});
