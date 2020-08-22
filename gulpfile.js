let project_folder="dist";
let source_folder="src";

let fs = require('fs');

let path={
	build:{
		html: project_folder+"/",
		css: project_folder+"/css/",
		js: project_folder+"/js/",
		img: project_folder+"/img/", 
		fonts: project_folder+"/fonts/", 
	},
	src:{
		html: [source_folder+"/*.html", "!" + source_folder+"/_*.html"],
		css: source_folder+"/scss/style.scss",
		js: source_folder+"/js/*.js",
		img: source_folder+"/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}", 
		fonts: source_folder+"/fonts/*.ttf", 
	},
	watch:{
		html: source_folder+"**/*.html",
		css: source_folder+"/scss/**/*.scss",
		js: source_folder+"/js/**/*.js",
		img: source_folder+"/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}", 
	},
	clean: "./"+project_folder+"/"
}


/* Переменные */
let { src, dest} = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	babel = require('gulp-babel');
	
	




function browserSync(params) {
	browsersync.init({
		server:{
			baseDir: "./"+project_folder+"/"
		},
		port:3000,
		notify:false
	})
}


/* HTML */
function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}


/* CSS */
function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
			)
		.pipe(group_media())
		.pipe(
			autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

/* JS */
function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(babel({
            presets: ['babel-preset-env']
        }))
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}


/* Image */
function images() {
	return src(path.src.img)
		.pipe(src(path.src.img))
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

/* Fonts */
function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
};

gulp.task('otf2ttf', function () {
	return src([source_folder + '/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'));
})


function fontsStyle(params) {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

/* Callback */
function cb() {

}

/* Прослушка файлов */
function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean(params) {
	return del(path.clean);
}



/* Команды */
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle); 
let watch = gulp.parallel(build, watchFiles, browserSync);



/* Экспорт файлов */
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;