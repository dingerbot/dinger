module.exports = function (grunt) {
	grunt.initConfig({
		min: {
			dist: {
				src: 'calculator/*.js',
				dest: 'calculator.min.js'
			},
			addsub: {
				srs: []
			}
		},
		watch: {
			files: ['calculator/*.js'],
			tasks: ['min:dist']
		}
	});

	grunt.registerTask('default', [
		'min:dist'
	]);
};