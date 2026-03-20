// Exemplo para usar na sua landing atual.
// Captura dados e envia para o checkout white label.

const form = document.getElementById('checkout-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const checkoutUrl = new URL('/checkout.html', window.location.origin);

    checkoutUrl.searchParams.set('name', String(formData.get('name') || ''));
    checkoutUrl.searchParams.set('email', String(formData.get('email') || ''));
    checkoutUrl.searchParams.set('phone', String(formData.get('phone') || ''));
    checkoutUrl.searchParams.set('amount', String(formData.get('amount') || '47'));

    window.location.href = checkoutUrl.toString();
  });
}
