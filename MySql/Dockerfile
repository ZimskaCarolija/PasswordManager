FROM mysql:latest

COPY passwordmanager.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD ["mysqld"]
