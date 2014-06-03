define(function (require) {

	"use strict";

	var $           = require('jquery'),
		Backbone    = require('backbone'),

		sedeModel   = require('app/model/SedeModel');


	return  Backbone.Collection.extend({

		model: sedeModel,
		url: "js/app/model/data/sedes.json?v=14",
	});

});