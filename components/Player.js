require('fetch-everywhere')
const qs = require('querystring-es3')
const pickBy = require('lodash.pickby');

export default class Player {
    /**
     * @param {{ baseUrl: string, auth: { username: string, password: string } }} [config]
     */
    constructor (config = {}) {
        this.config = config
    }

    /**
     * @param {string} baseURL
     */
    setBaseURL (baseURL) {
        if (!baseURL) {
        throw new Error('baseURL must be null')
        }

        this.config.baseUrl = baseURL
    }

    /**
     * @param {string} username
     * @param {string} password
     */
    setAuth (username, password) {
        this.config.auth = { username, password }
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
            const message = `An error has occured: ${response.status}`;
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

        const res = await this.execute('get_series_info', { series_id: id });

        if (res.hasOwnProperty('info') && res.info.length === 0) {
            const message = `vod with id: ${id} not found`;
            throw new Error(message);
        }

        return res;
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
        const streamResponse = await this.execute('get_live_streams', { category_id: category })
        const limit = 0;

        await Promise.all(streamResponse.map(async (stream) =>{
            const epg = await this.execute('get_short_epg', { stream_id: stream.stream_id, limit })
            stream.epg_listings = epg.epg_listings;
        }));

        return streamResponse;
    }
} 