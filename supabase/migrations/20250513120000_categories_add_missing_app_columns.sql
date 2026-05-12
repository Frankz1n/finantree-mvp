-- Correção: categories legada sem colunas type / color / name (PostgREST 42703).
-- Rode no Supabase → SQL Editor (uma vez). Idempotente com IF NOT EXISTS.

alter table public.categories add column if not exists type text;
alter table public.categories add column if not exists color text;
alter table public.categories add column if not exists name text;

update public.categories set type = lower(trim(type::text));
update public.categories set type = 'expense' where type is null or type not in ('income', 'expense');
update public.categories set color = '#64748b' where color is null or trim(color) = '';
update public.categories set name = 'Categoria' where name is null or trim(name) = '';

alter table public.categories alter column type set not null;
alter table public.categories alter column name set not null;
alter table public.categories alter column color set default '#64748b';

alter table public.categories drop constraint if exists categories_type_check;
alter table public.categories add constraint categories_type_check check (type in ('income', 'expense'));
