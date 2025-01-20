require('fetch-everywhere')
const axios = require('axios').default;
const qs = require('querystring-es3')
const pickBy = require('lodash.pickby');
export default class Spark {
    /**
     * @param {{ xcUrl: string, auth: { username: string, password: string } }} [config]
     */
    constructor (session = {}) {
        if (process.env.EXPO_PUBLIC_USE_ENV === 'true') {
            this.config = {
                tmdbApiKey: process.env.EXPO_PUBLIC_TMDB_API_KEY,
                tmdbApiReadAccessToken: process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN,
                xcUrl: process.env.EXPO_PUBLIC_XC_URL2,
                xcAuth: {
                    username: process.env.EXPO_PUBLIC_XC_USERNAME2,
                    password: process.env.EXPO_PUBLIC_XC_PASSWORD2
                }
            }
        } else if (session && session.user) {
            this.config = {
                tmdbApiKey: session.user.user_metadata.tmdbApiKey,
                tmdbApiReadAccessToken: session.user.user_metadata.tmdbApiReadAccessToken,
                xcUrl: session.user.user_metadata.xcUrl,
                xcAuth: {
                    username: session.user.user_metadata.xcUsername,
                    password: session.user.user_metadata.xcPassword
                }
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
        if (this.config && this.config.xcAuth && this.config.xcUrl) {
            const query = pickBy({ ...this.config.xcAuth, action, ...filter })

            // const res = await fetch(`${this.config.xcUrl}/player_api.php?${qs.stringify(query)}`);
            const res = await fetch(`${this.config.xcUrl}/player_api.php?${qs.stringify(query)}`);

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
    }

    /**
     * execute query on xtream server
     *
     * @param {string} [action]
     * @param {{ [ key: string ]: string }} [filter]
     * @returns {Promise<any>}
     */
    async XCute(action, filter) {
        if (this.config && this.config.xcAuth && this.config.xcUrl) {
            const query = pickBy({ ...this.config.xcAuth, action, ...filter })

            // const res = await fetch(`${this.config.xcUrl}/player_api.php?${qs.stringify(query)}`);
            const data = await axios.get(`${this.config.xcUrl}/player_api.php?${qs.stringify(query)}`)
                .catch(function (error) {
                    if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    }
                    console.log(error.config);
                });

            return data;
        }
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
        if (this.config && this.config.tmdbApiReadAccessToken) {
            const tmdbBaseUrl = 'https://api.themoviedb.org/3';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.config.tmdbApiReadAccessToken}`
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
                // throw new Error(message);
                console.error(message, "FetchURL: " + fetchUrl);
                return;
            }

            const data = await res.json();

            return data;
        }
    }

    async getAccountInfo() {
        if (this.config && this.config.xcUrl) {
            const res = await this.execute()
            
            if (res.user_info.auth === 0) {
                const message = `Authentication Error`;
                throw new Error(message);
            }

            return res.user_info;
        }
    }

    async getLiveStreamCategory() {
        const res = await this.execute('get_live_categories');
        return res;
    }

    async getVODStreamCategories() {
        const res = await this.XCute('get_vod_categories');
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
        const res = await this.XCute('get_vod_streams', { category_id: category });
        return res;
    }

    /**
     * @param {string} [useFiltered]
     */
    async getAllMovies(useFiltered) {
        const res = await this.XCute('get_vod_streams', { category_id: 'X' });
        
        function removeFromResults(media) {
            const blockedCats = ['20913','20992', '20991', '20987', '21022', '20984', '20967', '20956', '20964', '20963', '20838', '20966',
            '21020', '21010', '20965', '20968', '20989', '20933', '20993', '21006', '20772', '21019', '21004', '21018', '20974', '20975',
            '20800', '20986'];

            const isBlocked = blockedCats.indexOf(media.category_id);
            if (isBlocked > -1) {
                return false;
            }
            return true;
        }

        if (useFiltered) {
            const filteredData = res.data.filter(removeFromResults);
            const newRes = {
                ...res,
                data: filteredData
            }

            return newRes;
        }

        return res;
    }

    /**
     * @param {string} [category]
     */
    async getSeriesStreams(category) {
        const res = await this.XCute('get_series', { category_id: category });
        return res;
    }

    /**
     * Get All Series Results
     */
    async getAllSeries() {
        const res = await this.XCute('get_series', { category_id: 'X' });
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
     * Fetch Movie Details from TMDB
     *
     */
    async getTmdbMovie(id) {
        const params = {
            append_to_response: 'release_dates,watch/providers',
            language:'en-US'
        };

        let movieDetails = await this.getTmdb('movie', id, null, params);
        movieDetails.media_type = 'movie';
        movieDetails = await this.getTmdbCertificationRating(movieDetails)

        return movieDetails;
    }

    /**
     * Fetch Movie Details for an array of ids from TMDB
     *
     */
    async getTmdbMoviesGroup(movieIdArray) {
        const params = {
            append_to_response: 'release_dates,watch/providers',
            language:'en-US'
        };

        const movieDetails = [];

        for (let i in movieIdArray){
            let movie = await this.getTmdb('movie', movieIdArray[i], null, params);

            if (movie) {
                movie.media_type = 'movie'
                movie = await this.getTmdbCertificationRating(movie)
                movieDetails.push(movie);
            }
        }

        if (movieDetails.length > 0) {
            return movieDetails;
        }
    }

    /**
     * Fetch Movie Genres from TMDB
     *
     */
    async getTmdbMovieGenres() {
        const params = {
            language:'en-US'
        };

        const movieGenres = await this.getTmdb('genre', 'movie/list', null, params);

        return movieGenres.genres;
    }

    /**
     * Fetch Movies from specific genre(s) id
     *
     */
    async getTmdbMoviesByGenres(ids) {
        const params = {
            include_adult: false,
            include_video: false,
            language:'en-US',
            page: 1,
            sort_by: 'popularity.desc',
            with_genres: ids
        };

        const moviesByGenres = await this.getTmdb('discover', 'movie', null, params);

        return moviesByGenres;
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

        return series;
    }

    /**
     * Fetch TV Series Details from TMDB
     *
     */
    async getTmdbSeries(id) {
        const params = {
            append_to_response: 'content_ratings,watch/providers',
            language:'en-US'
        };

        let seriesDetails = await this.getTmdb('tv', id, null, params);
        seriesDetails.media_type = 'series';
        seriesDetails = await this.getTmdbCertificationRating(seriesDetails)

        return seriesDetails;
    }

    /**
     * Fetch Series Genres from TMDB
     *
     */
    async getTmdbSeriesGenres() {
        const params = {
            language:'en-US'
        };

        const seriesGenres = await this.getTmdb('genre', 'tv/list', null, params);

        return seriesGenres.genres;
    }

    /**
     * Fetch Movies from specific genre(s) id
     *
     */
    async getTmdbSeriesByGenres(ids) {
        const params = {
            include_adult: false,
            include_video: false,
            language:'en-US',
            page: 1,
            sort_by: 'popularity.desc',
            with_genres: ids
        };

        const moviesByGenres = await this.getTmdb('discover', 'tv', null, params);

        return moviesByGenres;
    }

    /**
     * Fetch Movie Details for an array of ids from TMDB
     *
     */
    async getTmdbSeriesGroup(seriesIdArray) {
        const params = {
            append_to_response: 'content_ratings,watch/providers',
            language:'en-US'
        };

        const seriesDetails = [];

        for (let i in seriesIdArray){
            let series = await this.getTmdb('tv', seriesIdArray[i], null, params);

            if (series) {
                series.media_type = 'tv';
                series = await this.getTmdbCertificationRating(series)
                seriesDetails.push(series);
            }
        }

        if (seriesDetails.length > 0) {
            return seriesDetails;
        }
    }

    /**
     * Search TMDB for series details using title and year
     *
     */
    async searchTmdbSeries(title, year) {
        const params = {
            query: title,
            first_air_date_year: year,
            include_adult: false,
            language:'en-US',
            page: 1
        };

        const res = await this.getTmdb('search', 'tv', null, params);

        return res.results[0];
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
        if(this.config) {
            const params = {
                language:'en-US'
            };

            const trendingMovies = await this.getTmdb('trending', 'movie', 'week', params);
            
            if(trendingMovies && trendingMovies.results) {
                const trendingMoviesIDs = [];
                let updatedTrendingMovies = null;

                trendingMovies.results.map(movies => {
                    trendingMoviesIDs.push(movies.id);
                });

                if(trendingMoviesIDs.length) {
                    updatedTrendingMovies = await this.getTmdbMoviesGroup(trendingMoviesIDs);
                }
                
                if (this.config.xcUrl) {
                    const updatedTrendingMoviesWXc = await this.getTrendingMovieXcIDs(updatedTrendingMovies);
                    return updatedTrendingMoviesWXc;
                } else {
                    return updatedTrendingMovies;
                }
            }
        }
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

        if(trendingSeries && trendingSeries.results) {
            const trendingSeriesIDs = [];
            let updatedTrendingSeries = null;

            trendingSeries.results.map(series => {
                trendingSeriesIDs.push(series.id);
            });

            if(trendingSeriesIDs.length) {
                updatedTrendingSeries = await this.getTmdbSeriesGroup(trendingSeriesIDs);
            }

            if (this.config.xcUrl) {
                const updatedTrendingSeriesWXc = await this.getTrendingSeriesXcIDs(trendingSeries.results);
                return updatedTrendingSeriesWXc;
            } else {
                return updatedTrendingSeries;
            }
        }
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
    async getTrendingMovieXcIDs(movieList) {
        if (!movieList) {
            const message = `Movie List not defined`;
            throw new Error(message);
        }

        const id_newReleases = 1337;
        const id_all = 'X';

        const allMovies = await this.execute('get_vod_streams', { category_id: id_all });

        if (allMovies && allMovies.length > 0 ) {
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
        }

        return movieList;
    }

    /**
     * GET VOD Info by Search Values
     *
     * @param {Object} seriesList
     */
    async getTrendingSeriesXcIDs(seriesList) {
        if (!seriesList) {
            const message = `Series List not defined`;
            throw new Error(message);
        }

        const id_all = 'X';

        const allSeries = await this.execute('get_series', { category_id: id_all });

        if (allSeries && allSeries.length > 0 ) {
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
        }

        return seriesList;
    }

    /**
     * GET Media Certification Rating
     *
     * @param {Object} seriesList
     */
    async getTmdbCertificationRating(media) {
        let updatedMedia = media;
        updatedMedia.certification_rating = null;

        if(media.media_type === 'movie') {
            let ratingMatch = media.release_dates.results.filter(rating => rating.iso_3166_1 === 'US');
            if(ratingMatch && ratingMatch.length && ratingMatch[0].release_dates.length && ratingMatch[0].release_dates[0].certification) {
                updatedMedia.certification_rating = ratingMatch[0].release_dates[0].certification;
            }
        } else {
            let ratingMatch = media.content_ratings.results.filter(rating => rating.iso_3166_1 === 'US');
            if (ratingMatch && ratingMatch.length && ratingMatch[0].rating) {
                updatedMedia.certification_rating = ratingMatch[0].rating;
            }
        }

        return updatedMedia;
    }
} 