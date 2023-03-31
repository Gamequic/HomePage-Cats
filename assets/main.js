const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCaJAclCKDu8rwgTcn9CjfUg&part=snippet%2Cid&order=date&maxResults=2';

const content = null || document.getElementById('content')  // null || se agrega por si no se encuentra nigun objeto en getElement, se quedara como null

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5449ee4ccemsh411b3cbb9d3d966p161f57jsn7f59d207cb8b',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlAPi){
    const response = await fetch(urlAPi, options);
    const data = await response.json()
    return data;
}

(async () => {  //Se auto ejecuta cuando se carga a memoria
    try {
        const videos = await fetchData(API);
        console.log(videos)
        let view = `${videos.items.map((video) => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>
            `).slice(0, 4).join('')}`;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();
