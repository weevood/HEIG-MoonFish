# Étude et mise en place d'une plateforme web facilitant la gestion de projets entre mandants et équipes de développeurs indépendants

## 1. Contexte

Aujourd'hui, la gestion de projets informatiques respecte la plupart du temps le même processus :

1. Un mandant soumet une liste de fonctionnalités et un délai pour la production d'un produit
2. Un vendeur (et/ou directeur, chef de projet) décrit un cahier des charges et propose un devis au mandant
3. Le vendeur négocie avec le mandant la forme du projet
4. Le mandant accepte et signe un devis comprenant un coût, une qualité et un délai
5. Le vendeur impose un cahier des charges et des délais de réalisation à une équipe de développeurs
6. L'équipe de développeurs implémente le projet et crée un livrable
7. Le vendeur livre le produit fini
8. Le mandant paie le projet (et les dépassements de coûts, la baisse de qualité, le non-respect des délais !)

Les problèmes rencontrés lors de ces projets sont nombreux, les principaux et les plus problématiques sont les suivants :

- Pour le **mandant** : Dépassement des coûts, non-respect des délais, diminution des fonctionnalités…

→ _Finalement le mandant se retrouve le jour du délai demandé avec aucun livrable ou un livrable ne contenant qu'une partie des fonctionnalités et avec un coût planifié atteint voir dépassé._

- Pour les **développeurs** : Cahier des charges, problèmes technologiques, manque de temps…

→ _Finalement les développeurs doivent fournir un livrable bâclé présentant des bugs dus au manque de temps, avec une documentation faible voire inexistante._

### But du projet

La solution envisagée se base sur la communication directe entre le mandant et l'équipe de développeurs. Le processus se simplifie alors comme suit :

1. Un mandant met en concours une liste de fonctionnalités et un délai pour la production d'un produit
2. Différentes équipes de développeurs décrivent un cahier des charges comprenant une liste de fonctionnalités réalisables, un choix technologique, une qualité et un coût dans le délai donné
3. Le mandant accepte et signe un des cahiers des charges proposés
4. L'équipe de développeurs implémente le projet pour lequel elle s'est engagée et livre un produit final que le mandant paie

Pour mettre en relation les mandants et les développeurs, faciliter la communication, proposer des devis, gérer les délais et les flux financiers la solution s'apparente à créer et développer **une plateforme web**.

Au travers de cette plateforme, les équipes de développeurs sont en "compétition sociale" entre elles. Le fait de choisir ses coéquipiers, de définir les technologies, les prix, les choix laissés aux équipes et la dimension sociale motivent et permettent de lisser la plupart des problèmes.

En cas de livraison d'un produit final exemplaire ou au contraire d'un échec (non-respect d'un délai d'un projet, diminution des fonctionnalités, abandon, etc.) les équipes sont notées publiquement. Ainsi la réputation d'une équipe permet à celle-ci de grandir, de décrocher plus de projets et assure la qualité et la réussite des projets.

## 2. Éléments généraux

### Objectifs

Le but premier de cette plateforme web est d'éliminer un ou plusieurs intermédiaires ceux-ci étant une cause de multiplication des problèmes. Prenons l'exemple du célèbre jeu du _téléphone arabe_, plus il y a d'acteurs, moins le message initial a de chance d'arriver correctement et non déformé au destinataire final. De plus, chaque être humain à une façon personnel d'émettre et d'interpréter les informations qu'il reçoit d'autres êtres humains. Dans un projet, ces éléments s'appliquent également ; plus il y a d'acteurs, plus le contenu du projet diverge, plus le temps de celui-ci est allongé et plus les coûts sont élevés.

L'optique de cette plateforme web est d'éliminer au maximum les acteurs intermédiaires et de mettre en valeur les acteurs apportant une réelle plus-value à un projet. Dans le but d'arriver à créer un produit en réduisant les coûts tout en respectant les délais et en visant une qualité requise. Ces acteurs sont, _tout comme au téléphone arabe l'émetteur et le destinataire du message,_ le ou les mandants et le ou les développeurs. Pour que ces deux mondes se comprennent et arrivent à collaborer dans le but de créer un produit répondant au besoin, cela demande des efforts de compréhension des deux côtés ainsi qu'une implication forte de chacun dans le projet.

