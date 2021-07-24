var anime = require('./models/anime');

const routes = async (fastify, options) => {


	fastify.get('/ongoing', anime.ongoing);

	fastify.get('/complete', anime.complete);
}

module.exports = routes;