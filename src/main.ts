import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = 3000;
	await app.listen(port, () => {
		const networkInterfaces = os.networkInterfaces();
		Object.keys(networkInterfaces).forEach((interfaceName) => {
			networkInterfaces[interfaceName].forEach((iface) => {
				if (iface.family === 'IPv4' && !iface.internal) {
					console.log(`Listening on http://${iface.address}:${port}`);
				}
			});
		});
	});
}
bootstrap();
