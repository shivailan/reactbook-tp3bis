Documentation du Projet ReactBook - TP3 Bis
ReactBook est une application de micro-blogging construite avec React 19. Ce projet explore la gestion d'états globaux et locaux complexes pour simuler un réseau social fonctionnel.

Fonctionnalités implémentées
Gestion de l'authentification

Restriction des interactions : Les fonctions de publication, de mention "J'aime" et de gestion des commentaires sont verrouillées pour les invités.

Identifiants fixés : L'accès membre est réservé à l'utilisateur "shiva" avec le mot de passe "shiva".

Interface de connexion : Formulaire intégré au Header permettant une transition immédiate entre le mode invité et le mode membre.

Système de flux et publications

Publication de contenu : Formulaire dédié permettant aux membres de poster de nouveaux messages en haut du fil d'actualité.

Interactions sociales : Système de Likes avec compteur numérique et gestion des commentaires (CRUD complet : ajout, modification, suppression).

Recherche et filtrage : Barre de recherche réactive filtrant les publications par auteur ou par texte en temps réel.

Interface et Expérience Utilisateur

Pagination : Système de chargement progressif des données ("Charger plus") pour optimiser l'affichage.

Thématisation : Support complet d'un mode sombre et d'un mode clair via un contexte global.

Design : Utilisation de Tailwind CSS pour une interface épurée et responsive.

Choix techniques majeurs
Centralisation de la logique avec useReducer

Le choix du hook useReducer pour le fil d'actualité permet de gérer toutes les transformations de données (ajouts, suppressions, modifications imbriquées dans les commentaires) au sein d'une seule fonction reducer. Cela évite la dispersion de la logique dans de multiples fonctions d'état.

Architecture Multi-Contextes

L'application sépare les responsabilités en deux contextes distincts : AuthContext et ThemeContext. Cette séparation évite les re-rendus inutiles. Par exemple, changer le thème de l'application ne déclenche pas de vérification de l'état d'authentification de l'utilisateur.

Optimisation des rendus avec useMemo

Le filtrage des publications est encapsulé dans un useMemo. Cela garantit que le calcul du filtrage ne s'exécute que lorsque la liste des messages ou le terme de recherche change, préservant ainsi les performances lors du défilement ou de la saisie de texte.

Mode d'emploi du projet
Installation et exécution

Installation des dépendances : npm install

Lancement du serveur local : npm run dev

Accès à l'application via l'adresse locale fournie dans le terminal (généralement localhost:5173).

Avec Docker (Conteneurisation)

L'application est entièrement dockerisée pour garantir un environnement stable.

Construction de l'image :

Bash
docker build -t reactbook-frontend:1.0 .
Lancement du conteneur :

Bash
docker run --rm -p 5173:5173 reactbook-frontend:1.0
Accès : L'application est disponible sur http://localhost:5173

Utilisation

Navigation : Faire défiler pour lire les posts existants.

Pagination : Cliquer sur le bouton en bas de page pour charger la suite.

Connexion : Saisir "shiva" dans les deux champs du Header pour activer les droits d'écriture.

Thème : Utiliser le bouton de bascule pour changer l'apparence visuelle.

Procédure pour exécuter les tests
Validation de la recherche : Saisir un mot-clé et vérifier que le bouton "Charger plus" se met à jour selon les résultats trouvés.

Validation des droits : Tenter de liker sans être connecté. Le bouton doit rester inactif.

Validation du Reducer : Ajouter un commentaire, le modifier, puis le supprimer pour vérifier l'intégrité de la structure de données.

Validation de la pagination : Vérifier que l'ajout d'un nouveau post ne masque pas les anciens posts au-delà de la limite de visibilité.