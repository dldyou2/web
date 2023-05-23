var express = require('express'), http = require('http'), path = require('path');
var static = require('serve-static');

var app = express();
var router = express.Router();

/*
router.route('/process/login').post(function(req, res) {
    ...
});

app.use('/', router);

router.route('...').get(function() {}); ...
*/

router.route('/').get(function(req, res) {
    console.log("redirect to my html");
    res.redirect("http://localhost:8080/src/jquery/jquery.html");
});

router.route('/routetest').get(function(req, res) {
    console.log("redirect to google");
    res.redirect("http://www.google.com");
});

app.set('port', process.env.PORT || 8080);
app.set('host', '127.0.0.1');
app.use(static(__dirname));

app.use(express.urlencoded());
app.use(express.json());

app.use('/', router);
app.use('/routetest', router);

app.all('*', function(req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

/*
app.use(function (req, res, next) {
    console.log('첫 번째 미들웨어에서 요청 처리');

    res.redirect('http://google.co.kr');
    req.user = 'mike';
    next();
});

app.get('/src', function(req, res, next) {
    console.log('두 번째 미들웨어에서 요청 처리');

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버에서' + req.user + '가 응답한 결과입니다.</h1>');
});
*/

http.createServer(app).listen(app.get('port'), app.get('host'), () => {
    console.log('Express server running at ' + app.get('port') + app.get('host'));
});