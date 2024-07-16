
FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=passwordmanager
ENV MYSQL_USER=db_user
ENV MYSQL_PASSWORD=db_password

COPY ./passwordmanager.sql /docker-entrypoint-initdb.d/passwordmanager.sql


EXPOSE 3306


CMD ["mysqld"]
