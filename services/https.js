const https = require('https');

// Expecting callback function as:
// done(error, responseStatusCode, responseJsonBody)

exports.getJson = (hostname, path, headers, done) => {
    const options = {
        method: 'GET',
        hostname: hostname,
        port: 443,
        path: path,
        headers: headers
    };

    let resBody = '';

    const req = https.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            resBody += chunk;
        });

        res.on('end', () => {
            let json = JSON.parse(resBody);
            done(null, res.statusCode, json);
        });
    });

    req.on('error', (err) => {
        done(err);
    });

    req.end();
};

exports.postJson = (hostname, path, headers, body, done) => {
    const options = {
        method: 'POST',
        hostname: hostname,
        port: 443,
        path: path,
        headers: headers
    };

    let resBody;

    const req = https.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            resBody += chunk;
        });

        res.on('end', () => {
            done(null, res.statusCode, JSON.parse(resBody));
        });
    });

    req.on('error', (err) => {
        done(err);
    });

    req.write(body);
    req.end();
};
