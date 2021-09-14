# Docker - MoonFish container

Ce projet utilise *docker-compose*.

## Commandes

### `docker-compose`

`docker-compose up` Initialisation et démarrage des containers
`docker-compose up -d` Initialisation et démarrage des containers en mode *deamon*
`docker-compose up --build` Création, initialisation puis démarrage des containers
`docker-compose down --volumes && docker volume rm -f CONTAINER_NAME ` Réinitialisation d'un volume de données

### `docker exec`

*MariaDB*

`docker exec -i mariadb mysql -uroot -ppwd moonfish < db_dump.sql` Importation
`docker exec -i mariadb mysql -uroot -ppwd moonfish > db_dump.sql` Exportation



## Visualisation

**MariaDB** : http://localhost:8000/ avec `mariadb`, `root`, `root`

**Neo4j** : http://localhost:7474/browser/ avec `neo4j`, `neo4j`


