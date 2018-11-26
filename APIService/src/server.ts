
import app from './app';
import ServerCfg from './configs/serverconfig'
import logger from "./helpers/LogHelper";
const server = app.listen(app.get('port'),()=>{
    let host = ServerCfg.host;
    let port =app.get('port') || ServerCfg.port;
    logger.info(`server is runing at http://${host}:${port}`);
    // console.log(`server is runing at http://${host}:${port}`);
});