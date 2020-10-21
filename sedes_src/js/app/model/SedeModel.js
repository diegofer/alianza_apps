define(function (require) {

	"use strict";

	var $           = require('jquery'),
		Backbone    = require('backbone');


	return  Backbone.Model.extend({

		urlRoot: "https://mialianza.laalianzacristiana.co/api/directorio/getIglesias", //"js/app/model/data/sedes.json?v=14",
	});

});