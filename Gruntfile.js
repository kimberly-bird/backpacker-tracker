// module.exports = function (grunt) {
    
// 	grunt.initConfig({
// 		pkg: grunt.file.readJSON("package.json"),
// 		watch: {
// 			scripts: {
// 				files: ["./scripts/**/*.js", "!node_modules/**/*.js"],
// 				tasks: ["eslint"],
// 				options: {
// 					spawn: false,
// 				},
// 			},
// 		},
// 		eslint: {
// 			src: [
// 				"./scripts/**/*.js",
// 				"!node_modules/**/*.js",
// 			],
// 		},
// 	})
    
// 	grunt.loadNpmTasks("grunt-contrib-watch")
// 	grunt.loadNpmTasks("gruntify-eslint")
    
// 	grunt.registerTask("default", ["eslint", "watch"])
// }