Pour aider la communication entre les différents acteurs tout au long du projet, diriger la gestion de celui-ci et ainsi remplacer et améliorer les rôles des intermédiaires, la plateforme web disposera de différentes valeurs ajoutées. Premièrement, la gestion des projets sera faite en respectant un cadre de travail SCRUM qui permet d'encadrer, de standardiser et d'ainsi faciliter la conduite des projets. De plus, la plateforme mettra à disposition de ses clients différents services notamment :

- Un espace de travail incluant un forum permettant un échange direct d'informations, de fichiers, d'images, etc. qui sera accessible et à disposition de tous les acteurs du projet.
  - En plus de la version originale du message et si nécessaire, cet espace inclura un système de traduction des messages dans la langue préférée de l'utilisateur. Permettant ainsi à des acteurs de toutes régions du monde de travailler ensemble facilement.
  - Des livrables avec une gestion des versions seront mis à disposition du mandant tout au long du projet, celui-ci pourra alors vérifier et corriger en cours de réalisation le bon déroulement du projet.
  - Une intelligence artificielle pourra être interpelée en cas d'incompréhension de vocabulaire entre mandants et développeur, celle-ci pourra reformuler certaines phrases, vulgariser certains termes et apporter des éléments supplémentaires nécessaires à une bonne compréhension.
- La mise à disposition sporadique de professionnels externes pour traiter un point spécifique du projet. Par exemple le recours à un médiateur en cas de conflit entre certains acteurs du projet, l'appel à un consultant ou à un expert pour prendre une décision stratégique, le suivi par un coach en cas de baisse de motivation, etc.
- Un système de sous-traitance de tâches simples et répétitives permettant de répondre rapidement à un besoin ponctuel. Par exemple la saisie de centaines d'articles dans un magasin de vente en ligne, le nettoyage d'une base de données, la recherche d'images d'illustrations, etc.
- Un _espace de connaissances_ mettant à disposition des ressources, des cours, des tutoriels, des outils, etc. apportant des notions théoriques ainsi que différents savoirs nécessaires liés à la gestion de projets.
- Une équipe d'assistance disponible en tout temps pour répondre aux différentes questions liées à la plateforme et ainsi aider ses clients à tout moment.

Dans ce travail de Bachelor, nous nous focalisons sur des produits informatiques pour développer l'idée, mais ce concept pourrait très bien s'adapter à tout type de projets et d'industries. Nous pourrions par exemple imaginer une entreprise de construction avec comme projet l'élaboration d'un bâtiment même si dans ce cas, il y aurait certainement plus que deux types d'acteurs.

### Objectifs du travail de diplôme

Les objectifs de ce projet pour ce travail de Bachelor sont les suivants :

- Réaliser une étude de marché sommaire
  - Travail de recherche de "ce qui se fait" actuellement et des éventuels produits existants concurrents
- Analyser via un "_State of the art_" les différentes techniques permettant le développement d'applications web en 2021 dans le but d'une sélection pour la réalisation
- Définir la structure et la technologie de la ou des base(s) de données à utiliser
- Développer une première version de l'application web client-serveur
- Proposer des améliorations et/ou d'autres fonctionnalités à développer dans des versions postérieures de l'application web

### Périmètre

Dans sa première version, l'application web on attend au minimum les fonctionnalités et point de conceptions suivants :

- La plateforme permettra à un utilisateur de se créer un compte, de gérer son profil et de rejoindre une ou plusieurs équipes de développeurs
- Un mandant pourra se créer un compte, gérer son profil, soumettre un ou plusieurs projets, choisir une équipe de développement et attribuer une évaluation à une équipe de développeurs lorsqu'un projet sera finalisé
- Une équipe de développeur (via un _team leader_) pourra gérer son profil, soumettre sa candidature pour des projets proposés et déposer des livrables pour ses projets en cours
- L'application web sera monolingue et sera proposé en anglais
- L'application web disposera d'une interface fonctionnelle sur les navigateurs web récents et sur une taille d'écran d'ordinateurs classiques

