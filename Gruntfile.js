module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> | im@andreystarkov.ru */\n',
        mangle: true
      },
      build: {
        files: {
          'src/js/all.js': ['src/js/libs/*.js'],
        }
      }
    },
  less: {
    development: {
      options: {
        paths: ["assets/css"]
      },
      files: {
        "src/css/fullwidth-slider.min.css": "src/css/fullwidth-slider.less"
      }
    },
    production: {
      options: {
        paths: ["assets/css"],
        cleancss: true
      },
      files: {
        "src/css/fullwidth-slider.min.css": "src/css/fullwidth-slider.less"
      }
    }
  },
  cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> | im@andreystarkov.ru */'
        },
        files: {
          'src/css/fullwidth-slider-animations.min.css': ['src/css/fullwidth-slider-animations.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['uglify', 'cssmin', 'less']);

};