        import gulp from 'gulp';
        import gulpSass from 'gulp-sass';
        import * as sass from 'sass';
        import imagemin from 'gulp-imagemin';
        import uglify from 'gulp-uglify';
        import rename from 'gulp-rename';

        const sassCompiler = gulpSass(sass);

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
        export function compileSass() {
        return gulp.src(paths.sass.src)
            .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(paths.sass.dest));
        }

        // Comprimir imagens
        export function compressImages() {
        return gulp.src(paths.images.src)
            .pipe(imagemin())
            .pipe(gulp.dest(paths.images.dest));
        }

        // Minificar JS
        export function minifyJS() {
        return gulp.src(paths.js.src)
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(paths.js.dest));
        }

        // Tarefa padrão
        export default gulp.series(compileSass, compressImages, minifyJS);
