import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, phone, cpf, amount, paymentMethod, creditCard, creditCardHolderInfo } = body;

    if (!name || !email || !phone) {
      return json({ error: 'name, email e phone são obrigatórios' }, 400);
    }

    const paymentAmount = Number(amount || 47);
    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return json({ error: 'amount inválido' }, 400);
    }

    const supabase = createAdminClient();
    const asaas = createAsaasClient();

    const customerBody: Record<string, string> = {
      name,
      email,
      mobilePhone: phone,
    };
    if (cpf) {
      customerBody.cpfCnpj = cpf.replace(/\D/g, '');
    }

    const customer = await asaasRequest(asaas, '/customers', {
      method: 'POST',
      body: customerBody,
    });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 1);
    const dueDateIso = dueDate.toISOString().slice(0, 10);

    const isCreditCard = paymentMethod === 'CREDIT_CARD';

    const paymentBody: Record<string, any> = {
      customer: customer.id,
      billingType: isCreditCard ? 'CREDIT_CARD' : 'PIX',
      value: paymentAmount,
      dueDate: dueDateIso,
    };

    if (isCreditCard) {
      if (!creditCard || !creditCardHolderInfo) {
        return json({ error: 'Dados do cartão de crédito são obrigatórios' }, 400);
      }
      paymentBody.creditCard = creditCard;
      paymentBody.creditCardHolderInfo = creditCardHolderInfo;
      paymentBody.remoteIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
    }

    const payment = await asaasRequest(asaas, '/payments', {
      method: 'POST',
      body: paymentBody,
    });

    let pixData: any = {};
    if (!isCreditCard) {
      pixData = await asaasRequest(asaas, `/payments/${payment.id}/pixQrCode`, {
        method: 'GET',
      });
    }

    const dbStatus = (payment.status === 'CONFIRMED' || payment.status === 'RECEIVED') ? 'paid' : 'pending';

    const insertPayload = {
      buyer_name: name,
      buyer_email: email,
      buyer_phone: phone,
      amount: paymentAmount,
      status: dbStatus,
      asaas_customer_id: customer.id,
      asaas_payment_id: payment.id,
      asaas_payment_status: payment.status ?? 'PENDING',
      pix_payload: pixData.payload ?? null,
      pix_qr_base64: pixData.encodedImage ?? null,
      pix_expiration: pixData.expirationDate ?? null,
      due_date: dueDateIso,
      metadata: {
        invoiceUrl: payment.invoiceUrl ?? null,
        paymentMethod: isCreditCard ? 'CREDIT_CARD' : 'PIX'
      },
    };

    const { data: order, error } = await supabase
      .from('orders')
      .insert(insertPayload)
      .select('public_token, amount, pix_payload, pix_qr_base64, pix_expiration')
      .single();

    if (error) throw error;

    return json({
      orderToken: order.public_token,
      amount: order.amount,
      status: payment.status,
      pixPayload: order.pix_payload,
      qrCodeBase64: order.pix_qr_base64,
      expirationDate: order.pix_expiration,
    });
  } catch (error) {
    console.error(error);
    return json({ error: extractErrorMessage(error) }, 500);
  }
});

function createAdminClient() {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(url, key, { auth: { persistSession: false } });
}

function createAsaasClient() {
  const baseUrl = Deno.env.get('ASAAS_API_BASE_URL')!;
  const apiKey = Deno.env.get('ASAAS_API_KEY')!;
  if (!baseUrl || !apiKey) throw new Error('Secrets do Asaas ausentes');
  return { baseUrl, apiKey };
}

async function asaasRequest(client: { baseUrl: string; apiKey: string }, path: string, init: { method: string; body?: unknown }) {
  const response = await fetch(`${client.baseUrl}${path}`, {
    method: init.method,
    headers: {
      'Content-Type': 'application/json',
      'access_token': client.apiKey,
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.description || `Erro Asaas em ${path}`);
  }
  return data;
}

function extractErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null) return JSON.stringify(error);
  return String(error);
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}