## 4. Éléments d'études

### Étude de marché sommaire

Un travail de recherche de "ce qui se fait" actuellement sera réalisé et une étude de marché sommaire présentera les éventuels produits existants concurrents. Cette étude pourra être composé d'une matrice d'affaires (_Business Model Canvas_), des différentes cibles visées par la plateforme web, du marché potentiel et du profil des clients, du secteur d'activité ou encore des éventuels risques et menaces.


### Réception des livrables, validation et paiement
Le déroulement d’un projet, sa validation puis sa rémunération suivent les étapes suivantes.
1.	Le mandant signe un devis et paye un acompte à la plateforme.
Développement du projet…
2.	L’équipe de développeurs a terminé le projet, elle le notifie sur la plateforme.
3.	Le mandant doit alors régler le montant total du projet à la plateforme.
4.	L’équipe de développeurs livre et éventuellement installe le projet chez le mandant puis en notifie la plateforme. La réception proprement dite des livrables est gérée directement entre le mandant et l’équipe de développeurs.
5.	Le mandant complète un rapport sur le déroulement du projet et sur l’équipe de développeurs puis valide la livraison et éventuellement l’installation du projet.
6.	La plateforme rémunère l’équipe de développeurs et clos le projet.

Si le mandant ne valide pas la livraison du projet, un expert de la plateforme intervient pour régler le conflit et trouver une solution entre les deux parties. Si le projet est abandonné en cours de route par le mandant, l’équipe de développeurs récupère l’acompte payé par celui-ci.

#### Changement d'équipe de développement
Si en cours de projet, l’équipe de développeurs ou le mandant souhaitent rompre le contrat, les deux parties doivent remplir un rapport expliquant les raisons de cette rupture. Ensuite, le projet est proposé une seconde fois sur la plateforme dans son état actuel. Différentes équipes de développeurs peuvent alors proposer leurs services et le mandant doit à nouveau choisir une équipe pour terminer le projet. Le passage du code source, des processus de déploiement, de la documentation, etc. se fait via la plateforme par l’équipe de développeurs « sortante ». Celle-ci se doit de mettre à disposition de la nouvelle équipe de développeurs tous les éléments nécessaires à la bonne continuation du projet.

Un abandon du projet par une équipe de développeurs entraine de fait un signalement sur le profil de cette équipe. Ce signalement contient le rapport des raisons de l’abandon et est noté par rapport à différents critères notamment sur le travail réalisé, la documentation, le passage des éléments nécessaires, la réactivité, etc.

### Technologies

Le but est de réaliser une application web client-serveur entièrement en JavaScript à l'aide de Node.js (où Deno) et de frameworks comme Express.js, React.js, Vue.js ou équivalent. Pour réaliser cette plateforme l'utilisation des technologies web récentes et actuelles semble cohérente, ces choix techniques devront être vérifiés et validés dans une phase d'analyse.

#### State of the art

Un état de l'art des techniques permettant le développement d'applications web en 2021 sera réalisé. Celui-ci s'intéressera globalement à diverses technologies disponibles puis plus particulièrement aux technologies JavaScript. Cet état de l'art étudiera les deux axes de développement nécessaire, à savoir le front-end avec des frameworks JavaScript et le back-end avec les environnements d'exécution et les frameworks.

#### Persistance des données

Le choix de la technologie de la ou des bases de données à utiliser devra être étudié. Pour stocker les informations des utilisateurs, les informations spécifiques aux projets, les évaluations (…) une unique base de données SQL semble adéquate. Cependant ce choix devra être confirmé et validé durant la phase d'analyse.

#### Gestion de dépendances

La gestion de dépendances sera réalisée avec _npm_qui est le gestionnaire de paquets officiel de Node.js si ce dernier est choisi lors de la phase d'analyse pour y développer la plateforme. Ce gestionnaire de paquet est très pratique car il fonctionne avec un simple terminal, gère les dépendances par application et permet d'installer très facilement des paquets Node.js disponibles sur le dépôt npm. En outre, toutes les informations nécessaires au développement et au déploiement sont écrites en clair dans un fichier JSON ce qui permet de gérer les dépendances de librairies tierces et d'automatiserleur téléchargement.

