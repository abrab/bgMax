/**
 * bgMax
 * =============================================================================
 * ajustes les dimensions d'une image en fonction de celles de la fenêtre
 * (conçu en particulier pour émuler des images de fond de page)
 * 
 * @author      Erwan Lefèvre <erwan.lefevre@gmail.com>
 * @copyright   Erwan Lefèvre 2009
 * @license     Creative Commons - Paternité 2.0 France - http://creativecommons.org/licenses/by/2.0/fr/
 * @version     v1.1.1 / 2011-01-09
 * @see			http://webbricks.org/bricks/bgMax/
 
 * @compatible	au 19 décembre 2010, compatibilité assurée pour :
 *				Firefox 1.5+, Internet Explorer 5.5+, Opéra, Safari, Chrome
 */


(function(window,document){
	
	/**
	 * @var			ieVer		{Float}		le n° de version d'IE (ou null)
	 */
	var ieVer = navigator.appVersion.match( /MSIE/i ) ? navigator.appVersion.replace( /.*?MSIE ([^;]+);.*/i, "$1" ) : null;
	
	
	
	/**
	 * transfer
	 * 
	 * Retourne un objet contenant les propriétés et méthodes de l'objet /dest/,
	 * complétées et/ou écrasées par celles de l'objet /source/
	 *
	 * @param       source       {object}        l'objet source
	 * @param       dest         {object}        l'objet de destination
	 * @return      {object}
	 *
	 * =============================================================================
	 */ 
	function transfer (source, dest) {
		var prop, transfered={};
		for ( prop in dest ) { transfered[prop] = dest[prop]; }
		for ( prop in source ) { transfered[prop] = source[prop]; }
		return transfered; 
	}
	
	
	
	/**
	 * byTN()
	 * 
	 * raccourci pour [element].getElementsByTagName()
	 * retourne l'élément html de type /tagName/
	 *
	 * @param		tagName		{String}		Le type d'éléments recherché
	 *
	 * @returns		{HTMLCollection}
	 * 
	 * =============================================================================
	 */
	function byTN(tagName,container) {
		return (container||document).getElementsByTagName(tagName) ;
	}
	
	
	
	
	
	/** 
	 * winDim v2.0.1, 2010-07-07
	 * 
	 * retourne les dimentions intérieurs de la fenêtre
	 *
	 * @returns		{Object}
	 * 
	 * =============================================================================
	 */
	function winDim() {
		var w,h,
			i = window,
			d = document,
			de = d.documentElement,
			db = d.body;
			
		if ( i.innerWidth ) { // autres que IE
			w = i.innerWidth;
			h = i.innerHeight;
		} else if ( de.clientWidth ) { // IE8
			w = de.clientWidth;
			h = de.clientHeight;
		}
		else { // IE6
			w = db.clientWidth;
			h = db.clientHeight;
		}
	
		return {'w':w, 'h':h} ;
	}
	
	
	
	
	/** 
	 * pageDim() 
	 * 
	 * retourne les dimentions de la page
	 *
	 * @return		{Object}		{'w','h'}
	 * 
	 * =============================================================================
	 */
	function pageDim() {
		var d = document,
			dE = d.documentElement,
			dB = d.body,
			w, h;
			
		// firefox is ok
		h = dE.scrollHeight;
		w = dE.scrollWidth;
		
		// now IE 7 + Opera with "min window"
		if ( dE.clientHeight > h ) { h  = dE.clientHeight; }
		if ( dE.clientWidth > w ) { w  = dE.clientWidth; }
		
		// last for safari
		if ( dB.scrollHeight > h ) { h = dB.scrollHeight; }
		if ( dB.scrollWidth > w ) { w = dB.scrollWidth; }
	
		return {'w':w, 'h':h} ;
	}
	
	
	
	
	/**
	 * addEvent()
	 * 
	 * ajoute la fonction /fn/ à la pile de résolution de l'événement /evenType/ de
	 * l'objet /obj/
	 * 
	 * merci à : http://www.scottandrew.com/weblog/articles/cbs-events
	 *
	 * @param		{Mixed}				obj			window, ou document, ou un élément HTML
	 * @param		{String}			evType		type d'event (click, mouseover, mouseout, etc.	)
	 * @param		{String}			fn			la fonction à ajouter
	 * @param		{Boolean}			useCapture	"useCapture un booléen : true pour la phase de capture, ou false pour la phase de bouillonnement et la cible. On utilise quasiment toujours la valeur false." (cf : http://www.alsacreations.com/article/lire/578-La-gestion-des-evenements-en-JavaScript.html)
	 * 
	 * @returns		void
	 * 
	 * =============================================================================
	 */
	function addEvent (obj, evType, fn, useCapture){
		if (obj.addEventListener) { obj.addEventListener(evType, fn, useCapture); }
		else { obj.attachEvent("on"+evType, fn); }
	}
	
	
	
	
	/** 
	 * setStyle v1.0
	 * 
	 * Modifie l'attribut style de l'élément /element/, selon le tableau associatif /styles/.
	 *
	 * @param           elem            {HTMLElement}           l'élément dont on veut modifier les styles
	 * @param           styles          {Object}                définition (javascript) des styles à appliquer à l'élément
	 * @returns         {void}
	 * 
	 * =============================================================================
	 */
	function setStyle(elem, styles) { // 58 octets
		for (var prop in styles) {
			elem.style[prop] = styles[prop];
		}
	}
	
	
	
	
	/**
	 * setOpacity
	 * 
	 * règle l'opacité d'un élément
	 *
	 * @param       elem            {element}       l'élément à traiter
	 * @param       value           {float}         valeur souhaitée (0=transparent, 1=opaque)
	 * @return      string
	 *
	 * =============================================================================
	 */
	function setOpacity(elem, value) {
		value = (value == 1)?0.99999:value;
	
		elem.style.opacity = value;
		elem.style.filter = 'alpha(opacity=' + value*100 + ')';
		elem.style.MozOpacity = value;
		elem.style.KhtmlOpacity = value;
	}
	
	
	
	
	/**
	 * fade()
	 * 
	 * permet d'effectuer une animation d'opacité sur un élément HTML
	 *
	 * @requires	setOpacity
	 *
	 * @param		{HTMLelement}	elem			l'élément HTML à animer
	 * @param		{float}			to				l'opacité finale (0=transparent, 1=opaque)
	 * @param		{float}			from			l'opacité initiale
	 * @param		{integer}		duration		la durée de l'animation, en millisecondes
	 * @param		{object}		options			tableau associatif contenant les options supplémentaires :
	 * 														-   duration : integer - durée de l'animation, en millisecondes
	 * 														-	frameRate : integer - nombre d'images par secondes
	 * 														-	onFinish : function - fonction à appeler à la fin de l'animation
	 * 
	 * @returns		{void}
	 * =============================================================================
	 */
	function fade (elem, to, from, options) {
		
		// initialisation des paramètre principaux
		this.elem = elem || document.body;
		this.to = to!==undefined ? to : 1;
		var st = this.elem.style;
		this.from = (from===undefined ? ( !st.opacity&&st.opacity!==0 ? (this.to>0?0:1) : parseFloat(st.opacity) ) : from);
		
		// initialisation des options
		options = options || {};
		this.duration = options.duration || 500;
		this.frameRate = options.frameRate || 30;
		this.onFinish = options.onFinish;
		
		// calculs pour découpage de l'animation en plusieurs étapes
		this.totalFrames = Math.ceil(this.duration/1000*this.frameRate);
		this.perFrame = (this.to-this.from)/this.totalFrames;
		this.frameNb = 0;
		
		// utile pour les setTimeout
		var self = this;
	
	
	
		/**
		 * next
		 * -------------------------------------------------------------------------
		 * lance l'étape suivante de l'animation
		 * 
		 * @returns		{void}
		 * 
		 */
		this.next = function () {
			this.prog = setTimeout (
				function(){self.frame();},
				1000/this.frameRate
			);
		};
			
		
		/**
		 * frame()
		 * -------------------------------------------------------------------------
		 * exécute une étape de l'animation
		 */
		this.frame = function () {
			// règle l'opacité de l'élément
			setOpacity(this.elem, this.from + this.perFrame*this.frameNb);
			
			// si anim terminée
			if ( this.frameNb===this.totalFrames ) {
					setOpacity(this.elem, this.to);
					if (typeof this.onFinish=='function') { setTimeout(this.onFinish,1); } // fonction callback
					}
					
			// sinon lancer le frame suivant
			else {
					this.frameNb++;
					this.next();
			}
		};
		
		
		// lancer la première étape de l'anim
		this.next();
	}
	
	
	
	
	
	/**
	 * redimArea v1.2 / 2010-06-26
	 * 
	 * retourne les mesures /{w,h}/ de /src_w/ et /scr_h/, après redimentionnement homotétique
	 * d'après les critères /mesures{max_w, min_w, max_h, max_h}/
	 *
	 * @param		{Integer}		src_w		largeur de la surface à redimentionner
	 * @param		{Integer}		src_h		hauteur de la surface à redimentionner
	 * @param		{Object}		mesures		mesures maximales et/ou minimales pour
	 *											la largeur et/ou la hauteur
	 *
	 * @returns		{Object}
	 *											
	 * =============================================================================
	 */
	function redimArea (src_w, src_h, options) {
		
		// initialisations
		
			var max_w, min_w, max_h, min_h, // contraintes données en options
				round,						// option indiquant d'arrondir les dimensions obtenues
				wh, hw,						// rapports de proportion de la surface
				height, width;				// dimensions finales de la surface
			
			// mesures souhaitées
			options = options || {};
			max_w = options.max_w;
			min_w = options.min_w;
			max_h = options.max_h;
			min_h = options.max_h;
			
			// autres options
			round = options.round===undefined ? 1 : options.round; // pour rétrocompatibilité : undefined=>true
		
			// calcul du rapport largeur/hauteur de la source
			wh = src_w / src_h ;
			hw = src_h / src_w ;
			
			// par défaut, garder les mesures initiales
			height = src_h ;
			width = src_w ;
			
		// redimentionnements
			
			// agrandissement largeur
			if ( width < min_w ) {
				width = min_w;
				height = width * hw ;
			}
			
			// agrandissement hauteur
			if ( height < min_h ) {
				height = min_h;
				width = height * wh ;
			}
		
			// réduction largeur
			if ( max_w && (width > max_w) ) {
				width = max_w;
				height = width * hw ;
			}
		
			// réduction hauteur
			if ( max_h && (height > max_h) ) {
				height = max_h;
				width = height * wh ;
			}
			
		// valeurs négatives interdites
			width = width<0 ? 0 : width;
			height = height<0 ? 0 : height;
		
		return {
			w : round ? Math.round(width) : width,
			h : round ? Math.round(height) : height
		};
	}
	
	
	
	
	
	/**
	 * bgMax    v1.1.1 / 2011-01-09
	 * 
	 * ajustes les dimensions d'une image en fonction de celles de la fenêtre
	 *
	 * @requires		addEvent, byTN, fade, ieVer, pageDim, redimArea, setOpacity, setStyle, transfer, winDim
	 * 
	 * =============================================================================
	 */
	var bgMax = {
		
		/*
		 * @var defaults
		 *
		 * options par défaut
		 *
		 * -------------------------------------------------------------------------
		 */
		defaults : {
			mode : 'max',			// string - max (occuper toute la largeur de la fenêtre, quite à déborder dans la hauteur) | full (toute l'image est visible, et aussi grande que possible)
			enlarge : 1,			// boolean - autorise ou non à agrandir l'image au dessus de ses dim réelles
			reduce: 1,				// boolean - autorise ou non à réduire l'image au dessus de ses dim réelles
			ffHack : 0,				// String - décalage vers le haut à appliquer au body, pour Firefox<3.
			zIndex : -1,			// integer - profondeur du bloc-image
			position : 'absolute',	// string - positionnement de l'image (absolute|fixed)
			align : 'center',		// string - alignement horizontal de l'image ("left", "right", "center")
			vertAlign : 'top',		// string - alignement vertical de l'image ("top", "bottom", "middle")
			fadeAfter : 400,		// integer - indique de faire apparaître l'image en fondu, si elle n'est pas chargée à l'issue de ce délai, exprimé en millisecondes
													// 0 : pour faire un fondu dans tous les cas
													// false : pour interdire le fondu
			fadeOptions : {			// Object - options du fondu. Voir les options de fade.js : http://webbricks.org/bricks/fade/
				duration : 1000,
				frameRate : 25
			}
		},											
		
		/**
		 * redim
		 *
		 * redimentionne l'image de façon proportionnelle
		 *
		 * @access		protected
		 * @returns		void
		 * 
		 * -------------------------------------------------------------------------
		 */
		redim : function () {
			// préparatifs
			var self = bgMax,
				img,								// l'élément image manipulé
				options,							// options
				win = winDim(),						// mesure de la fenêtre
				relTo,								// pour le centrage vertical, hauteur de la fenêtre ou de la page, selon le cas
				imgTop, imgBottom, imgLeft, imgRight,		// positionnement de l'image
				imgDim,								// mesures de l'image
				max_W, max_H, min_W, min_H;			// contraintes de mesures pour l'image
			
			img = self.img;
			imgTop = imgBottom = imgLeft = imgRight = '';
			options = self.opt;
			imgDim = img.fileDim;
			
			if (imgDim) {
				// dimentionnement de l'image
				
					// établir les mesures max/min, horiz/vert
					
						// mode "full" (toute l'image est visible, et aussi grande que possible)
						if (options.mode == 'full') {
							max_W = min_W = win.w;
							max_H = min_H = win.h;
							if (!options.enlarge) {
								if (max_W > imgDim.w) { max_W = min_W = imgDim.w; }
								if (max_H > imgDim.h) { max_H = min_H = imgDim.h; }
							}
							if (!options.reduce) {
								if (min_W < imgDim.w) { min_W = imgDim.w; max_W = Math.max(min_W, max_W); }
								if (min_H < imgDim.h) { min_H = imgDim.h; max_H = Math.max(min_H, max_H); }
							}
						}
						
						// mode "max" (occuper toute la fenêtre, quite à déborder)
						else {
							min_W = max_W = win.w;
							min_H = max_H = 0;
							if (!options.reduce) {
								max_W = 0;
							}
							// on ne traite pas options.enlarge qui est sous-entendu à 1
						}
		
					// optimiser la surface
					imgDim = redimArea(imgDim.w, imgDim.h, {
						min_w : min_W,
						win_h : min_H,
						max_w : max_W,
						max_h : max_H,
						round : 1
					});
					
					// appliquer les dimensions
					img.width = imgDim.w;
					img.height = imgDim.h;
					if ( !img.width ) { img.removeAttribute( "width" ); } // pour ne pas mettre à "0"
					if ( !img.height ) { img.removeAttribute( "height" ); }
					
				// positionnement de l'image
					
					// calcul de la position horizontale
					switch (options.align) {
						case 'left' :
							imgLeft = '0px';
							break;
						case 'right' :
							imgRight = '0px';
							break;
						default :
							imgLeft = -Math.round((imgDim.w - win.w)/2) + 'px';
					}
					
					
					// calcul de la position vericale
					if (options.vertAlign=='bottom') {
						imgBottom = '0px';
					}
					else if (options.vertAlign=='middle') {
						relTo = options.position == "fixed" ? win.h : pageDim().h;
						imgTop = ( -options.ffHack + ( relTo - img.offsetHeight ) / 2 ) + "px";
					}
					else {
						imgTop = img.hack||'0px';
					}
					
					// positionnement effectif
					setStyle(img,{
						left : imgLeft,
						right : imgRight,
						top : imgTop,
						bottom : imgBottom
					});
			}
		},
													
		
		/**
		 * show
		 *
		 * affiche l'image
		 *
		 * @access		protected
		 * @returns		void
		 * 
		 * -------------------------------------------------------------------------
		 */
		show : function() {
			
			var self = bgMax,
				img;
				
			img = self.img;
			
			// relever les mesures normales de l'image
			img.fileDim = {
				w : img.naturalWidth || img.clientWidth, // deux méthodes, pour assurer les défauts de chaque navigateur
				h : img.naturalHeight || img.clientHeight
			};
			
			// redimentionner l'image
			self.redim();
			
			// faire apparaître l'image
			if (self.fadeIt) { fade(self.img,1,0,self.opt.fadeOptions); }
			else { setOpacity(img,1); } // parfois inutile, mais est-ce la peine de mettre une condition ?
		},
		
		/**
		 * init
		 *
		 * initialise le script
		 * 
		 * @access		public
		 *
		 * @param		src			{String}		url de l'image
		 * @param		options		{Object}		tableau associatif des options (voir this.defaults)
		 *
		 * @returns		void
		 * 
		 * -------------------------------------------------------------------------
		 */
		init : function (src, options) {
			
			var self = bgMax,
				body = byTN('body')[0],
				fadeAfter,
				img,
				ff;  // version de Firefox
		
			options = transfer(options, this.defaults);
			if ( ieVer && ieVer < 7 ) { options.position = 'absolute'; } // fallback pour ie<7, qui ne gère pas le positino:fixed
			self.opt = options;
			fadeAfter = options.fadeAfter;
			img = self.img = document.createElement('img');
			
			img.id = "bgMax";
			
			setStyle(img,{
				zIndex : options.zIndex,
				position : options.position
			});
			
			// hack pour Firefox<3 (pour une fois, c'est Firefox !)
			ff = navigator.userAgent.match(/Firefox.(\d+(\.\d+))/);
			if (ff && parseFloat(ff[1]) < 3) {
				setStyle(body,{
					zIndex : 0,
					position : 'relative',
					top : 0,
					left : 0
				});
				img.hack = '-'+options.ffHack;
			}
			
			//body.appendChild(img);
			body.insertBefore(img, body.childNodes[0]);
			img.onload = self.show;
			
			if (fadeAfter!==false) {
				setOpacity(img,0);
				if (fadeAfter) {
					setTimeout(function(){
						self.fadeIt = 1;
					},fadeAfter);
				}
				else {
					self.fadeIt = 1;
				}
				
			}
			
			addEvent(window,'resize',self.redim);
			
			img.src = src;
		}
	};
	
window.bgMax = bgMax;
})(window,document);
