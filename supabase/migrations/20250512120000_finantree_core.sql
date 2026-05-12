-- Finantree MVP: tabelas públicas + RLS alinhadas ao app (Vite + supabase-js).
-- Rode no Supabase: SQL Editor → New query → colar → Run.
--
-- Se uma tabela já existia SEM a coluna user_id, o CREATE TABLE IF NOT EXISTS não
-- recria a tabela; por isso abaixo há ADD COLUMN + limpeza de linhas órfãs.
-- Linhas com user_id nulo são apagadas (dados sem dono). Faça backup se precisar.

-- ---------------------------------------------------------------------------
-- Perfil em public.users (lido em getCurrentUserProfile / greeting)
-- ---------------------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  name text,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

drop policy if exists "users_select_own" on public.users;
create policy "users_select_own" on public.users for select to authenticated using (auth.uid() = id);

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own" on public.users for insert to authenticated with check (auth.uid() = id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own" on public.users for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), '')
  )
  on conflict (id) do update
    set full_name = coalesce(excluded.full_name, public.users.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Categorias (TransactionModal, TransactionService)
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  color text default '#64748b',
  created_at timestamptz not null default now()
);

alter table public.categories
  add column if not exists user_id uuid references auth.users (id) on delete cascade;
delete from public.categories where user_id is null;
alter table public.categories alter column user_id set not null;

create index if not exists categories_user_id_idx on public.categories (user_id);

alter table public.categories enable row level security;

drop policy if exists "categories_select_own" on public.categories;
create policy "categories_select_own" on public.categories for select to authenticated using (auth.uid() = user_id);

drop policy if exists "categories_insert_own" on public.categories;
create policy "categories_insert_own" on public.categories for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "categories_update_own" on public.categories;
create policy "categories_update_own" on public.categories for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "categories_delete_own" on public.categories;
create policy "categories_delete_own" on public.categories for delete to authenticated using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Transações (Home, Extract, TransactionModal — coluna date em timestamptz)
-- ---------------------------------------------------------------------------
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  amount numeric not null,
  type text not null check (type in ('income', 'expense')),
  description text not null default '',
  category_id uuid references public.categories (id) on delete set null,
  date timestamptz not null default now(),
  status text not null check (status in ('paid', 'pending')) default 'paid',
  created_at timestamptz not null default now()
);

alter table public.transactions
  add column if not exists user_id uuid references auth.users (id) on delete cascade;
delete from public.transactions where user_id is null;
alter table public.transactions alter column user_id set not null;

create index if not exists transactions_user_id_date_idx on public.transactions (user_id, date desc);

alter table public.transactions enable row level security;

drop policy if exists "transactions_select_own" on public.transactions;
create policy "transactions_select_own" on public.transactions for select to authenticated using (auth.uid() = user_id);

drop policy if exists "transactions_insert_own" on public.transactions;
create policy "transactions_insert_own" on public.transactions for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "transactions_update_own" on public.transactions;
create policy "transactions_update_own" on public.transactions for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "transactions_delete_own" on public.transactions;
create policy "transactions_delete_own" on public.transactions for delete to authenticated using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Metas (Garden / GoalsService)
-- ---------------------------------------------------------------------------
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  target_amount numeric not null,
  current_amount numeric not null default 0,
  deadline date,
  is_completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.goals
  add column if not exists user_id uuid references auth.users (id) on delete cascade;
delete from public.goals where user_id is null;
alter table public.goals alter column user_id set not null;

create index if not exists goals_user_id_idx on public.goals (user_id);

alter table public.goals enable row level security;

drop policy if exists "goals_select_own" on public.goals;
create policy "goals_select_own" on public.goals for select to authenticated using (auth.uid() = user_id);

drop policy if exists "goals_insert_own" on public.goals;
create policy "goals_insert_own" on public.goals for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "goals_update_own" on public.goals;
create policy "goals_update_own" on public.goals for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "goals_delete_own" on public.goals;
create policy "goals_delete_own" on public.goals for delete to authenticated using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Compromissos recorrentes (AddCommitmentModal / Recurring)
-- ---------------------------------------------------------------------------
create table if not exists public.commitments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('subscription', 'installment')),
  name text not null,
  amount numeric not null,
  next_charge_date date not null,
  total_installments integer,
  current_installment integer,
  created_at timestamptz not null default now()
);

alter table public.commitments
  add column if not exists user_id uuid references auth.users (id) on delete cascade;
delete from public.commitments where user_id is null;
alter table public.commitments alter column user_id set not null;

create index if not exists commitments_user_id_idx on public.commitments (user_id);

alter table public.commitments enable row level security;

drop policy if exists "commitments_select_own" on public.commitments;
create policy "commitments_select_own" on public.commitments for select to authenticated using (auth.uid() = user_id);

drop policy if exists "commitments_insert_own" on public.commitments;
create policy "commitments_insert_own" on public.commitments for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "commitments_update_own" on public.commitments;
create policy "commitments_update_own" on public.commitments for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "commitments_delete_own" on public.commitments;
create policy "commitments_delete_own" on public.commitments for delete to authenticated using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Opcional: usuários que já existiam em auth antes do trigger
-- (descomente e execute uma vez se a tabela users estiver vazia para contas antigas)
-- ---------------------------------------------------------------------------
-- insert into public.users (id, full_name)
-- select id, coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1), '')
-- from auth.users
-- on conflict (id) do nothing;
