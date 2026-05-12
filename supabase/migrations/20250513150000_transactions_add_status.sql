-- Coluna status em transactions (PGRST204 quando o PostgREST não encontra a coluna).
-- Valores: 'paid' (padrão) | 'pending' (receita/despesa futura).
-- Rode no SQL Editor (uma vez).

alter table public.transactions add column if not exists status text;

update public.transactions
set status = case
  when status is null or trim(status::text) = '' then 'paid'
  when lower(trim(status::text)) = 'pending' then 'pending'
  else 'paid'
end;

alter table public.transactions alter column status set default 'paid';
alter table public.transactions alter column status set not null;

alter table public.transactions drop constraint if exists transactions_status_check;
alter table public.transactions add constraint transactions_status_check check (status in ('paid', 'pending'));
