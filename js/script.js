const promoButton = document.querySelector('#promoButton');
const promoText = document.querySelector('.promo-text');

promoButton.addEventListener('click', () => {
    if (promoText.style.display === 'block') {
        promoText.style.display = 'none';
        promoButton.textContent = 'Lihat promo hari ini';
    } else {
        promoText.style.display = 'block';
        promoButton.textContent = 'Tutup promo';
    }
});