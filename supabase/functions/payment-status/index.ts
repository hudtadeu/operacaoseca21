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
    const url = new URL(req.url);
    const order = url.searchParams.get('order');

    if (!order) {
      return json({ error: 'order é obrigatório' }, 400);
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('orders')
      .select('public_token, buyer_name, buyer_email, buyer_phone, status, released_to_typebot')
      .eq('public_token', order)
      .single();

    if (error || !data) {
      return json({ error: 'Pedido não encontrado' }, 404);
    }

    const typebotBaseUrl = Deno.env.get('TYPEBOT_URL') || '';
    const typebotUrl = data.status === 'paid'
      ? `${typebotBaseUrl}?nome=${encodeURIComponent(data.buyer_name)}&email=${encodeURIComponent(data.buyer_email)}&telefone=${encodeURIComponent(data.buyer_phone)}`
      : null;

    return json({
      status: data.status,
      buyer: {
        name: data.buyer_name,
        email: data.buyer_email,
        phone: data.buyer_phone,
      },
      typebotUrl,
    });
  } catch (error) {
    console.error(error);
    return json({ error: 'Erro ao consultar pedido' }, 500);
  }
});

function createAdminClient() {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(url, key, { auth: { persistSession: false } });
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
