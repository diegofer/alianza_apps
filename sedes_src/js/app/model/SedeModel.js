define(function (require) {

	"use strict";

	var $           = require('jquery'),
		Backbone    = require('backbone');


	return  Backbone.Model.extend({

		urlRoot: "js/app/model/data/sedes.json?v=12",
	});

});