// this is connect for our project
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');

// task for compilation sass to css                                                         // ------DESCRIPTION:-----
gulp.task('sass', function () {                                                             // name of task
    return gulp.src('app/sass/**/*.sass')                                                   // get sass failes
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))                   // if we are made mistake sass isn't logout
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))  // autoprefixer for brousers
        .pipe(gulp.dest('app/css'))                                                         // final place of compilation
});

// task for automatic compilation sass to css
gulp.task('watch', ['css-libs'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass'])                                              // get all sass failes and made task 'sass'
});

// task for compilation to min.css
gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())                                                                    // made mini version
        .pipe(rename({suffix:'.min'}))                                                      // add sufix .min
        .pipe(gulp.dest('app/css'))
});

// task for production
gulp.task ('build', ['clean', 'img', 'sass'], function () {
    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist'));
});

// dell all the files at folder of dist
gulp.task('clean', function () {
    return del.sync('dist')
});

// for costumize img
gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

// clean cache
gulp.task('clear', function () {
    return cache.clearAll();
});

// final for comfort
gulp.task('default', ['watch']);



