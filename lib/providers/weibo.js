'use strict';

// Load modules

exports = module.exports = function (options) {

    return {
        protocol: 'oauth2',
        auth: 'https://api.weibo.com/oauth2/authorize',
        useParamsAuth: true,
        token: 'https://api.weibo.com/oauth2/access_token',
        profile: function (credentials, params, get, callback) {

            const query = {
                access_token: params.access_token
            };

            get('https://api.weibo.com/2/account/get_uid.json', query, (data) => {

                //const data = JSON.parse(data);
                const q = {
                    uid: data.uid,
                    access_token: params.access_token
                };

                get('https://api.weibo.com/2/users/show.json', q, (profile) => {

                    //const profile = JSON.parse(profile);
                    credentials.profile = {
                        id: profile.id,
                        username: profile.screen_name || profile.name,
                        displayName: profile.name,
                        raw: profile
                    };

                    return callback();
                });
            });
        }
    };

};