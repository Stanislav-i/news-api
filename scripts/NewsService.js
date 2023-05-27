const URL = "https://newsapi.org/v2/everything";
const API_KEY = "dd82ff3604224bf1b224da3ef75c9135";


export default class NewsService {
    constructor() { 
        this.page = 1;
        this.searchQuery = "";
    }

    async getNews() {
        const {data} = await axios.get(
            `${URL}?apiKey=${API_KEY}&q=${this.searchQuery}&searchIn=title&pageSize=3&page=${this.page}`
        )
        this.incrementPage();
        return data.articles;


        // *AXIOS THEN

        // return axios.get(
        //     `${URL}?apiKey=${API_KEY}&q=${this.searchQuery}&searchIn=title&pageSize=3&page=${this.page}`
        // ).then(({ data }) => {
        //     this.incrementPage()
        //     return data.articles
        // });
            
        // *FETCH THEN

        // return fetch(
        //     `${URL}?apiKey=${API_KEY}&q=${this.searchQuery}&searchIn=title&pageSize=3&page=${this.page}`
        // )
        // .then((res) => res.json())
        // .then(({ articles }) => { 
        //     this.incrementPage();
        //     return articles;
        // });
    }

    resetPage() { 
        this.page = 1;
    }

    incrementPage() { 
        this.page += 1;
    }
};