const gulp =require('gulp');
const ts =require('gulp-typescript');
const tsProject =ts.createProject('tsconfig.json');


const env =process.env.NODE_ENV ;

const server = require('gulp-dev-server');

function defaultCallback() {
    //console.log(env);
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
}
function createServerCallback() {
    return server.task({
        restart:['/dist/**/*.js'],
        notify:[],
        server:{
            environment: 'development',
            script: { path: __dirname+'/dist/server.js' }
        }
    })
}
gulp.task('default',()=>{
    defaultCallback();
});
gulp.task('watch',()=>{
    return gulp.watch(['src/**/*.ts'],{},()=>{
        console.log('watching....');
        defaultCallback();
    });
});

gulp.task('dev',['default','watch','creatServer']);

gulp.task('build',['default']);

gulp.task('creatServer',()=>{
    createServerCallback();
});
