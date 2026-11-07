const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last modified: ${new Date(document.lastModified).toLocaleString()}`;

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute(
    'aria-label',
    isExpanded ? 'Open navigation menu' : 'Close navigation menu'
  );
  menuToggle.textContent = isExpanded ? '☰' : '×';
  navigation.classList.toggle('is-open', !isExpanded);
});