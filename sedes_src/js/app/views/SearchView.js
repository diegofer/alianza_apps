define(function (require) {

	"use strict";

	var $           = require('jquery'),
		Backbone    = require('backbone');


	return Backbone.View.extend({

		initialize: function(options) {

			console.log('inicializando searchView');
				
			this.sedesArray = this.collection.toJSON();
			//console.log(this.sedesArray);
			this.listProvider = options.lisProvider;
		},

		events: {
            "keyup": "search",
        },

        search: function(event) {
			if (/^\s+$/.test(event.target.value) || event.target.value == '' ) {
				console.log('no hay nada para buscar');	
				this.listProvider.reset();
				return;
			};

			this.findByCity(event.target.value);			
        },

        findByCity: function (searchKey) {
			
			var key = this.cleanText(searchKey);

            var results = this.sedesArray.filter(function (element) {
				
				var nombre =   this.cleanText(element.nombre); 
				var direccion = this.cleanText(element.direccion);

				if ( (nombre.indexOf(key) > -1) || (direccion.indexOf(key) > -1) ) { 
					return true; 
				}

                return false;
            }, this);

			var firstTen = results.splice(0,10);
			console.log(firstTen);
            this.listProvider.reset(firstTen);
		},
		

		cleanText: function(str) {
			//convertir todo a minúsculas y quitar acentos y eñes..
			return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");			
		},
		

	});


});



	