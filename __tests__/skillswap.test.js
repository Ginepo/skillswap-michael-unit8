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

describe('matchSkillsToUser', () => {
  const { matchSkillsToUser } = require('../skillswap-functions');

  test('matches category and budget', () => {
    const needs = { category: 'Programming', maxPrice: 30 };
    expect(matchSkillsToUser(needs, skills)).toEqual([
      skills[0], skills[3]
    ]);
  });

  test('includes the maximum price and excludes higher prices', () => {
    const needs = { category: 'Programming', maxPrice: 20 };
    expect(matchSkillsToUser(needs, skills)).toEqual([skills[0]]);
  });

  test('returns an empty array when no skills match', () => {
    const needs = { category: 'Cooking', maxPrice: 100 };
    expect(matchSkillsToUser(needs, skills)).toEqual([]);
  });

  test('includes free skills with a zero budget', () => {
    const needs = { category: 'Career', maxPrice: 0 };
    expect(matchSkillsToUser(needs, skills)).toEqual([skills[2]]);
  });
});
