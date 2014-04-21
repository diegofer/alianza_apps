define(function (require) {


	"use strict";

	var $           = require('jquery'),
		_           = require('underscore'),
		Backbone    = require('backbone'),
		SedeView    = require('app/views/SedeView');




	return Backbone.View.extend({

		initialize: function() {
			console.log('inicializando sedeListView');
			this.childViews = [];
			this.collection.bind("reset", this.onReset, this);
			this.render();
		},

		onReset: function() {
			this.closeChilds();
			this.render();
		},

		render: function() {

			_.each( this.collection.models, function(sede) {
				var sedeView = new SedeView({model: sede});
    			this.$el.append( sedeView.render() );
            	this.childViews.push(sedeView);
    		}, this );
		},


		closeChilds: function() {
            // remover las views anidadas...
            _(this.childViews).each(function(view) {
                view.close();
            });
        },

	});


});



	