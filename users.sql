create table users(
	id serial not null primary key,
	user_names text not null,
    greeting_counts int
);