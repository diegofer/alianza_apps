define(function (require) {

	"use strict";

	var $            = require('jquery'),
	    _            = require('underscore'),
		Backbone     = require('backbone'),
		L            = require('src/leaflet/leaflet'),

		capaColombia      = new L.LayerGroup(),
		capaCentral       = new L.LayerGroup(),
		capaSurOriental   = new L.LayerGroup(),
		capaMecusab       = new L.LayerGroup(),
		capaPacifico      = new L.LayerGroup(),
		capaSur           = new L.LayerGroup(),
		capaValle           = new L.LayerGroup();


		var R_CENTRAL       = 'central',
			R_SURORIENTAL   = 'sur-oriental',
			R_MECUSAB       = 'mecusab',
			R_PACIFICO      = 'pacifico',
			R_SUR           = 'sur',
			R_VALLE           = 'valle';

		var arrayRegiones   = [];

		var regiones = {
			'central'      : { 'name': R_CENTRAL, 'center':{'lat':7.3841, 'lng':-75.6518}, 'zoom': 7, 'path': 'sr`X`dzmMgmMePmxi@jqdCuvYsb^aep@smTs`v@_e_@mwy@~oUkcj@_~[_viAhvIyxk@~re@icAfppAqzmBfjp@yhTgnc@g`PrqGokEgjp@mie@umTcsmBfr}By}[o|SgiSk}Aa`GqeKmbMaxGjQibH~qUiG{{CbyL`gEtpAxtQps@nhAacIvH_nJweCskI_|P}_CybWvOif^xiD{s^`wJenMljTkgLuxJmpH}`l@uodC{hyBu`R}xeAw{s@ivI__oB_mEudoA}nr@jznB}byAxifCsmT`}s@~zK`ok@inc@bvdA{wFznRiqEfeMvoHx_UtoHnkAxcYveK`iGvzMc~EzbRi`]|bRufQh{^y{DfwKwfFd~FhjB~q@xlJ~gPfqBr~BqiAluJl|Gde[y~T{uFwmIwjK{rBybDcxGtiK{mDveNfhKtkKq`CvqKt_EjgU}|I`{NyVpXm|S{pu@mw}@n{v@{iKdw|A|~eBbkeArwg@z}mA~zKr_nA?jfRhdPgyK|d_@x_EtfV`~ProPzfDjpDsQrlKzbExeElKvrI`jIzoGpzNaxBhrIlwFxoOwwDxzH|yFzyKnqA|cE`WtcAgk@pjFjgEbsAzb@rfEsl@j{Af_Brd@nvEfvAtn@xQx_AhjDdnD`bBl|AjtF}Lj~FjoIjzYzdCb}Dh[rhAkd@|t@xfCbcF~`Bpl@d}B~uA``@|_AaUxjGjwE|bDfDx_Aj`DraAhO[ltApkAkPbr@lnB|iBxK`AdfCgoAf`@' },
			'sur-oriental' : { 'name': R_SURORIENTAL, 'center':{'lat':2.2960, 'lng':-75.3085}, 'zoom': 7, 'path':'waaSxqmfMu_e@ucAwsn@spd@{`Od~Em{DxpNe|[{M}u`@cyGmqKrrIlnDliSkmNpbWwh@`xU{ji@mjMmkh@zRmyUcqKgz_AkcC}iUnLqbBvqP`Edid@t_Ylq\nqLfg^leKycExuLvhJ|mK{lF`dW~}Jpa\pwE`xZpb\h`_@lqClca@z_Unri@lmSngv@rrc@`dE{h@fcPf_Fh|[r{CldXxv@tlEvX~z@fsDjzKucArpCfsDfmR}eMzqKnr@fl_@}kb@qGujDhuEi}Lz}EcP`sDnr@`fQdaKhyC~eBz|LcwBjtLrqGs~IfaKojDhvIfwQhvI{eBdeIz{SrtWkqGdsOqjDka@qcAtxJhxJbPtwF~lEjyCk}AltLjdEjyCtjDjxJka@`wBbiGmuEnyCcP`pJpfFpuEdoFglAj}AtcA~}E{tA~aDbiGfgJbPfnM{~IfnM{aZjcL}i@}lEo`GjjOnr@ghCsfQbsD{{DscAsqGfuPoyCjdSuzAtpm@x_Sz`SjJfiMqof@f|Npy{@{cVrua@uwy@|DafKh|YbsRref@tkQhoBy}FnnKhwTlnWjud@_mK~phAj`ZltDuvR~oi@nhFd~Oe_E|iEwhaAq@oyx@kuWsmFoeIsbWhxUmdj@rmw@_zu@~cZcrfBymO}fMpgj@{y|@azMo`Qlla@ufK~ja@y`_Ae}[y`iB`ih@qwyB{vM}ek@ryf@kgrAqxa@gw[kvr@iibC_fjAoyqAoka@tbsAaqpAlvaAanoAht_B_cHt{h@f}q@te|@icw@dzq@{jsAlsw@ml@r|~@krn@ncmBuvy@dzFalZ~gWik~@epY}cj@fmLghJlss@'},
			'mecusab'      : { 'name': R_MECUSAB, 'center':{'lat':4.7935, 'lng':-73.9682}, 'zoom': 7, 'path': 'obyY|d{gMqkT_{Kywi@~eBuxv@onMkva@ytAiuQbwBqme@clL}}]ioFyvJor@cnF~lE{zDesOqvBceIzzDywQwtQouPtn^_tHpcId~EtaPelL~gKja@vlUicm@ime@yhh@zwb@whh@j{Lor@~aPonMto^_mElnF~lEzsXrjDxgCyeX`n]weXqtA{bHx{Lm|Sy{L_{KdnbBr_NszSxhh@bjDl_d@ern@jvIvvBrmTxmUhkSzyb@ogJfyZrlq@n~MxeXcP~aOfwYbzRpuI_fBz`OhyYomM~eB_hCblLeaf@nr@atPsxJidIbPevQjdP~jLbzRmoNx~TptArfQ'},
			'pacifico'     : { 'name': R_PACIFICO, 'center':{'lat':2.156141, 'lng':-77.802228}, 'zoom': 7, 'path': 'k~yWvquwMm~MucAk~M}yh@`nU_~[fjDspd@deQsia@mgRgjp@ipV?akc@hkSguIi`]pvvA{hyBvxx@rpd@~kc@rqGje`@~lEfjVztAqcAljZc`GdeImsHrwg@|vBxbH|fJ_tHn|[xpNkr@tfQulErmTm{S~eBzfJxs^ncPbwB}~Mxs^nkLr{ZgqGxpNhyCd~Ew}TngJ~vBluPgqGnr@me`@g`]esWypNqmMumTyb_@?y`OirV_hC~sHtoN~hRijDrfQouIdPgwY_pU~gCltm@'},
			'sur'          : { 'name': R_SUR, 'center':{'lat':1.8425, 'lng':-77.3849}, 'zoom': 7, 'path': 'yhxR`wfxMlcPicm@qcA}nr@xuI}oUmcPka@ulEsb^bqVioF?_lb@qug@i}LnsHqst@r|L_wXz~MhoFjzZi}L`_N?vlTs{ZfxJstWvjb@|aOjhR_fBhxJ~lEevXtmTbtf@fjp@ycP~vXn{x@hkSia@hrVj}[~lEb{Z_{KxzK_pU`dPivIha@smT`kSu_Nhj_A~aOp_NhhCnfQguf@f}Lf`]tcAh|i@erVrmTsgo@jhCuvXr_NtvXhcm@zaOrcAqqG~aObrVrtWnfQihCdkSs_NzvXrfQnst@~zKpia@_iRtqG~zK_tHpvdAeqs@ihC}zKrwg@gkSja@foFfnc@o{Z|c|@u`l@ttWfvI|hRy~y@rdkAore@|re@okb@i`]zsHqzw@ygmAfyYydlAstWysW{byAxsWufQeoU}}[qa|@iuf@'},
			'valle'        : { 'name': R_VALLE, 'center':{'lat':3.797830, 'lng':-76.182090}, 'zoom': 7, 'path': ''}

		};





	return  Backbone.View.extend({

		initialize: function() {
			console.log('iniciando MapView');
			this.render();

			this.icon = L.icon({
			    iconUrl: 'img/marker.png',
			    //iconRetinaUrl: 'my-icon@2x.png',
			    iconSize: [30, 35],
			    iconAnchor: [10, 35],
			    popupAnchor: [1, -35],
			    //shadowUrl: 'my-icon-shadow.png',
			    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
			    //shadowSize: [68, 95],
			    //shadowAnchor: [22, 94]
			});


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
			
			var mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            var osmAttribution = '©<a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors';
            var capa = new L.tileLayer(mapUrl, {maxZoom: 19, attribution: osmAttribution});

		   	
		    this.map = L.map(this.el); // no le doy la ubicacion para no entrar en conflicto cuando se recarga la pagina desde otra coordenada
		    this.map.addLayer(capa);
		},

		setMarker: function(sede) {

		},

		drawMarker: function(sede) {
			var point = sede.get('latlng');
	        var marker = L.marker([point.lat, point.lng],{icon: this.icon});
	        marker.bindPopup( '<strong>Sede '+ sede.get('sede') + '</strong><br/>' + sede.get('dir') + '<br/>'+ sede.get('ciudad') + '<br/>'+ 'Tel. ' + sede.get('tel') );
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

	    	var region = regiones[name],
	    		center = L.latLng(region.center.lat, region.center.lng);

	    	// remover capas del mapa si exiten
	    	this.removeRegion();

	    	// verificar que la capa  este registrada
	    	for (var i = 0; i < arrayRegiones.length; i++) {

	    		var obj = arrayRegiones[i];
	    		
	    		if (obj.name === name) { 
	    			this.addCapa(obj.capa, center, region.zoom);
	    			return;
	    		};
	    	};


	    	if (name === R_CENTRAL) {
	    		this.populateRegion(capaCentral, 'Central');
	    		this.addCapa( capaCentral, center, region.zoom )
	    		arrayRegiones.push({name:name, capa:capaCentral}); // registramos la capa region...
	    	};

	    	if (name === R_SURORIENTAL) {
	    		this.populateRegion(capaSurOriental, 'Sur Oriental');
	    		this.addCapa( capaSurOriental, center, region.zoom )
	    		arrayRegiones.push({name:name, capa:capaSurOriental}); // registramos la capa region...
	    	};

	    	if (name === R_MECUSAB) {
	    		this.populateRegion(capaMecusab, 'Mecusab');
	    		this.addCapa( capaMecusab, center, region.zoom )
	    		arrayRegiones.push({name:name, capa:capaMecusab});// registramos la capa region...
	    	}; 

	    	if (name === R_PACIFICO) {
	    		this.populateRegion(capaPacifico, 'Pacifico');
	    		this.addCapa( capaPacifico, center, region.zoom )
	    		arrayRegiones.push({name:name, capa:capaPacifico});// registramos la capa region...
	    	};

	    	if (name === R_SUR) {
	    		this.populateRegion(capaSur, 'Sur');
	    		this.addCapa( capaSur, center, region.zoom )
	    		arrayRegiones.push({name:name, capa:capaSur});// registramos la capa region...
	    	};

	    	if (name === R_VALLE) {
	    		this.populateRegion(capaValle, 'Valle');
	    		this.addCapa( capaValle, center, region.zoom )
	    		arrayRegiones.push({name:name, capa:capaValle});// registramos la capa region...
	    	};

	    },

	    showColombia: function() {

	    	_(this.collection.models).each(function(sede){
	    		capaColombia.addLayer( this.drawMarker(sede) );
	    	}, this);
	    	this.addCapa(capaColombia, L.latLng(4.520855,-74.098308), 6);

	    },

	    addCapa: function(capa, latLng, zoom) {
	    	this.map.addLayer(capa);
	    	this.map.setView(latLng, zoom)
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
		},

		removeColombia: function() {
			this.map.removeLayer(capaColombia);
		}




	});

});