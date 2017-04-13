'use strict';

// Load modules

exports = module.exports = function (options) {

    return {
        protocol: 'oauth2',
        auth: 'https://graph.qq.com/oauth2.0/authorize',
        useParamsAuth: true,
        token: 'https://graph.qq.com/oauth2.0/token',
        profile: function (credentials, params, get, callback) {

            const query = {
                access_token: params.access_token
            };

            get('https://graph.qq.com/oauth2.0/me', query, (data) => {

                data = JSON.parse(data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1));

                const q = {
                    access_token: params.access_token,
                    oauth_consumer_key: data.client_id,
                    openid: data.openid
                };

                get('https://graph.qq.com/user/get_user_info', q, (profile) => {

                    credentials.profile = {
                        id: data.openid,
                        username: profile.nickname,
                        displayName: profile.nickname,
                        raw: profile
                    };

                    return callback();
                });
            });
        }
    };

};