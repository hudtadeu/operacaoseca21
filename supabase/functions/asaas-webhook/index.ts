import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    validateWebhookToken(req);

    const body = await req.json();
    const event = body?.event;
    const payment = body?.payment;

    if (!event || !payment?.id) {
      return new Response('Payload inválido', { status: 400 });
    }

    const supabase = createAdminClient();
    const nextStatus = mapOrderStatus(event, payment.status);

    const updatePayload: Record<string, unknown> = {
      asaas_payment_status: payment.status ?? null,
      webhook_event_last: event,
    };

    if (nextStatus) {
      updatePayload.status = nextStatus;
    }

    if (nextStatus === 'paid') {
      updatePayload.paid_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('orders')
      .update(updatePayload)
      .eq('asaas_payment_id', payment.id);

    if (error) {
      console.error(error);
      return new Response('Erro ao atualizar pedido', { status: 500 });
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(error instanceof Error ? error.message : 'Erro', { status: 401 });
  }
});

function createAdminClient() {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(url, key, { auth: { persistSession: false } });
}

function validateWebhookToken(req: Request) {
  const expected = Deno.env.get('ASAAS_WEBHOOK_AUTH_TOKEN');
  if (!expected) throw new Error('Token do webhook não configurado');

  const received =
    req.headers.get('asaas-access-token') ||
    req.headers.get('Asaas-Access-Token') ||
    req.headers.get('authorization');

  if (!received) {
    throw new Error('Webhook sem token');
  }

  const normalized = received.replace(/^Bearer\s+/i, '').trim();
  if (normalized !== expected) {
    throw new Error('Token do webhook inválido');
  }
}

function mapOrderStatus(event: string, fallbackStatus?: string) {
  switch (event) {
    case 'PAYMENT_CONFIRMED':
    case 'PAYMENT_RECEIVED':
      return 'paid';
    case 'PAYMENT_OVERDUE':
      return 'expired';
    case 'PAYMENT_DELETED':
      return 'deleted';
    case 'PAYMENT_REFUNDED':
      return 'refunded';
    default:
      if (fallbackStatus === 'RECEIVED' || fallbackStatus === 'CONFIRMED') return 'paid';
      return null;
  }
}
