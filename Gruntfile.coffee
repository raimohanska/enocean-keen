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
    watch:
      coffee:
        files: 'src/*.coffee'
        tasks: 'coffee:compile'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee:compile']
