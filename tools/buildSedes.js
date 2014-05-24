{
	appDir:  '../sedes_src',

	dir: '../sedes',

	mainConfigFile: '../sedes_src/js/app.js',

	stubModules: ['text'],
	removeCombined: true,
	optimizeCss: "standard",

	modules: [
		{
			name: 'app',
		}
	],

	uglify: {
        max_line_length: 1000,        
    },
}