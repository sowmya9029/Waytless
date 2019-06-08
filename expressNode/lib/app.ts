// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/Routes";
import * as logger from 'morgan';
import * as session from 'express-session'; 

import GooglePassportObj from "Google-OAuth/GooglePassport";

var passport = require('passport');

var cors = require('cors');

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public googlePassport : GooglePassportObj;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();      
        this.routePrv.routes(this.app,passport);    
        
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(logger('dev'));

        this.googlePassport = new GooglePassportObj();
    }
    

}

export default new App().app;