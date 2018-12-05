### Project description
- Tech stack
-- Reactjs + webpack client side
-- nodejs + mysql  Backend(API Service)

##### Run your program in your local
- clone the respository into u local disk 
> command: `git clone https://github.com/crossSulation/Expedia.git` 
To local disk, eg ~/Documents/Expedia 
> command: 
`cd Expedia/APIService`
- to the API Backend service
- when debug
> command:
`npm run build`
- when release
> command:
`npm run server`
- You must install mysql first, if none has been installed
- To the client side,
> command:
`cd Expedia/Client`
run client
`npm run start`
##### Project digram
![](https://github.com/crossSulation/Expedia/blob/master/instruction.svg)

- Using the travis to maitain the CI Process , git hub as the respository, furture more ,I'd prefer deploy the app with docker env.
- As the client side and server side has diff domain, use proxy to route to diff api service ,for now we just has one api service. In the future, I'd like to add load balance for complex api service provider
### Building Tools
- gulp, webpack

### Gulp vs webpack
why webpack? Gulp is tool when you know  extractually what to do, as we all know a web app includes HTML,javascript, css. 
- Using Gulp you need take care of everything ( mannully link the css, less etc to the index.html, mannully use AMD, UMD js asyc load tool to manage and import the javscript libraries and dependents.
- Using Gulp you need config every step about how the application run, like load the third party libs, css and javacript minify, test and everything you need firstly wrote some tasks. And then combine them together to different process. The multiple processes combined together as the build process.
- Using Webpack you never should consider about manage html, css, javascript .Webpack take everything as module, You just need tell webpack how to handle the different types of file with different loaders, or do some extra function with plugins
- Webpack is engine which you just need tell it what you want to to

||gulp   |  webpack |
|------------| ------------ | ------------ |
|pros|automatically build tool depend on pipe  |  contains every thing build tool |
|target| design for common site | common build tool and moudle loader design for SPA |
|learning|easy to learn, the api is very simple| a little difficult to learn, but the offical documentation is great to check|
|usege|multiple page application(MPA) that depend on process| Everything is moudle which is great for SPA|
|work process|From input source(less,css,html,js),process step by step, 'bundle','compile','rename','minify' etc and at the end to the dest|Specific an entry file, depends on that, it will generate the dependence graph tree, and bundle all the dependence together,and before that it will bundle the dependence resource to a js moudle|
|how to dev| write js code base on nodejs, develop different tasks| most of all is configuration, sometime may develop some loaders or plugins|
|Good Or Bad|Not friendly for SPA, for Vue,Reactjs. It is not easy to handle the .vue or .jsx file, in webpack you just need a loader to take everything|Everything will be bundled to one single boundled file, it is a benific fo Http 1.1 because it decreased network request |
|Conculation|Gulp is the very tool for MPA(multiple page application)|Webpack is great for SPA(single page application)|

