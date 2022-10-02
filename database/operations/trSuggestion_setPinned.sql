create or replace function suggestion.fnSuggestion_setPinned()
    returns trigger
    language plpgsql
    as
$$
declare
    pinned_count integer;
begin
    if new.pinned then
        select distinct
            count(pinned) into pinned_count
        from
            suggestion.suggestion
        where
            pinned = true
        group by
            pinned;

        if pinned_count >= 3 then
            raise exception 'Hay 3 sugerencias ancladas ya';
        end if;
    end if;

    return new;
end
$$;


create or replace trigger trSuggestion_setPinned
    before insert or update
    on suggestion.suggestion
    for each row
    execute procedure suggestion.fnSuggestion_setPinned();