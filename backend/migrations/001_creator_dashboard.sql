-- Run in the approved Supabase project. No elevated key in the browser.
create table public.creator_ideas (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  topic text not null check (length(topic) between 1 and 250),
  hook text not null default '' check (length(hook) <= 2000),
  notes text not null default '' check (length(notes) <= 10000),
  source_url text check (source_url is null or (length(source_url) <= 2000 and source_url ~ '^https://')),
  status text not null default 'Idea' check (status in ('Idea', 'Scripting', 'Filming', 'Published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index creator_ideas_owner_created on public.creator_ideas(owner_id, created_at desc);
alter table public.creator_ideas enable row level security;
alter table public.creator_ideas force row level security;
revoke all on public.creator_ideas from anon, authenticated;
grant select, insert, delete on public.creator_ideas to authenticated;
grant update (topic, hook, notes, source_url, status) on public.creator_ideas to authenticated;
create policy own_read on public.creator_ideas for select to authenticated using ((select auth.uid()) = owner_id);
create policy own_insert on public.creator_ideas for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy own_update on public.creator_ideas for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy own_delete on public.creator_ideas for delete to authenticated using ((select auth.uid()) = owner_id);
create function public.set_idea_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
create trigger idea_timestamp before update on public.creator_ideas for each row execute function public.set_idea_updated_at();
