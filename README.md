# HEIG-VD - Travail de Bachelor

_Étude et mise en place d’une plateforme web facilitant la gestion de projets entre mandants et équipes de développeurs indépendants_

###### Étudiant : _Thibaud Alt_
###### Travail proposé par : _Guillaume Wägli_
###### Enseignant responsable : _Patrick Lachaize_
###### Année académique : _2020-2021_

## Cahier des charges

### Problématique

Aujourd'hui, la gestion de projets informatiques respecte la plupart du temps le même processus :
1.	Un mandant soumet une liste de fonctionnalités et un délai pour la production d’un produit
2.	Un vendeur (et/ou directeur, chef de projet) décrit un cahier des charges et propose un devis au mandant
3.	Le vendeur négocie avec le mandant la forme du projet
4.	Le mandant accepte et signe un devis comprenant un coût, une qualité et un délai
5.	Le vendeur impose un cahier des charges et des délais de réalisation à une équipe de développeurs
6.	L’équipe de développeurs implémente le projet et crée un livrable
7.	Le vendeur livre le produit fini
8.	Le mandant paie le projet (et les dépassements de coûts/qualité/délai !)

Les problèmes rencontrés lors de ces projets sont nombreux, les principaux et les plus problématiques sont les suivants :
- Pour le mandant : Dépassement des coûts, non-respect des délais, diminution des fonctionnalités…
→ Au final le mandant se retrouve le jour du délai demandé avec aucun livrable ou un livrable ne contenant qu’une partie des fonctionnalités et avec un coût planifié atteint voir dépassé.
- Pour les développeurs : Cahier des charges, problèmes technologiques, manque de temps…
→ Au final les développeurs doivent fournir un livrable bâclé présentant des bugs dus au manque de temps, avec une documentation faible ou inexistante.

### Objectifs

La solution envisagée se base sur la communication directe entre le mandant et l’équipe de développeurs. Le processus se simplifie alors comme suit :
1.	Un mandant met en concours une liste de fonctionnalités et un délai pour la production d’un produit
2.	Différentes équipes de développeurs décrivent un cahier des charges comprenant une liste de fonctionnalités réalisables, un choix technologique, une qualité et un coût dans le délai donné
3.	Le mandant accepte et signe un des cahiers des charges proposés
4.	L’équipe de développeurs implémente le projet pour lequel elle s’est engagée et livre un produit final que le mandant paie

Pour mettre en relation les mandants et les développeurs, faciliter la communication, proposer des devis, gérer les délais et les flux financiers la solution s’apparente à créer et développer une **plateforme web**.

Au travers de cette plateforme, les équipes de développeurs sont en "compétition sociale" entre elles. Le fait de choisir ses coéquipiers, de définir les technologies, les prix, les choix laissés aux équipes et la dimension sociale motivent et permettent de lisser la plupart des problèmes.
En cas de livraison d’un produit final exemplaire ou au contraire d’un échec (non-respect d’un délai d’un projet, diminution des fonctionnalités, abandon, etc.) les équipes sont notées publiquement. Ainsi la réputation d’une équipe permet à celle-ci de grandir, de décrocher plus de projets et assure la qualité et la réussite des projets.

## Code source

-	Le code source compilable de la partie back-end de l’application réalisé avec Express est disponible dans le dossier [5.Projet/back-end](/5.Projet/back-end).
-	Le code source exécutable de la partie front-end de l’application réalisé avec Vue.js est disponible dans le dossier [5.Projet/front-end](/5.Projet/front-end).
-	Le code source du containeur Docker utilisant docker-compose est consultable dans le dossier [5.Projet/docker](/5.Projet/docker).

## Documentation et suivi du projet

### Rapport général
Ce projet est documenté dans un rapport, la dernière version de celui-ci se trouve dans le dossier [2.Documentation](/2.Documentation).

#### Annexes
 - Un journal de travail, sous la forme d'un tableur Excel, est disponible dans le dossier 2.Documentation/Annexes : [TB_Planning_Alt-Thibaud.xlsx](/2.Documentation/Annexes/TB_Planning_Alt-Thibaud.xlsx).
 - Des maquettes HTML statiques ont été réalisées, les sources de celles-ci sont disponibles dans le dossier [3.Maquettes](/3.Maquettes).
 - La définition des routes de l'API réalisé à l'aide de Postman : [MoonFish - Express.js REST API with JWT](https://documenter.getpostman.com/view/8210926/TzseHmCz)
 - Pour les suivis des tâches, un Trello est mis à jour à l'adresse suivante : [trello.com/b/meyHR8e8/heig-vd-travail-de-bachelor](https://trello.com/b/meyHR8e8/heig-vd-travail-de-bachelor).
 - Le résultat des tests de bout en bout, sous la forme d'un tableur Excel, est disponible dans le dossier 2.Documentation/Annexes : [Tests_End-to-end.xlsx](/2.Documentation/Annexes/Tests_End-to-end.xlsx).

## Démonstration fonctionnelle
 - L'état actuel du projet peut être consulté via l’URL suivant [heig-tb-moonfish.netlify.app](https://heig-tb-moonfish.netlify.app).
