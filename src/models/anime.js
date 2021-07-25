var axios = require('axios');
var cheerio = require('cheerio');
var config = require('./../otakudesu');

const getText = (t) => {
	return t.clone()
     .children()
     .remove()  
     .end()
	 .text();
}

const homeOngoing = (request, reply) => {
	
	axios.get(config.path('home'))
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
		 	console.error(error.response);
		 	
		 	reply.send({
		 		status: false,
		 		message: 'Something wrong...'
		 	});
		 });
}

const homeComplete = (request, reply) => {

	axios.get(config.path('home'))
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

const ongoing = (request, reply) => {

	let path = config.path('ongoing');

	if(typeof request.query.page !== "undefined"){
		path += `/page/${request.query.page}`
	}

	axios.get(path)
		 .then(async response => {
	     	if(response.data == null){
		 		return reply.send({
		 			status: 500,
		 			message: "Something wrong..."
		 		});
		 	}

		 	let $ = cheerio.load(response.data)

		 	let container = $('#venkonten > div > div.venser > div.venutama > div.rseries > div > div.venz > ul > li');

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

		 	let pagesContainer = $('#venkonten > div > div.venser > div.venutama > div.pagination > div .page-numbers');

		 	let pages = {};

		 	pagesContainer.each((key, value) => {
		 		let href = $(value).attr('href');
		 		pages[`${$(value).text()}`] = href ? href : null; 
		 	});

		 	reply.send({
		 		status : true,
		 		data: animes,
		 		pages,

		 	});

		 })
		 .catch(er => {
		 	console.error(er);

		 	return reply.send({
		 		status: false,
		 		message: "Something wrong..."
		 	});
		 });
}

const complete = (request, reply) => {

	let path = config.path('complete');

	if(typeof request.query.page !== "undefined"){
		path += `/page/${request.query.page}`
	}

	axios.get(path)
		 .then(async response => {
	     	if(response.data == null){
		 		return reply.send({
		 			status: 500,
		 			message: "Something wrong..."
		 		});
		 	}

		 	let $ = cheerio.load(response.data)

		 	let container = $('#venkonten > div > div.venser > div.venutama > div.rseries > div > div.venz > ul > li');

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

		 	let pagesContainer = $('#venkonten > div > div.venser > div.venutama > div.pagination > div > .page-numbers');

		 	let pages = {};

		 	pagesContainer.each((key, value) => {
		 		let href = $(value).attr('href');
		 		pages[`${$(value).text()}`] = href ? href : null; 
		 	});

		 	reply.send({
		 		status : true,
		 		data: animes,
		 		pages,

		 	});

		 })
		 .catch(er => {
		 	console.error(er);

		 	return reply.send({
		 		status: false,
		 		message: "Something wrong..."
		 	});
		 });
}

const animeList = (request, reply) => {

	axios.get(config.path('anime-list'))
		 .then(async response => {
		 	if(response.data == null){
		 		return reply.send({
		 			status: 500,
		 			message: "Something wrong..."
		 		});
		 	}

		 	let $ = cheerio.load(response.data)

		 	let container = $('#abtext ul');

		 	let titles = {};

		 	container.each((key, value) => {

		 		let data = {};

		 		$(value).find('li').each((k, v) => {
		 		
		 			let focus = $(v).find('a');

		 			data[focus.text()] = focus.attr('href')
		 			
		 		});
		 		
		 		Object.assign(titles, data)
		 	})

		 	return reply.send({
		 		status: true,
		 		data: titles
		 	});

		 })
		 .catch(er => {
		 	console.error(er);

		 	return reply.send({
		 		status: false,
		 		message: "Something wrong..."
		 	});
		 });
}

const jadwalRilis = (request, reply) => {

	axios.get(config.path('jadwal-rilis'))
		 .then(async response => {

		 	if(response.data == null){
		 		return reply.send({
		 			status: false,
		 			message: "Something wrong..."
		 		});
		 	}

		 	let $ = cheerio.load(response.data);

		 	let container = $('#venkonten > div > div > div > div.kgjdwl321 > .kglist321');

		 	let jadwals = {};

		 	container.each((key, value) => {

		 		let data = {};

		 		$(value).find('ul li').each((k, v) => {

		 			data[$(v).find('a').text()] = $(v).find('a').attr('href');

		 		});

		 		jadwals[$(value).find('h2').text()] = data;
		 	})

		 	return reply.send({
		 		status: true,
		 		data: jadwals,
		 	});
		 })
		 .catch(er => {
		 	console.error(er)
		 	return reply.send({
		 		status: false,
		 		message: "Something wrong..."
		 	})
		 })
}

const genreList = (request, reply) => {

	axios.get(config.path('genre-list'))
	     .then(async response => {

	     	if(response.data == null){
	     		return reply.send({
	     			status: false,
	     			message: "Something wrong..."
	     		});
	     	}

	     	let $ = cheerio.load(response.data);

	     	let container = $('#venkonten > div > div.venser > ul > li > a');

	     	let lists = {};

	     	container.each((key, value) => {

	     		lists[$(value).text()] = $(value).attr('href'); 
	     	})

	     	return reply.send({
	     		status: true,
	     		data: lists
	     	});
	     })
	     .catch(er => {
	     	console.error(er);
	     	return reply.send({
	     		status: false,
	     		message: "Something wrong..."
	     	})
	     })
}

const animeDetail = (request, reply) => {

	let slug = request.params.slug;

	let path = config.path('detail') + slug;

	axios.get(path)
		 .then(response => {

		 	if(response.data == null){
		 		return reply.send({
		 			status: fasle,
		 			message: "Something wrong..."
		 		});
		 	}

		 	let $ = cheerio.load(response.data);

		 	let detail = {};

		 	detail._title = $('#venkonten > div.venser > div.jdlrx > h1').text();
		 	detail.thumb = $('#venkonten > div.venser > div.fotoanime > img').attr("src");
		 	detail.title = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span'));				  
		    detail.japanase_title = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span'));
		    detail.score = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span'));
		    detail.producer = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span'));
		    detail.type = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span'));
		    detail.status = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span'));	
		    detail.total_episodes = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span'));
		    detail.duration = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span'));
		    detail.releaseDate = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span'));
		    detail.studio = getText($('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span'));
		    
		    let genres = [];

		    $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span > a').each((key, value) => {
		    	genres[key] = $(value).text();
		    })
		    detail.genres = genres.join(", ");
		    detail.sinopsis = $('#venkonten > div.venser > div.fotoanime > div.sinopc').text();
		    detail.html_sinopsis = $("#venkonten > div.venser > div.fotoanime > div.sinopc").html();

		    let batch = $('#venkonten > div.venser > div:nth-child(6) > ul').find('a');

		    if(batch.length == 1){
		    	Object.assign(detail, {
		    		batch : {
		    			title: batch.text(),
		    			href : batch.attr("href")
		    		}
		    	});
		    }

		    let episodes = [];

		    $('#venkonten > div.venser > div:nth-child(8) > ul > li').each((key,value) => {
		    	episodes[key] = {
		    		title: $(value).text(),
		    		href : $(value).find('a').attr("href")
		    	}
		    })

		    detail.episodes = episodes;


		    return reply.send({
		    	status: true,
		    	detail
		    })
		 })
		 .catch(er => {
		 	console.log(er)
		 	if(er.hostname == '404.otakudesu.moe'){
		 		return reply.send({
		 			status: false,
		 			message: "Judul tidak ditemukan!"
		 		});
		 	}
		 	return reply.send({
		 		status: false,
		 		message: "Something wrong..."
		 	})
		 })
}

module.exports = {
	homeOngoing,
	homeComplete,
	ongoing,
	complete,
	animeList,
	jadwalRilis,
	genreList,
	animeDetail,
}