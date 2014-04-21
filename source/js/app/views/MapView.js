define(function (require) {

	"use strict";

	var $            = require('jquery'),
	    _            = require('underscore'),
		Backbone     = require('backbone'),
		L            = require('src/leaflet/leaflet'),
		MakiMarkers  = require('src/leaflet/Leaflet.MakiMarkers'),

		capaCentral       = new L.LayerGroup(),
		capaSurOriental   = new L.LayerGroup(),
		capaMecusab       = new L.LayerGroup(),

		arrayRegiones     = [];





	return  Backbone.View.extend({

		initialize: function() {
			console.log('iniciando MapView');
			this.render();

			this.icon = L.MakiMarkers.icon({icon: "religious-christian", color: "#e82048", size: "m"});
			this.arrayMarkers = [];
		},

		render: function() {
			var mqUrl      = 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
		    	osmAttrib  = 'Map data &copy; <a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		    	mqAttrib   = 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">';

		    var capaBase = L.tileLayer(mqUrl, {
		    	attribution: osmAttrib+' | '+mqAttrib,
				subdomains: ['otile1','otile2','otile3','otile4']
		    });
		   	
		    this.map = L.map(this.el, { center: [4.520855,-74.098308], zoom: 6});
		    this.map.addLayer(capaBase);
		},

		setMarker: function(sede) {

		},

		drawMarker: function(sede) {
			var point = sede.get('latlng');
	        var marker = L.marker([point.lat, point.lng],{icon: this.icon});
	        marker.bindPopup( 'Sede '+ sede.get('sede') + '<br/>' + sede.get('dir') + '<br/>'+ sede.get('ciudad') );
	        return marker;     
	    },

	    showSede: function(sede) {
	    	this.clearMarkers();

	    	var marker = this.drawMarker(sede);

	    	this.map.setView(marker.getLatLng(), 14, {animate:true}); 
	    	this.map.addLayer(marker);

	    	this.arrayMarkers.push(marker);
	    },


	    showRegion: function(name) {

	    	// remover capas del mapa si exiten
	    	this.removeRegion();

	    	// verificar que la capa exista este registrada
	    	for (var i = 0; i < arrayRegiones.length; i++) {

	    		var obj = arrayRegiones[i];
	    		
	    		if (obj.name === name) { 
	    			this.map.addLayer(obj.capa);
	    			return;
	    		};
	    	};


	    	if (name === 'central') {
	    		this.populateRegion(capaCentral, 'Central');
	    		this.map.addLayer(capaCentral);
	    		arrayRegiones.push({name:name,capa:capaCentral}); // registramos la capa region...
	    	};

	    	if (name === 'sur-oriental') {
	    		this.populateRegion(capaSurOriental, 'Sur Oriental');
	    		this.map.addLayer(capaSurOriental);
	    		arrayRegiones.push({name:name,capa:capaSurOriental}); // registramos la capa region...
	    	};

	    	if (name === 'mecusab') {
	    		this.populateRegion(capaMecusab, 'Mecusab');
	    		this.map.addLayer(capaMecusab);
	    		arrayRegiones.push({name:name,capa:capaMecusab});// registramos la capa region...
	    	}; 
	    	console.log(arrayRegiones); 	

	    },


	    populateRegion: function(layer, region) {

    		var regionCollection = this.collection.where({region:region});

    		_(regionCollection).each(function(sede){
    			layer.addLayer( this.drawMarker(sede) );
    		}, this);	
	    },





	    clearMarkers: function() {
		     _(this.arrayMarkers).each(function(marker) {
                marker.unbindPopup();
                marker.clearAllEventListeners(); 
                this.map.removeLayer(marker); 
                this.arrayMarkers.splice(marker);
            }, this);
		},

		removeRegion: function() {
			_(arrayRegiones).each(function(obj){
				this.map.removeLayer(obj.capa);
			}, this);
		}




	});

});