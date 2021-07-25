const axios = require('axios');


axios.get("https://otakudesu.moe/anime/kgeki-sub-indo/asda")
	 .then(response => {
	 	console.log(response)
	 })
	 .catch(er => {
	 	console.error('error  => ', er)
	 })