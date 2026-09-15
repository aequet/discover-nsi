# Discover NSI

Landing page en français consacrée à la spécialité Numérique et Sciences Informatiques au lycée. Un document unique se transforme entre neuf directions artistiques : Flat Design, Material Design, skeuomorphisme, neumorphisme, glassmorphisme, brutalisme, minimalisme, maximalisme et typographique.

## Aperçu local

Avec Node.js installé, lancer `npm run dev`, puis ouvrir `http://127.0.0.1:4173/`. Aucune dépendance à installer, aucune compilation nécessaire. La variable `PORT` permet de changer le port.

## Fichiers à publier

Le dossier `dist/` contient tout le site :

- `index.html` : contenu, navigation, métadonnées et sources officielles.
- `styles.css` : styles communs, neuf directions et adaptations aux écrans.
- `app.js` : sélecteur, annonce accessible, préférence locale et conservation du passage lu.

Ces trois fichiers fonctionnent sur tout hébergement statique. Le contenu reste disponible sans JavaScript. Les polices viennent de Google Fonts, avec des polices système de remplacement. Aucun traceur, formulaire ni serveur applicatif.

## Interactions et accessibilité

Le sélecteur fixe donne un accès direct aux neuf styles sur ordinateur. Sur mobile, le nom du style ouvre un panneau de choix et la flèche passe au style suivant. Les boutons fonctionnent au clavier, le panneau modal gère le focus et se ferme avec Échap. La préférence est enregistrée uniquement dans le navigateur. Le changement de style conserve le passage en cours de lecture.

Un lien d’évitement, une structure de titres, des annonces de changement de style et la préférence de réduction des animations sont pris en charge. Le document utilise `lang="fr"`.

## Contenu et vérifications

Les origines, les horaires, la démarche de projet et le programme ont été vérifiés avec les sources du ministère et d’Éduscol. Les parcours après le bac renvoient vers Onisep. Les six cartes de programme sont une synthèse des deux années, pas une reproduction des rubriques officielles. Les projets présentés sont des possibilités, selon les choix pédagogiques et l’équipement du lycée.

Vérifications effectuées dans le navigateur : neuf styles, tailles de 320 à 1440 pixels, absence de débordement horizontal, contenu identique, un seul style sélectionné, fermeture au clavier et retour du focus. Relecture indépendante du code et des contrastes des palettes ; corrections des problèmes observés. Il ne s’agit pas d’une certification WCAG complète.

## Hébergement

La configuration Sites figure dans `.openai/hosting.json`. Domaine cible : `discover.nsi.xyz`. Le raccordement du domaine dépend de sa configuration DNS ; un aperçu hébergé ne modifie pas ces enregistrements.
