'use strict';

// Load modules

const Hapi = require('hapi');
const Hoek = require('hoek');
const Bell = require('../');


const server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3456 });

server.register(Bell, (err) => {

    Hoek.assert(!err, err);
    server.auth.strategy('weibo', 'bell', {
        provider: 'weibo',
        password: 'cookie_encryption_password_secure',
        //isSecure: false,
        clientId: '',
        clientSecret: '',
        location: server.info.uri
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/bell/weibo',
        config: {
            auth: {
                strategy: 'weibo'
            },
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }
                reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
            }
        }
    });

    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Server started at:', server.info.uri);
    });
});
