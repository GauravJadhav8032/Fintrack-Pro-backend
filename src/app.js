const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes");
const sanitizeBody = require("./utils/sanitize");
const swaggerSpec = require("./config/swagger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeBody);

app.use(["/docs", "/docs.json"], (req, res, next) => {
	// Force non-cached Swagger responses so terminal logs show 200 instead of 304.
	delete req.headers["if-none-match"];
	delete req.headers["if-modified-since"];
	res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
	res.setHeader("Pragma", "no-cache");
	res.setHeader("Expires", "0");
	next();
});

app.get("/favicon.ico", (_req, res) => {
	res.status(204).end();
});

app.get("/health", (_req, res) => {
	res.status(200).json({
		success: true,
		message: "Server is healthy",
	});
});

app.get("/docs.json", (_req, res) => {
	res.status(200).json(swaggerSpec);
});

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	})
);

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
