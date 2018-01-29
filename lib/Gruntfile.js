module.exports = function (grunt) {

	grunt.loadNpmTasks("grunt-contrib-copy")
	grunt.loadNpmTasks("grunt-contrib-clean")
    
    
	grunt.initConfig({
		clean: {
			options: { force: true },
			public: ["../public"]
		},
		copy: {
			dev: {
				files: [{
					expand: true,
					cwd: "../",
					src: [
						"index.html",
						"styles.css",
						"app/trips/img/*",
						"app/auth/img/*",
						"app/auth/partials/**/*.html",
						"app/navigation/partials/**/*.html",
						"app/trips/partials/**/*.html",
						"lib/node_modules/firebase/firebase.js",
						"lib/node_modules/jquery/dist/jquery.min.js",
						"lib/node_modules/angular/angular.min.js",
						"lib/node_modules/angular-route/angular-route.min.js",
						"lib/node_modules/angular-filter/dist/angular-filter.min.js",
						"app/app.config.js",
						"app/app.js",
						"app/auth/factories/**/*.js",
						"app/trips/factories/**/*.js",
						"app/trips/controllers/**/*.js",
						"app/auth/controllers/**/*.js",
						"app/navigation/controllers/**/*.js"
					],
					dest: "../public/"
				}]
			}
		}
	})
    
	grunt.registerTask("deploy", ["copy"])
	grunt.registerTask("cleanit", ["clean"])
}

    
    
