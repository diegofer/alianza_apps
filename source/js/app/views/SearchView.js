define(function (require) {

	"use strict";

	var $           = require('jquery'),
		Backbone    = require('backbone');


	return Backbone.View.extend({

		initialize: function(options) {

			console.log('inicializando searchView');
				
			this.sedesArray = this.collection.toJSON();
			this.listProvider = options.lisProvider;
		},

		events: {
            "keyup": "search",
        },

        search: function(event) {
			if (/^\s+$/.test(event.target.value) || event.target.value == '' ) {
				console.log('no hay nada para buscar');	
				return;
			};

			this.findByCity(event.target.value);			
        },

        findByCity: function (searchKey) {
        	//var key = this.omitirAcentos(searchKey);
        	//console.log(key);
          
            var results = this.sedesArray.filter(function (element) {
                var ciudad = element.ciudad;//this.omitirAcentos(element.ciudad);
                return ciudad.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });

            var firstTen = results.splice(0,30);
            this.listProvider.reset(firstTen);
        },

        omitirAcentos: function(text) {
		    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
		    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
		    for (var i=0; i<acentos.length; i++) {
		        text = text.replace(acentos.charAt(i), original.charAt(i));
		    }
		    return text;
		}

	});


});



	