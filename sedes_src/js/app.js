require.config({

	baseUrl: 'js/lib',

	paths: {
		app: '../app',
		tpl: '../tpl',
		src: '../../src'
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	},

	urlArgs: "bust=" + (new Date()).getTime(),
});

require([
	'jquery',
	'backbone', 
	'app/model/SedesCollection', 
	'app/Router'
	], 

	function ($, Backbone, SedesCollection, Router) {


		// Metodo para liberar memoria y remover vistas
		Backbone.View.prototype.close = function() {
	        console.log('cerrando view ' + this.cid);

	        if (this.onClose) this.onClose();            

	        this.remove();
	        this.unbind();   
	    };
	
		//iniciamos con datos cargados...
		var sedesCollection = new SedesCollection();
		sedesCollection.once('sync', initRouter);
		sedesCollection.fetch();//{daType: 'jsonp'}; //jsonp parece que no es necesario

		function initRouter(data) {
			//console.log(data); //muestra los datos recibidos
			window.router = new Router({sedes:data});
		    Backbone.history.start();
		}
	
});


// http://getbootstrap.com/customize/?id=11411095