require('fetch-everywhere')
const qs = require('querystring-es3')
const pickBy = require('lodash.pickby');

export default class Spark {
    /**
     * @param {{ baseUrl: string, auth: { username: string, password: string } }} [config]
     */
    constructor () {
        this.config = {
            baseUrl: process.env.EXPO_PUBLIC_XC_URL,
            auth: {
                username: process.env.EXPO_PUBLIC_XC_USERNAME,
                password: process.env.EXPO_PUBLIC_XC_PASSWORD
            }
        }
    }

    /**
     * execute query on xtream server
     *
     * @param {string} [action]
     * @param {{ [ key: string ]: string }} [filter]
     * @returns {Promise<any>}
     */
    async execute(action, filter) {
        const query = pickBy({ ...this.config.auth, action, ...filter })

        const res = await fetch(`${this.config.baseUrl}/player_api.php?${qs.stringify(query)}`);

        if (!res.ok) {
            const message = `An error has occured: ${res.status}`;
            throw new Error(message);
        }

        const data = await res.json();

        if (action && data.hasOwnProperty('user') &&
            data.user.hasOwnProperty('status') &&
            data.user_info.status === 'Disabled') {
            const message = `Account disabled`;
            throw new Error(message);
        }

        return data;
    }

    /**
     * query tmdb api
     *
     * @param {string} [section]
     * @param {string} [content]
     * @param {Object} [params]
     * @returns {Promise<any>}
     */
    async getTmdb(section, content, path_params, query_params) {
        const tmdbBaseUrl = 'https://api.themoviedb.org/3';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`
            }
        };

        let fetchUrl = `${tmdbBaseUrl}/${section}/${content}`;

        if(path_params) {
            fetchUrl += `/${path_params}`;
        }

        if(query_params){
            const querystring = new URLSearchParams(query_params).toString();
            fetchUrl = fetchUrl + `?${querystring}`;
        }

        const res = await fetch(fetchUrl, options);
        if (!res.ok) {
            const message = `An error has occured: ${res.status}`;
            throw new Error(message);
        }

        const data = await res.json();

        return data;

    }

    async getAccountInfo() {
        const res = await this.execute()
        
        if (res.user_info.auth === 0) {
            const message = `Authentication Error`;
            throw new Error(message);
        }

        return res.user_info;
    }

    async getLiveStreamCategory() {
        const res = await this.execute('get_live_categories');
        return res;
    }

    async getVODStreamCategories() {
        const res = await this.execute('get_vod_categories');
        return res;
    }

    async getSeriesCategories() {
        const res = await this.execute('get_series_categories');
        return res;
    }

    /**
     * @param {string} [category]
     */
    async getLiveStreams(category) {
        const res = await this.execute('get_live_streams', { category_id: category });
        return res;
    }

    /**
     * @param {string} [category]
     */
    async getVODStreams(category) {
        const res = await this.execute('get_vod_streams', { category_id: category });
        return res;
    }

    /**
     * @param {string} [category]
     */
    async getSeriesStreams(category) {
        const res = await this.execute('get_series', { category_id: category });
        return res;
    }

    /**
     * GET VOD Info
     *
     * @param {number} id This will get info such as video codecs, duration, description, directors for 1 VOD
     */
    async getVODInfo(id) {
        if (!id) {
            const message = `Vod Id not defined`;
            throw new Error(message);
        }

        const res = await this.execute('get_vod_info', { vod_id: id });

        if (res.hasOwnProperty('info') && res.info.length === 0) {
            const message = `vod with id: ${id} not found`;
            throw new Error(message);
        }

        return res;
    }

    /**
     * GET Series Info
     *
     * @param {number} id This will get info such as video codecs, duration, description, directors for 1 Series
     */
    async getSeriesInfo(id) {
        if (!id) {
            const message = `Vod Id not defined`;
            throw new Error(message);
        }

        const series = await this.execute('get_series_info', { series_id: id });

        if (series.hasOwnProperty('info') && series.info.length === 0) {
            const message = `vod with id: ${id} not found`;
            throw new Error(message);
        }

        // Alot of series have a season 0 for "specials", but episode data doesn't seem to have an season 0
        // if (!data.episodes[0]) {
        //     // Determines if there are episodes for "Season 0",
        //     // if not, it removes "Season 0" and saves it
        //     const season0 = data.seasons.shift();
        // }
        
        console.log(series);

        return series;

        // return series;
    }

    /**
     * GET short_epg for LIVE Streams (same as stalker portal, prints the next X EPG that will play soon)
     *
     * @param {number} id
     * @param {number} limit You can specify a limit too, without limit the default is 4 epg listings
     */
    async getEPGLiveStreams(id, limit) {
        const res = await this.execute('get_short_epg', { stream_id: id, limit });
        return res;
    }

    /**
     * GET ALL EPG for LIVE Streams (same as stalker portal, but it will print all epg listings regardless of the day)
     *
     * @param {number} id
     */
    async getAllEPGLiveStreams(id) {
        const res = await this.execute('get_simple_data_table', { stream_id: id })
        return res;
    }

    /**
     * * GET Live stream & EPG data combined
     *
     * @param {string} [category]
     */
    async getLiveGuide(category) {
        const streamResponse = await this.execute('get_live_streams', { category_id: category });
        const limit = 6;

        await Promise.all(streamResponse.map(async (stream) =>{
            const epg = await this.execute('get_short_epg', { stream_id: stream.stream_id, limit });
            stream.epg_listings = epg.epg_listings;
        }));

        return streamResponse;
    }

    /**
     * Fetch Trending Movie from TMDB and attach stream id to link to Movie Detail
     *
     */
    async getTrendingMovies() {
        const params = {
            language:'en-US'
        };

        const trendingMovies = await this.getTmdb('trending', 'movie', 'week', params);

        const updatedTrendingMovies = await this.getTrendingMovieIDs(trendingMovies.results);

        return updatedTrendingMovies;
    }

    /**
     * Fetch Trending Series from TMDB and attach stream id to link to Series Detail
     *
     */
    async getTrendingSeries() {
        const params = {
            language:'en-US'
        };

        const trendingSeries = await this.getTmdb('trending', 'tv', 'week', params);

        const updatedTrendingSeries = await this.getTrendingSeriesIDs(trendingSeries.results);

        return updatedTrendingSeries;
    }

    /**
     * Fetch Trending Series from TMDB and attach stream id to link to Series Detail
     *
     */
    async getRandomTrendingMedia() {
        const trendingSeries = await this.getTrendingSeries();
        const trendingMovies = await this.getTrendingMovies();
        const allTrending = trendingSeries.concat(trendingMovies);

        if (allTrending.length > 0) {
            const random = Math.floor(Math.random() * allTrending.length);
            const randomMedia = allTrending[random];

            return randomMedia;
        }
    }

        /**
     * GET VOD Info by Search Values
     *
     * @param {string} name
     * @param {number} year
     */
        async getTrendingMovieIDs(movieList) {
            if (!movieList) {
                const message = `Movie List not defined`;
                throw new Error(message);
            }
    
            const id_newReleases = 1337;
            const id_all = 'X';
    
            const allMovies = await this.execute('get_vod_streams', { category_id: id_all });
    
            const missingMovies = [];
            for (let i in movieList){
                const title = movieList[i]['title'];
                const releaseDate = movieList[i]['release_date'];
    
                let match = allMovies.filter(movie => movie.title == title && movie.release_date == releaseDate);
    
                if(match.length > 0) {
                    movieList[i].stream_id = match[0].stream_id;
                } else {
                    movieList[i].stream_id = null;
                    missingMovies.push(movieList[i]);
                }
            }
    
            return movieList;
        }
    
        /**
         * GET VOD Info by Search Values
         *
         * @param {Object} seriesList
         */
        async getTrendingSeriesIDs(seriesList) {
            if (!seriesList) {
                const message = `Series List not defined`;
                throw new Error(message);
            }
    
            const id_all = 'X';
    
            const allSeries = await this.execute('get_series', { category_id: id_all });
    
            const missingMovies = [];
            for (let i in seriesList){
                const name = seriesList[i]['name'];
                const releaseYear = seriesList[i]['first_air_date'].substr(0,4);
    
                let match = allSeries.filter(series => series.title == name && series.year == releaseYear);
    
                if(match.length > 0) {
                    seriesList[i].stream_id = match[0].series_id;
                } else {
                    seriesList[i].stream_id = null;
                    missingMovies.push(seriesList[i]);
                }
            }
    
            return seriesList;
        }
} 