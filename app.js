
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var io = require('socket.io').listen(app);
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'ultrasecretfleisliuxhmhc'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.logger());
  app.use(express.static(__dirname + '/public'));
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

io.configure('production', function() {
    io.set('log level',0);
});

// Routes

app.get('/', function(req, res){
    res.render('index', {
        title: 'Chat chat chat line',
        layout: false
    });
});


var users = []

io.sockets.on('connection', function(socket) {
    var socket = socket;
    socket.emit('connected', users);
    socket.on('set nickname', function(name) {
        socket.set('nickname', name);
        users.push(name);
        io.sockets.emit('ready', {nickname: name});
    });
    socket.on('msg send', function(msg) {
        var msg = msg
        socket.get('nickname', function(err, name) {
            io.sockets.emit('message', {from: name, msg: msg});
        });
    });
    socket.on('disconnect', function(nick) {
        socket.get('nickname', function(err, name) {
            users.splice(users.indexOf(name),1);
            io.sockets.emit('out', {nickname: name});
        });
    });
});


//run the app with sudo, need permission to bind a lower port.
app.listen(666);

console.log("Express server listening on port %d", app.address().port);
