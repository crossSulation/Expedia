
import app from './app';
import ServerCfg from './configs/serverconfig';
import logger from "./helpers/LogHelper";

app.listen(app.get('port'),()=>{
    let host = ServerCfg.host;
    let port =app.get('port') || ServerCfg.port;
    logger.info(`server is runing at http://${host}:${port}`);
    
});