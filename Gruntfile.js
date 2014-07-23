module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Настройка для объединения файлов находится тут
            dist: {
                //источники
                src: [
                    //'js/libs/*.js', // Все JS в папке libs
                    // Конкретные файлы
                    'assets/js/libs/jquery.min.js',
                    'assets/js/libs/jquery-ui.js',
                    'assets/js/libs/bootstrap.js',
                    'assets/js/libs/jscolor/jscolor.js',
                    'assets/js/script.js'
                ],
                //куда положить
                dest: 'assets/js/production.js',
            }
        },

        uglify: {
            //минификация js
            build: {
                src: 'assets/js/production.js',
                dest: 'assets/js/production.min.js'
            }
        },

        compass: {
            //настройки компаса
            dist: {
              options: {
                config: 'config.rb',
                //outputStyle: ''
              }
            }
        },

        //cssmin: {},

        watch: {
            js: {
                files: ['assets/js/script.js'],
                tasks: ['concat', 'uglify'],
            },
            css: {
                files: ['assets/sass/*.scss'],
                tasks: ['compass'] 
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'watch']);
    //grunt.registerTask('watch', ['watch']);

};