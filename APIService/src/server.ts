
import app from './app';
import ServerCfg from './configs/serverconfig';
import logger from "./helpers/LogHelper";
import clc from "cli-color";
app.listen(app.get('port'),()=>{
    let host = ServerCfg.host;
    let port =app.get('port') || ServerCfg.port;
    console.log(clc.green(`server is runing at http://${host}:${port}`));
    logger.info(`server is runing at http://${host}:${port}`);
});