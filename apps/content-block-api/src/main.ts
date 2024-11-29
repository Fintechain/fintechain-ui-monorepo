import {PlatformExpress} from '@tsed/platform-express';
import {Server} from './server';

async function bootstrap() {
  const platform = await PlatformExpress.bootstrap(Server);
  await platform.listen();
}

bootstrap();