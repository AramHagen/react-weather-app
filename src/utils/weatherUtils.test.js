// Import Vitest functions
import { describe, it, expect, vi } from 'vitest';
import { getCorrectIcon, getDayAbbreviation } from './weatherUtils';

// Mock the icons data
vi.mock('../assets/icons.json', () => ({
  default: [
    {
      code: 1003,
      text: 'Partly cloudy',
      iconCode: 116,
      icons: ['./assets/icons/day/116.svg', './assets/icons/night/116.svg'],
    },
    {
      code: 1006,
      text: 'Cloudy',
      iconCode: 119,
      icons: ['./assets/icons/day/119.svg', './assets/icons/night/119.svg'],
    },
  ],
}));

// Tests for getDayAbbreviation
describe('getDayAbbreviation', () => {
  it('should return the correct day abbreviation for a given date', () => {
    const result = getDayAbbreviation('2024-12-09');
    expect(result).toBe('MON');
  });

  it('should return an empty string for invalid date input', () => {
    const result = getDayAbbreviation('invalid-date');
    expect(result).toBe('');
  });
});

// Tests for getCorrectIcon
describe('getCorrectIcon', () => {
  it('should return the correct day icon', () => {
    const apiData = { icon: '/day/', code: 1003 };
    const icon = getCorrectIcon(apiData);
    expect(icon).toBe('./assets/icons/day/116.svg');
  });

  it('should return the correct night icon', () => {
    const apiData = { icon: '/night/', code: 1006 };
    const icon = getCorrectIcon(apiData);
    expect(icon).toBe('./assets/icons/night/119.svg');
  });

  it('should return null if no matching icon is found', () => {
    const apiData = { icon: '/day/', code: 9999 };
    const icon = getCorrectIcon(apiData);
    expect(icon).toBeNull();
  });
});
