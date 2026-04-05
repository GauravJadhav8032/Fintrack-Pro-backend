const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/prisma");

const server = app.listen(env.port, () => {
	// eslint-disable-next-line no-console
	console.log(`FinTrack Pro backend running on port ${env.port}`);
});

async function shutdown(signal) {
	// eslint-disable-next-line no-console
	console.log(`Received ${signal}. Shutting down gracefully...`);

	await prisma.$disconnect();

	server.close(() => {
		process.exit(0);
	});
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
