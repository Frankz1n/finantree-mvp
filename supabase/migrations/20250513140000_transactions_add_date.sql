-- Tabela transactions legada sem coluna date (filtro por mês e insert falham no PostgREST).
-- Rode no SQL Editor (uma vez).

alter table public.transactions add column if not exists date timestamptz;
update public.transactions set date = coalesce(date, now()) where date is null;
alter table public.transactions alter column date set not null;
