# Docker - MoonFish container

Ce projet utilise *docker-compose*.

## Commandes

### `docker-compose`

`docker-compose up` Initialisation et démarrage des containers

`docker-compose up -d` Initialisation et démarrage des containers en mode *deamon*



### `docker exec`

*MariaDB*

`docker exec -i mariadb mysql -uroot -ppwd moonfish < db_dump.sql` Importation

`docker exec -i mariadb mysql -uroot -ppwd moonfish > db_dump.sql` Exportation


