const config = window.APP_CONFIG;
if (!config) throw new Error('APP_CONFIG não encontrado. Crie assets/js/config.js');

const params = new URLSearchParams(window.location.search);
const order = params.get('order');

const message = document.getElementById('message');
const btn = document.getElementById('goTypebotBtn');
const buyerName = document.getElementById('buyerName');
const buyerEmail = document.getElementById('buyerEmail');
const buyerStatus = document.getElementById('buyerStatus');

init().catch((error) => {
  console.error(error);
  message.textContent = 'Não foi possível validar seu acesso.';
});

async function init() {
  if (!order) {
    message.textContent = 'Pedido inválido.';
    return;
  }

  const response = await fetch(`${config.FUNCTIONS_BASE_URL}/payment-status?order=${encodeURIComponent(order)}`, {
    headers: {
      'apikey': config.SUPABASE_KEY,
      'Authorization': `Bearer ${config.SUPABASE_KEY}`
    }
  });
  const data = await response.json();

  buyerName.textContent = data.buyer?.name || '-';
  buyerEmail.textContent = data.buyer?.email || '-';
  buyerStatus.textContent = data.status || '-';

  if (data.status !== 'paid' || !data.typebotUrl) {
    message.textContent = 'Seu pagamento ainda não foi validado totalmente. Atualize a página em instantes.';
    return;
  }

  message.textContent = 'Seu acesso está liberado. Toque no botão abaixo para seguir.';
  btn.classList.remove('hidden');
  btn.addEventListener('click', () => {
    window.location.href = data.typebotUrl;
  });
}
