( async (fetch) => {

	try {
		let response = await fetch.get('https://otakudesu.moe');

		console.log(response)
	} catch(er){
		console.error('error ', er);
	}

})(require('cloudflare-scraper'))