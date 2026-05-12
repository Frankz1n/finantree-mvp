-- Erro 23514: CHECK transactions_type_check incompatível com o app (income | expense).
-- Tabelas legadas costumam usar receita/despesa ou outro par. Rode no SQL Editor (uma vez).

alter table public.transactions add column if not exists type text;

update public.transactions
set type = case
  when type is null or trim(type::text) = '' then 'expense'
  when lower(trim(type::text)) in ('income', 'receita', 'entrada') then 'income'
  when lower(trim(type::text)) in ('expense', 'despesa', 'saida', 'saída') then 'expense'
  else 'expense'
end;

alter table public.transactions drop constraint if exists transactions_type_check;
alter table public.transactions add constraint transactions_type_check check (type in ('income', 'expense'));

alter table public.transactions alter column type set not null;
