define(function (require) {

	"use strict";

	var $                = require('jquery'),
		Backbone         = require('backbone'),

		MapView          = require('app/views/MapView'),
		SedeListView     = require('app/views/SedeListView'),
		SearchView       = require('app/views/SearchView');


	return  Backbone.Router.extend({

		
		initialize: function(data) {

			console.log('iniciando router');

			this.sedes = data.sedes;

			this.mapView = new MapView({
				el: $('#map'),
				collection: this.sedes
			});

			var listProvider =  new Backbone.Collection(data.sedes.slice(0,5)); // le saco una copia a la collecion para alimentar la lista
			
			var sedeListView = new SedeListView({
				el: $('#list-sedes'),
				collection: listProvider
			});

			var searchView = new SearchView({ 
	    		el:$('#input-search'),
	    		collection: data.sedes,
	    		lisProvider: listProvider
	    	});

		},

		routes: {
			''             : 'inicio',
			'sede/:id'     : 'sedeDetalle',
			'region/:name' : 'regionDetalle'
		},

		inicio: function() {
			this.mapView.removeRegion();
			this.mapView.map.setView(L.latLng(4.520855,-74.098308), 6, {animate:true}); 	
		},

		sedeDetalle: function(id) {
			var sede = this.sedes.findWhere({cod:id});				
			this.mapView.showSede(sede);
		},

		regionDetalle: function(name) {
			this.mapView.showRegion(name);
		}


	});

});