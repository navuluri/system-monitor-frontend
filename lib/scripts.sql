drop table server_info;

create table public.server_info
(
    id             serial
        unique,
    ip             text    not null
        primary key,
    hostname       text    not null,
    updated_on     bigint  not null,
    cpu_percent    numeric not null,
    cpu_count      numeric not null,
    memory_percent numeric not null,
    memory_total   numeric not null,
    disk_usage     numeric not null
);

alter table public.server_info
    owner to postgres;

