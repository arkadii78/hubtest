import dotenv from "dotenv";
import * as fs from "fs";

async function globalSetup () {
    dotenv.config({
        path: ".env.local",
        override: true
    });
    fs.rmSync("playwright/.auth/", { recursive: true, force: true });
}
module.exports = globalSetup;
