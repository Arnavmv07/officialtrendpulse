begin;
create table if not exists public.early_access_requests (
 email text primary key check (length(email) <= 254),
 created_at timestamptz not null default now()
);
alter table public.early_access_requests enable row level security;
alter table public.early_access_requests force row level security;
revoke all on public.early_access_requests from anon, authenticated;
create or replace function public.request_early_access(address text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare normalized text := lower(trim(address));
begin
 if length(normalized) > 254 or normalized !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
  raise exception 'Invalid email';
 end if;
 perform pg_advisory_xact_lock(814217);
 if (select count(*) from public.early_access_requests where created_at > now() - interval '1 minute') >= 30 then
  raise exception 'Please try again later';
 end if;
 insert into public.early_access_requests(email) values(normalized) on conflict(email) do nothing;
 return true;
end;
$$;
revoke all on function public.request_early_access(text) from public;
grant execute on function public.request_early_access(text) to anon, authenticated;
commit;
