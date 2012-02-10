bgMax.js
========

Concept
=======

Une image de fond, quand elle est bien soignée, peut apporter à un site web un bel atout graphique. Hélas, avec la variété croissante des tailles d'écrans, on ne sait jamais dans quelles conditions le visiteur pourra profiter de notre belle image.

bgMax permet de pallier ce problème, et d'aller même un peu plus loin.

*	adaptation des mesures de l'image à celles de la fenêtre
*	plusieurs modes d'ajustement
*	apparition de l'image en fondu (optionnel)

Intégration
===========

Pour commencer, il faut charger le script, en insérant le code suivant entre les balises `<head>` et `</head>` de la page :

	<script src="bgMax.min.js" type="text/javascript"></script>

Ensuite, on déclenche l'effet par un tout petit bout de javascript placé en fin de page, juste avant la balise `</body>` :

	<script type="text/javascript">
	bgMax.init('dossier/mon-image.jpg');
	</script>

Options
=======

On peut également paramétrer plusieurs options, que l'on passera en second argument de la fonction, sous la forme d'un tableau associatif :

	var options = { 
		option1 : valeur1,
		option2 : valeur2,
		optionN : valeurN
	};
	bgMax.init('dossier/mon-image.jpg', options);

**Options disponibles :**

*   **mode**    _String_    `"max"`    mode d'ajustement de l'image.
    *   max : l'image occupe toute la largeur de la fenêtre, quite à déborder dans la hauteur.
    *   full : l'image tient toute entière dans la fenêtre, en occupant autant de place que possible.

*   **enlarge**    _Boolean_    `true` 	Autorise ou interdit l'agrandissement l'image au delà de ses dimensions réelles.
*   **reduce**    _Boolean_    `true`    Autorise ou interdit la réduction de l'image en dessous de ses dimensions réelles.
*   **position**    _String_    `"absolute"`    positionnement css de l'image : "fixed" ou "absolute"
*   **align**    _String_    `"center"`    alignement horizontal de l'image, par rapport à la largeur de la page :
`"left"`, `"center"`, ou `"right"`.
*   **vertAlign**    _String_    `"top"`    alignement vertical de l'image. En position absolue, cet alignement se fait par rapport à la hauteur de la page. En position fixe, il est fonction de la hauteur de la fenêtre.
Valeurs acceptées : `"top"`, `"bottom"`, ou `"middle"`.
*   **fadeAfter**    _Mixed_    `1000`    permet de faire apparaître l'image en fondu.
    *   `false` : pas d'effet de fondu.
    *   _Integer_ : l'image apparaîte en fondu, si son chargement s'est terminé après le délai exprimé par cette valeur (en millisecondes).
    *   `0` : l'image apparaît en fondu dans tous les cas.
*   **fadeOptions**    _Object_    `{duration: 1000, frameRate: 25}`    options du fondu. voir le script fade, présenté sur .[http://webbricks.org/bricks/fade](http://webbricks.org/bricks/fade)
*   **zIndex** 	_Integer_    `-1`    profondeur css de l'image
*   **ffHack**    _String_    `"0px"`    Pour une fois, ce n'est pas Internet Explorer mais Firefox qui nous casse les pieds ! Dans les versions anciennes de ce navigateur (<3), il peut arriver que l'image ne soit pas bien calée en haut de la page. On pourra alors indiquer la mesure de ce décalage via cette option, afin que le script le compense.
Je n'ai pas trouvé de solution plus simple, désolé. Je suis preneur de toute idée meilleure.

Démo et bac à sable
===================
Une démo est disponible à cete adresse : http://webbricks.org/bricks/bgMax/

Et un bac (pour essayer différents paramétrage du script) à sable à cette autre adresse : http://webbricks.org/bricks/bgMax/demo.html

Adaptations
===========
Une module Joomla a également été développé pour faciliter l'intégration de bgMax sur cette plateforme. Ça se passe [Par ici](http://www.joomlafrance.org/Les_News/Modules/BgMax%3A_le_background-image_qui_s%27agrandit_avec_votre_navigateur.html). Merci Lomart. 
