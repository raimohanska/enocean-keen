module.exports = (grunt) ->
  grunt.initConfig
    clean:
      dist: ['dist/']
    coffee:
      compile:
        expand: true
        options:
          bare: true
        cwd: "src"
        src: ['*.coffee']
        dest: 'dist'
        ext: '.js'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-text-replace'
  grunt.loadNpmTasks 'grunt-coffeelint'

  grunt.registerTask 'default', ['coffee:compile']
