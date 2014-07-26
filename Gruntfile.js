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
            options: {banner: '/*CSS3-button-Generator by Alex Nikitin*/'},
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

        cssmin: {
            //минификация css
            options: {banner: '/*CSS3-button-Generator by Alex Nikitin*/'},
            dist: {
                src: [
                    'assets/css/libs/uncss.css',
                    //'assets/css/libs/bootstrap.css',
                    'assets/css/libs/jquery-ui.css',
                    'assets/css/style.css'
                ],
                dest: 'assets/css/production.min.css'
            },

        },

        uncss: {
            //убираем лишние стили библиотек
            dist: {
                options: {
                    stylesheets: [
                        'assets/css/libs/bootstrap.css',
                        //'assets/css/libs/jquery-ui.css'
                        //'assets/css/style.css'
                    ],
                    ignore: [
                        '.fade',
                        '.tooltip',
                        '.tooltip.in',
                        '.tooltip.right',
                        '.tooltip-inner',
                        '.tooltip-arrow',
                        '.tooltip.right .tooltip-arrow'
                    ],
                },
                files: {
                  'assets/css/libs/uncss.css': ['index.html']
                }
            }
        },

        watch: {
            //настройка смотрителя за проектом
            js: {
                files: ['assets/js/script.js'],
                tasks: ['concat', 'uglify'],
            },
            css: {
                files: ['assets/sass/*.scss'],
                tasks: ['compass', 'uncss', 'cssmin'] 
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'uncss', 'cssmin', 'watch']);
    //grunt.registerTask('watch', ['watch']);

};