#### Livraison et intégration continue (CI / CD)

L'environnement d'intégration continue et de déploiement continu utilisé sera git à l'aide de la plateforme web github.com et du logiciel GitHub Desktop. Cet environnement et ses outils associés mettent à disposition un système de gestion des versions complet, ainsi qu'un puissant système de tests et de déploiement.

#### Livrables

Désirant réaliser le développement de l'application web avec la méthodologie SCRUM, celle-ci prévoit de générer autant de livrables que de _sprints_ agendés. Une fois les différents _sprints_ définis, chaque livrable sera clairement identifié sur le système de gestion des versions. Celui-ci pourra alors éventuellement être déployé, hébergé et soumis au client.

#### Hébergement

Les différents livrables pourront être déployés au fur et à mesure de son développement sur une plateforme cloud tel que _AWS_ (_Amazon Web Services_), _Heroku_ ou encore _Netlify_. Les principaux avantages de ses plateformes cloud sont qu'elles permettent un déploiement extrêmement rapide qui peut être automatisé avec plusieurs outils de livraison continue, qu'elles ne nécessitent pas de configurations complexes et qu'elles sont gratuites dans une certaine mesure.

## 5. Besoins fonctionnels

### User stories

Dans les user stories suivants, nous prendrons trois points de vue différents à savoir :

