# operacaoseca21

Projeto organizado da **Operação Seca 21** com:

- landing page em **HTML base + conteúdo renderizado em JavaScript**
- checkout white label em **JavaScript**
- página de obrigado em **JavaScript**
- backend serverless com **Supabase Edge Functions**
- pagamentos via **Asaas API (Pix)**
- liberação do **Typebot** somente após pagamento confirmado

## Estrutura

```text
operacaoseca21/
  frontend/
    index.html
    checkout.html
    obrigado.html
    assets/
      css/
        styles.css
      js/
        config.example.js
        config.js
        landing.js
        checkout.js
        obrigado.js
        landing-snippet.js
  supabase/
    migrations/
      001_init.sql
    functions/
      create-payment/
        index.ts
      payment-status/
        index.ts
      asaas-webhook/
        index.ts
```

## O que foi feito

### Landing page
- o HTML principal virou uma página base (`frontend/index.html`)
- todo o conteúdo da landing está em `frontend/assets/js/landing.js`
- estilos extras e ajustes foram para `frontend/assets/css/styles.css`
- os CTAs agora abrem um **modal de captura** com:
  - nome
  - e-mail
  - telefone
- ao enviar, o usuário segue para `checkout.html` com os dados na URL

### Checkout
- mantém a lógica white label em `frontend/checkout.html`
- o JavaScript está em `frontend/assets/js/checkout.js`
- valor padrão ajustado para **R$ 59,00**
- produto ajustado para **Operação Seca 21**

### Obrigado
- valida novamente o pedido antes de liberar o Typebot
- lógica em `frontend/assets/js/obrigado.js`

## Configuração do frontend

Edite `frontend/assets/js/config.js` com os dados do seu projeto Supabase:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `FUNCTIONS_BASE_URL`

## Fluxo

1. Usuária acessa `index.html`
2. Clica em um CTA
3. Preenche o modal
4. Vai para `checkout.html`
5. O frontend chama `create-payment`
6. O Asaas gera a cobrança Pix
7. O frontend mostra QR Code e copia e cola
8. O webhook do Asaas atualiza o pedido no Supabase
9. Quando o status vira `paid`, a usuária vai para `obrigado.html`
10. A página de obrigado libera o botão para o Typebot

## Observações

- o projeto está preparado para **Pix próprio white label**
- cartão não foi incluído nesse starter
- se quiser, o próximo passo é adaptar textos, valor, datas e Typebot final
