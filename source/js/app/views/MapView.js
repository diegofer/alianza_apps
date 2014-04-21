define(function (require) {

	"use strict";

	var $            = require('jquery'),
	    _            = require('underscore'),
		Backbone     = require('backbone'),
		L            = require('src/leaflet/leaflet'),
		MakiMarkers  = require('src/leaflet/Leaflet.MakiMarkers');



	return  Backbone.View.extend({

		initialize: function() {
			console.log('iniciando MapView');
			this.render();
			console.log(this.collection);

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

	    showMarker: function(sede) {
	    	this.clearMarkers();
	    	var marker = this.drawMarker(sede);
	    	this.map.addLayer(marker);
	    	this.arrayMarkers.push(marker);
	    },


	    clearMarkers: function() {
		     _(this.arrayMarkers).each(function(marker) {
                marker.unbindPopup();
                marker.clearAllEventListeners(); 
                this.map.removeLayer(marker); 
                this.arrayMarkers.splice(marker);
            }, this);
		}




	});

});