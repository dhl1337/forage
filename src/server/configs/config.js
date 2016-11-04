module.exports = {
    session: {
        secret: 'secretkey',
        cookie: { maxAge: 2628000000 }
    },
    port: 9999,
    url: 'mongodb://localhost:27017/forage'
};