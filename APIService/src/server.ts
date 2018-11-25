
import app from './app';
import ServerCfg from './configs/serverconfig'
const server = app.listen(app.get('port'),()=>{
    let host = ServerCfg.host;
    let port =app.get('port') || ServerCfg.port;
    console.log(`server is runing at http://${host}:${port}`);
});