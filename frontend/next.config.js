const path = require('path');

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'styles')]
    },
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '8000',
            pathname: '/files/**'
        }]
    }
}