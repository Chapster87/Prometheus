require('fetch-everywhere')
const qs = require('querystring-es3')
const pickBy = require('lodash.pickby')
const Promise = require('bluebird')

export default class Spark {
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
    execute (action, filter) {
        const query = pickBy({ ...this.config.auth, action, ...filter })

        return Promise.resolve()
        .then(() => fetch(`${this.config.baseUrl}/player_api.php?${qs.stringify(query)}`))
        .then(T => T.json())
        .then(data => {
            if (action && data.hasOwnProperty('user') &&
            data.user.hasOwnProperty('status') &&
            data.user_info.status === 'Disabled') {
            return Promise.reject(new Error('account disabled'))
            }

            return data
        })
    }

    /**
     * execute query on xtream server
     *
     * @param {string} [action]
     * @param {{ [ key: string ]: string }} [filter]
     * @returns {Promise<any>}
     */
    async execute2(action, filter) {
        const query = pickBy({ ...this.config.auth, action, ...filter })

        const res = await fetch(`${this.config.baseUrl}/player_api.php?${qs.stringify(query)}`);

        if (!response.ok) {
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

    getAccountInfo () {
        return this.execute()
        .then(response => {
            if (response.user_info.auth === 0) {
            return Promise.reject(new Error('authentication error'))
            }

            return response.user_info
        })
    }

    getLiveStreamCategory () {
        return this.execute('get_live_categories')
    }

    getVODStreamCategories () {
        return this.execute('get_vod_categories')
    }

    getSeriesCategories () {
        return this.execute('get_series_categories')
    }

    /**
     * @param {string} [category]
     */
    getLiveStreams (category) {
        return this.execute('get_live_streams', { category_id: category })
    }

    /**
     * @param {string} [category]
     */
    getVODStreams (category) {
        return this.execute('get_vod_streams', { category_id: category })
    }

    /**
     * @param {string} [category]
     */
    getSeriesStreams (category) {
        return this.execute('get_series', { category_id: category })
    }

    /**
     * GET VOD Info
     *
     * @param {number} id This will get info such as video codecs, duration, description, directors for 1 VOD
     */
    getVODInfo (id) {
        if (!id) {
        return Promise.reject(new Error('Vod Id not defined'))
        }

        return this.execute('get_vod_info', { vod_id: id })
        .then(T => {
            if (T.hasOwnProperty('info') && T.info.length === 0) {
            return Promise.reject(new Error(`vod with id: ${id} not found`))
            }

            return T
        })
    }

    /**
     * GET Series Info
     *
     * @param {number} id This will get info such as video codecs, duration, description, directors for 1 Series
     */
    getSeriesInfo (id) {
        if (!id) {
        return Promise.reject(new Error('Vod Id not defined'))
        }

        return this.execute('get_series_info', { series_id: id })
        .then(T => {
            if (T.hasOwnProperty('info') && T.info.length === 0) {
            return Promise.reject(new Error(`vod with id: ${id} not found`))
            }

            return T
        })
    }

    /**
     * GET short_epg for LIVE Streams (same as stalker portal, prints the next X EPG that will play soon)
     *
     * @param {number} id
     * @param {number} limit You can specify a limit too, without limit the default is 4 epg listings
     */
    getEPGLiveStreams (id, limit) {
        return this.execute('get_short_epg', { stream_id: id, limit })
    }

    /**
     * GET ALL EPG for LIVE Streams (same as stalker portal, but it will print all epg listings regardless of the day)
     *
     * @param {number} id
     */
    getAllEPGLiveStreams (id) {
        return this.execute('get_simple_data_table', { stream_id: id })
    }
} 