// Fetch icons.json and return correct icon
import iconsData from '../assets/icons.json';

export function getCorrectIcon(apiData) {
  if (!iconsData) return null;

  const isDay = apiData.icon.includes('/day/');
  const match = iconsData.find((item) => item.code == apiData.code);

  return match ? (isDay ? match.icons[0] : match.icons[1]) : null;
}

export function getDayAbbreviation(dateInput) {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  let date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else {
    console.error('Invalid date input:', dateInput);
    return '';
  }

  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateInput);
    return '';
  }
  return daysOfWeek[date.getUTCDay()]; // Always use UTC to avoid timezone issues
}
