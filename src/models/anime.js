var axios = require('axios');
var cheerio = require('cheerio');
var config = require('./../otakudesu');


const ongoing = (request, reply) => {
	
	axios.get(config.path['ongoing'])
		 .then(async response => {

		 	if(response.data == null){
		 		return reply.send({
		 			status: 500,
		 			message: "Something wrong..."
		 		});
		 	}

		 	let $ = cheerio.load(response.data)

		 	let container = $('#venkonten > div > div.venser > div.venutama > div > div.rapi > div > ul > li');

		 	let animes = [];

		 	container.each((key, value) => {

		 		let anime = $(value);

		 		animes[key] = {
		 			title : anime.find('div > div.thumb > a > div > h2').text(),
		 			slug : anime.find('div > div.thumb > a').attr('href'),
		 			thumb : anime.find('div > div.thumb > a > div > img').attr('src'),
		 			
		 			episode : anime.find('.epz').text(),
		 			releaseDate : anime.find('.newnime').text(),
		 			releaseAt : anime.find('.epztipe').text(),
		 		}
		 	})

		 	reply.send({
		 		status : true,
		 		data: animes
		 	});
		 })
		 .catch(error => {
		 	console.error(error);
		 	
		 	reply.send({
		 		status: false,
		 		message: 'Something wrong...'
		 	});
		 });
}

const complete = (request, reply) => {

	axios.get(config.path['complete'])
	     .then(async response => {
	     	if(response.data == null){
		 		return reply.send({
		 			status: 500,
		 			message: "Something wrong..."
		 		});
		 	}

		 	let $ = cheerio.load(response.data)

		 	let container = $('#venkonten > div > div.venser > div.venutama > div > div.rseries > div > div.venz > ul > li');

		 	let animes = [];

		 	container.each((key, value) => {

		 		let anime = $(value);

		 		animes[key] = {
		 			title : anime.find('div > div.thumb > a > div > h2').text(),
		 			slug : anime.find('div > div.thumb > a').attr('href'),
		 			thumb : anime.find('div > div.thumb > a > div > img').attr('src'),
		 			
		 			episode : anime.find('.epz').text(),
		 			releaseDate : anime.find('.newnime').text(),
		 			releaseAt : anime.find('.epztipe').text(),
		 		}
		 	});

		 	reply.send({
		 		status: true,
		 		data: animes
		 	});

	     })
	     .catch(error => {
	     	console.error(error);
	     	reply.send({
	     		status: false,
	     		message: 'Something wrong...'
	     	});
	     });
}

module.exports = {
	ongoing,
	complete,
}