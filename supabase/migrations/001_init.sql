create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  public_token text not null unique default encode(gen_random_bytes(18), 'hex'),
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  amount numeric(10,2) not null,
  currency text not null default 'BRL',
  status text not null default 'pending',
  released_to_typebot boolean not null default false,
  asaas_customer_id text,
  asaas_payment_id text unique,
  asaas_payment_status text,
  pix_payload text,
  pix_qr_base64 text,
  pix_expiration timestamptz,
  due_date date,
  paid_at timestamptz,
  webhook_event_last text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_buyer_email_idx on public.orders(buyer_email);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

 drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

alter table public.orders enable row level security;

-- Nenhuma policy pública. Todas as leituras/escritas ficam via Edge Functions usando service role.
