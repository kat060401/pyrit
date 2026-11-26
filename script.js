// Mobilmenu: åbner og lukker navigationen.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Åbn menu');
  menuButton.textContent = '☰';
}
menuButton.addEventListener('click', () => {
  if (navigation.classList.contains('is-open')) { closeMenu(); }
  else {
    navigation.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Luk menu');
    menuButton.textContent = '×';
  }
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// Søgefelt: enkel lokal søgning i de viste produktnavne.
const searchButton = document.querySelector('#search-toggle');
const searchPanel = document.querySelector('#search-panel');
const searchInput = document.querySelector('#search');
searchButton.addEventListener('click', () => {
  searchPanel.hidden = !searchPanel.hidden;
  searchButton.setAttribute('aria-expanded', String(!searchPanel.hidden));
  if (!searchPanel.hidden) searchInput.focus();
});
searchPanel.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  const products = [...document.querySelectorAll('.favorite h3, .collection h3')];
  const matches = query ? products.filter(product => product.textContent.toLowerCase().includes(query)) : [];
  document.querySelector('#search-result').textContent = !query ? 'Skriv et søgeord.' : matches.length ? matches.map(product => product.textContent).join(' · ') : 'Ingen match blandt de viste smykker.';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
    searchPanel.hidden = true;
    searchButton.setAttribute('aria-expanded', 'false');
  }
});

// Nyhedsbreve: demonstration af formularen, uden server eller mailingliste.
document.querySelectorAll('.newsletter-form, .footer-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('.form-message').textContent = 'Tak for din interesse! Dette er en demo – dine oplysninger er ikke sendt.';
    form.reset();
  });
});