- Un utilisateur (il s'agit ici d'un développeur)
- Un mandant
- Une équipe (il s'agit ici de plusieurs développeurs)

#### a. Création d'un compte et authentification

En tant que développeurouen tant que mandant, je veux pouvoir me créer facilement un compte utilisateur puis l'utiliser par la suite pout m'authentifier.

#### b. Gestion de profil

En tant que développeurouen tant que mandant,je veux pouvoir gérer mon profil. En tant que développeur je peux rejoindre ou quitter une ou plusieurs équipes de développeurs.

#### c. Soumission de projets

En tant que mandant, je veux pouvoir soumettre des projets et choisir une équipe de développement pour les réaliser. Pour ce faire, je peux consulter le profil de l'équipe de développeurs ainsi que les profils des différents membres de celle-ci.

#### d. Évaluation d'une équipe de développeurs

En tant que mandant, je veux pouvoir évaluer une équipe de développeurs un fois un projet finalisé et livré ou abandonné. Mon évaluation est alors visible et consultable par tous les autres mandataires.

#### e. Soumission de candidature

En tant qu'équipe de développeurs, je veux pouvoir soumettre ma candidature, mon cahier des charges et mes coûts pour un projet proposé.

#### f. Dépôt des livrables

En tant qu'équipe de développeurs, je veux pouvoir téléverser des documents, des livrables et des informations tout au long du projet. Ceux-ci sont alors visible pour tous les membre de l'équipe ainsi que pour le mandant.

#### g. Classement des équipes et des développeurs

En tant que visiteur, je peux consulter le classement mensuel, annuel et « _de tous les temps_ » des équipes de développeurs. En tant que visiteur, je peux également consulter le classement d'un développeur.

#### h. Espace de travail

En tant qu'utilisateur de la plateforme, je peux accéder à mon espace de travail incluant un forum par projet en cours. Ces forums me permettent d'accéder à toutes les informations nécessaires au bon déroulement des projets.

#### i. Discussions instantanées

En tant qu'utilisateur de la plateforme, je peux accéder via mon espace de travail à un système de discussions instantanées.

## 6. Besoins non-fonctionnels

### Contraintes dû à l'environnement

Ce projet étant nouveau et non lié à environnement précis, il ne dispose pas de contraintes techniques définis. Il devra cependant pouvoir s'inscrire dans un portefeuille de projets web existants et de ce fait devra suivre les _bonnes pratiques_ de développement actuelles.

Plus tard, il se pourrait que d'autres développeurs soient amenés à faire évoluer ce projet, c'est pourquoi celui-ci devra être correctement documenté et devra être développé avec des frameworks connus et maitrisé par un grand nombre de développeurs.

### Besoins de performance, d'ergonomie et de fiabilité

#### Interface et expérience utilisateur

L'interface utilisateur devra respecter une charte graphique et des maquettes définis. L'application web devra être intuitive, l'expérience utilisateur devra être fluide et l'ergonomie agréable.

#### Charges et ressources

L'application ne devra pas, du moins dans sa première version, supporter un taux de charge excessif. Toutefois, elle devra être pensée et développé de tel sorte à pouvoir l'adapter à ces points dans des versions postérieurs.

## 7. Extensions

### « _Si temps le permet_ »

#### Multilinguisme

L'application étant dans sa première version uniquement disponible en anglais, il serait judicieux de la traduire dans d'autres langues permettant ainsi d'attaquer différents marchés. Dans un premier temps, et pour le marché Suisse, l'application pourra être traduite en Allemand et en Français.

#### Adaptation « responsive »

L'application web étant fonctionnelle sur un ordinateur bureau classique, il serait fort agréable pour l'utilisateur d'également disposer d'une interface sur ces appareils mobiles. Cette interface, éventuellement réduite, devra donc être agréablement utilisable et fonctionnelle sur des téléphones mobiles récents et sur des tablettes récentes.

#### Inscription et connexion via des services tiers

Aujourd'hui nous possédons tous de nombreux comptes sur internet et il n'est pas toujours facile de se souvenir quelle combinaison nom d'utilisateur/mot de passe nous avons définis. De plus, les inscriptions à un service web sont souvent des étapes lentes et contraignantes qui vont à l'encontre de l'expérience utilisateur. Partant de ce constat, il serait judicieux d'ajouter des services tiers (Google, Apple…) comme moyen de connexion à la plateforme web.

### Dans des versions futures

#### Solutions de paiement

Dans une version future, il serait intéressant d'étudier puis d'implémenter différentes solutions de paiement à la plateforme web.

#### Intégration de professionnels externes

Une des valeurs ajoutées de la plateforme, est la possibilité de faire appel à un professionnels externe pour traiter un point spécifique du projet. Par exemple le recours à un médiateur en cas de conflit entre certains acteurs du projet, l'appel à un consultant ou à un expert pour prendre une décision stratégique, le suivi par un coach en cas de baisse de motivation, etc. Ces acteurs externes seraient des partenaires indépendant, validés par un système de sélection et leurs services seraient proposés aux mandants et/ou au développeurs au travers de la plateforme.

#### Système de sous-traitance

Un système de sous-traitance de tâches simples et répétitives permettant de répondre rapidement à un besoin ponctuel pourra être intégré directement à la plateforme. Celui-ci pourra être utilisé par exemple pour la saisie d'articles dans un magasin de vente en ligne, le nettoyage d'une base de données, la recherche d'images d'illustrations, etc. L'idée ici serait de trouver différents partenaires effectuant ce type de services et de les intégrer entièrement à la plateforme. De ce fait l'utilisation de ce système par les développeurs seraient très simple et ils n'auraient pas à quitter la plateforme.

#### Espace de connaissances

Un espace de connaissances mettant à disposition des ressources, des cours, des tutoriels, des outils, etc. apportant des notions théoriques ainsi que différents savoirs nécessaires liés à la gestion de projets. Cet espace se construirait au fur et à mesure des projets via les connaissances acquises par les différents acteurs et sur le principe de « l'open source ». De plus, il pourrait être envisageable de mandater un expert en gestion de projets qui réaliserait une série de tutoriels vidéo vulgariser, accessibles à tous et intégrant les différentes spécificités de la plateforme.

#### Vulgarisation et reformulation

Dans une version future, une intelligence artificielle pourra être interpelée en cas d'incompréhension de vocabulaire entre mandants et développeur lors de discussions textuelles instantanées. Cette intelligence artificielle pourra reformuler certaines phrases, vulgariser certains termes et apporter des éléments supplémentaires nécessaires à la bonne compréhension du message.
