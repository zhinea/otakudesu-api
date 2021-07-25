var anime = require('./models/anime');

const routes = async (fastify, options) => {

	fastify.get('/home-ongoing', anime.homeOngoing);
	fastify.get('/home-complete', anime.homeComplete);
	fastify.get('/ongoing', anime.ongoing);
	fastify.get('/complete', anime.complete);
	fastify.get('/anime-list', anime.animeList);
	fastify.get('/jadwal-rilis', anime.jadwalRilis);
	fastify.get('/genres', anime.genreList);


	fastify.get('/detail/:slug', anime.animeDetail);
}

module.exports = routes;