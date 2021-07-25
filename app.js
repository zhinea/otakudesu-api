
var fastify = require('fastify')({
	logger: true
});


fastify.register(require('./src/routes'), {
	prefix: '/api'
});

const start = async () => {
	try {
		await fastify.listen(process.env.PORT || 3000, "0.0.0.0");
	} catch (error) {
		fastify.log.error(error);
		process.exit(1)
	}
}

start();