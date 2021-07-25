const otakudesu = {
	
	base_path : 'https://otakudesu.moe', 

	paths: {
		'home' : '/',
		'ongoing' : '/ongoing-anime',
		'complete' : '/complete-anime',
		'anime-list': '/anime-list',
		'jadwal-rilis': '/jadwal-rilis',
		'genre-list': '/genre-list',
		'detail' : '/anime/',
	},


	path(key){

		return `${otakudesu.base_path}${otakudesu.paths[key]}`;
	}
}


module.exports = otakudesu;