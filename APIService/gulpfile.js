const gulp =require('gulp');
const ts =require('gulp-typescript');
const tsProject =ts.createProject('tsconfig.json');

const server = require('gulp-dev-server');

gulp.task('default',()=>{
    return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest('dist'));
});
gulp.task('watch',()=>{
    return gulp.watch(['src/**/*.ts'],{},()=>{
        console.log('watching....');
        
    });
});

gulp.task('build',['default','watch','creatServer']);

gulp.task('server',['default','creatServer']);

gulp.task('creatServer',()=>{
    return server.task({
        restart:['/dist/**/*.js'],
        notify:[],
        server:{
            environment: 'development',
            script: { path: __dirname+'/dist/server.js' }
        }
    })
});
