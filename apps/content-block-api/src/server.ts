import { Configuration } from '@tsed/common';
import { resolve } from 'path';

@Configuration({
    httpPort: "0.0.0.0:8088",
    rootDir: resolve(__dirname),
    mount: {
        '/api': [`${__dirname}/controllers/**/*.ts`]
    }
})
export class Server {
}