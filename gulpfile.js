    const gulp = require('gulp');
    const sass = require('gulp-sass')(require('sass'));
    const imagemin = require('gulp-imagemin');
    const uglify = require('gulp-uglify');
    const rename = require('gulp-rename');

    // Caminhos
    const paths = {
    sass: {
        src: 'src/sass/**/*.scss',
        dest: 'dist/css'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    }
    };

    // Compilar SASS
    function compileSass() {
    return gulp.src(paths.sass.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.sass.dest));
    }

    // Comprimir imagens
    function compressImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
    }

    // Minificar JavaScript
    function minifyJS() {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js.dest));
    }

    // Tarefa padrão
    exports.default = gulp.series(compileSass, compressImages, minifyJS);
