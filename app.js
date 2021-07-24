
var fastify = require('fastify')({
	logger: true
});


fastify.register(require('./src/routes'), {
	prefix: '/api'
});

const start = async () => {
	try {
		await fastify.listen(3000);
	} catch (error) {
		fastify.log.error(error);
		process.exit(1)
	}
}

start();