import gulp from 'gulp';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import sass from 'gulp-dart-sass';
import cleanCss from 'gulp-clean-css';
import pug from 'gulp-pug';
import del from 'del';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import uglify from 'gulp-uglify';
const bs = browserSync.create();

// Динамический импорт ES-модулей
let webp, imagemin;

async function loadModules() {
    webp = (await import('gulp-webp')).default;
    // imagemin = (await import('gulp-imagemin')).default;
}

// Путь к исходным изображениям
const srcImages = 'app/assets/images/**/*.{jpg,png}';

// Путь для сохранения сконвертированных изображений
const destImages = 'app/assets/images';

// Задача для конвертации изображений в WebP
function imagesToWebp() {
    return gulp.src(srcImages)
        .pipe(webp())
        .pipe(gulp.dest(destImages));
}

// Задача для наблюдения за изменениями в изображениях
function watchImages() {
    gulp.watch(srcImages, gulp.series(imagesToWebp));
}

function browsersync() {
    bs.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    });
}

function scripts() {
    return gulp.src([
        // 'app/src/plugins/**/*.js',
        'app/src/js/app.js',
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/js/'))
        .pipe(bs.stream());
}

function styles() {
    return gulp.src([
        // 'app/src/plugins/**/*.css',
        'app/src/scss/main.scss'
    ])
        .pipe(sass())
        .pipe(concat('styles.min.css'))
        .pipe(cleanCss({ level: { 1: { specialComment: 0 } } }))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('app/assets/css/'))
        .pipe(bs.stream());
}
function copyPlaginsScripts(){
    return gulp.src([
        'app/src/plugins/**/*.js'
    ])
    .pipe(gulp.dest('app/assets/js/'))
}
function copyPlaginsStyle(){
    return gulp.src([
        'app/src/plugins/**/*.css'
    ])
    .pipe(cleanCss({ level: { 1: { specialComment: 0 } } }))
    .pipe(gulp.dest('app/assets/css/'))
}
function html() {
    return gulp.src('app/src/pug/*.pug')
        .pipe(
            pug({
                pretty: '\t'
            })
        )
        .pipe(gulp.dest('app/'));
}
function startWatch() {
    gulp.watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    gulp.watch(['app/**/*.scss', '!app/**/*.css'], styles);
    gulp.watch('app/**/*.html').on('change', bs.reload);
    gulp.watch('app/**/*.pug', html);
}


function cleanDist() {
    return del('dist/**/*', { force: true });
}

function buildcopy() {
    return gulp.src([
        'app/assets/css/**/*.css',
        'app/assets/js/**/*.js',
        'app/assets/images/**/*',
        'app/assets/fonts/**/*',
        'app/**/*.html',
    ], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
        .pipe(gulp.dest('dist')); // Выгружаем в папку с финальной сборкой
}

// Экспорт задач
export { imagesToWebp,watchImages };

export const build = gulp.series(
    loadModules,
    cleanDist,
    copyPlaginsStyle,
    copyPlaginsScripts,
    styles,
    scripts,
    buildcopy
);
export default gulp.parallel(copyPlaginsStyle,copyPlaginsScripts,loadModules,watchImages, startWatch, html, styles, scripts, browsersync);