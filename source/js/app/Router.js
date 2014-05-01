define(function (require) {

	"use strict";

	var $                = require('jquery'),
		Backbone         = require('backbone'),
		bootstrap        = require('src/bootstrap/js/bootstrap.min'),

		MapView          = require('app/views/MapView'),
		SedeListView     = require('app/views/SedeListView'),
		SearchView       = require('app/views/SearchView');

	var $menuItems = $('#menu-principal').find('li');


	return  Backbone.Router.extend({

		
		initialize: function(data) {

			console.log('iniciando router');

			this.sedes = data.sedes;

			this.mapView = new MapView({
				el: $('#map'),
				collection: this.sedes
			});

			var listProvider =  new Backbone.Collection(); // le saco una copia a la collecion para alimentar la lista
			
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
			this.selectMenuItem('home');
			this.clearSelectLisItem();
			this.mapView.clearMarkers();
			this.mapView.removeRegion();
			this.mapView.map.setView(L.latLng(4.520855,-74.098308), 6, {animate:true}); 	
		},

		sedeDetalle: function(id) {
			this.selectMenuItem('home');
			this.mapView.removeRegion();
			var sede = this.sedes.findWhere({cod:id});				
			this.mapView.showSede(sede);
		},

		regionDetalle: function(name) {
			this.selectMenuItem(name);
			this.clearSelectLisItem();
			this.mapView.clearMarkers();
			this.mapView.showRegion(name);	
		},

		selectMenuItem: function(menuItem) {
			$menuItems.removeClass('active');

			if (menuItem) {
                $('#' + menuItem).addClass('active');
            }
		},

		clearSelectLisItem: function() {
			$('#list-sedes').find('.list-group-item').removeClass('active');
		}





	});

});