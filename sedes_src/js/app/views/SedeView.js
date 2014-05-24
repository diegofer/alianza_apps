define(function (require) {

	"use strict";

	var $           = require('jquery'),
	    _           = require('underscore'),
		Backbone    = require('backbone'),
		tpl         = require('text!tpl/Sede.html'),

		template    = _.template(tpl);




	return  Backbone.View.extend({

		initialize: function() {		
			console.log('inicializando SedeView');
		},
		
        events: {
            "click": "alClick",
        },

		render: function() {
			this.$el.html( template( this.model.toJSON() ) );		
    		return this.el;
		},

		alClick: function() {
			$('#list-sedes').find('.list-group-item').removeClass('active');
			this.$el.find('.list-group-item').addClass('active');
		}


	});

});