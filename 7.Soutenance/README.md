# HEIG-VD - Travail de Bachelor - Soutenance

## Launching the demo

#### 1. Launch Docker Desktop
#### 2. Navigate to ...

`
cd Projects/HEIG-VD_Travail-de-Bachelor/5.Projet/docker/
`

#### 3. Run Docker-compose

`
sudo docker-compose up
`

#### 4. Ready!

Visit : http://localhost/

And you cann access to:

- Front-end (Vue.js) => http://localhost:80
- Back-end (Express.js) => http://localhost:3000
- Database 1 (MariaDB) => http://localhost:3306 / PhpMyAdmin on http://localhost:8000
- Database 2 (Neo4j) => http://localhost:7687 / Browser on http://localhost:7474

-------------------------------------------------------------------------------------

In case of failure, you can try the following :

##### Run the Back-end

`
cd Projects/HEIG-VD_Travail-de-Bachelor/5.Projet/docker/
`

`
sudo docker-compose up
`

Visit : http://localhost:3000/

##### Serve the Front-end
`
cd Projects/HEIG-VD_Travail-de-Bachelor/5.Projet/front-end/
`

`
serve -s dist
`

Visit : http://localhost:5000/

OR for hot reload (dev)

`
npm run dev
`

Visit : http://localhost:8081/
