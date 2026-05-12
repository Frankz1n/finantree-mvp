-- Erro 23503: FK de user_id nas tabelas aponta para public.users em vez de auth.users.
-- Troca todas as FKs relevantes para referenciar auth.users diretamente.
-- Rode no SQL Editor (uma vez). Idempotente — usa DROP CONSTRAINT IF EXISTS.

-- transactions
alter table public.transactions
  drop constraint if exists transactions_user_id_fkey;

alter table public.transactions
  add constraint transactions_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete cascade;

-- categories
alter table public.categories
  drop constraint if exists categories_user_id_fkey;

alter table public.categories
  add constraint categories_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete cascade;

-- goals
alter table public.goals
  drop constraint if exists goals_user_id_fkey;

alter table public.goals
  add constraint goals_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete cascade;

-- commitments
alter table public.commitments
  drop constraint if exists commitments_user_id_fkey;

alter table public.commitments
  add constraint commitments_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete cascade;

-- backfill: garante que usuários existentes em auth também existam em public.users
-- Insere somente as colunas que existem na tabela, evitando erro de coluna inexistente.
-- A coluna full_name / name será preenchida se existir; caso contrário, apenas o id.
do $$
declare
  has_full_name boolean;
  has_name      boolean;
begin
  select exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'users' and column_name = 'full_name'
  ) into has_full_name;

  select exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'users' and column_name = 'name'
  ) into has_name;

  if has_full_name then
    insert into public.users (id, full_name)
    select id,
           coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1), 'Usuário')
    from auth.users
    on conflict (id) do nothing;
  elsif has_name then
    insert into public.users (id, name)
    select id,
           coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1), 'Usuário')
    from auth.users
    on conflict (id) do nothing;
  else
    insert into public.users (id)
    select id from auth.users
    on conflict (id) do nothing;
  end if;
end;
$$;
