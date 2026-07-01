import express, { type Express } from 'express';
import knex, { type Knex } from 'knex';
import employeesRoute from './routes/employeesRoute.js';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';

class App {
	database: Knex;
	app: Express;
	port = 3000;

	constructor() {
		dotenv.config();

		for (const key of ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'] as const)
			if (!process.env[key]) throw new Error('В файле .env отсутствуют некоторые необходимые ключи.');

		console.log('Инициализация API...');

		this.app = express();

		console.log('Подключение к БД...');

		this.database = knex({
			client: 'mysql2',
			connection: {
				host: process.env.DB_HOST!,
				port: parseInt(process.env.DB_PORT as string, 10)!,
				user: process.env.DB_USER!,
				password: process.env.DB_PASS!,
				database: process.env.DB_NAME!
			}
		});

		console.log('Запуск сервера...');

		this.app.use(express.json());
		this.app.use('/employees', employeesRoute);
		this.app.use(errorHandler);

		this.app.listen(this.port, () => console.log(`Сервер доступен на http://localhost:${this.port}`));
	}
}

const app = new App();

export default app;
