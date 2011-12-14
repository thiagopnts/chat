
$(function() {
//  $(".modal").unbind('click');
  $(document).ready(function() {
    var nickname;
    $("#nick-modal").modal({backdrop: 'static', keyboard: false, show: true});
    var socket = io.connect();
    $(window).unload(function() {
        socket.emit('disconnect', $("#nickname").val());
    });

    $("#nickname").keypress(function(event) {
        if((event.keyCode? event.keyCode:event.which) == 13) {
            event.preventDefault();
            $("#nick-ok").click();
        }
    });

    $("#textfield").keypress(function(event) {
        if((event.keyCode? event.keyCode:event.which) == 13) {
            $("#ok").click();
        }
    });

    socket.on('connected', function(users) {
        for(var i = 0; i < users.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = users[i];
            $("#lateral")[0].appendChild(li);
        }
    });

    socket.on('out', function(data) {
        if (data.nickname != null) {
            var li = document.createElement('li');
            li.innerHTML = "<p><strong>"+data.nickname+"</strong> saiu do chat.</p>";
            $("#field")[0].appendChild(li);
            var users = $("#lateral").children();
            $("#field").animate({scrollTop: 10000000}, 500);
            for(var i = 0; i < users.length; i++) {
                if(users[i].innerHTML === data.nickname) {
                    $("#lateral")[0].removeChild(users[i]);
                    return;
                }
            }
        }
    });

    socket.on('ready', function(data) {
      var p = document.createElement('li');
      p.innerHTML = "<p><strong>"+data.nickname+"</strong> entrou no chat. </p>";
      var nick = document.createElement('li');
      $("#field")[0].appendChild(p);
      nick.innerHTML = data.nickname;
      $("#lateral")[0].appendChild(nick);
      $("#field").animate({scrollTop: 10000000}, 500);
    });

    $("#nick-ok").click(function() {
        nickname = $("#nickname").val();
        if (nickname.toLowerCase() === 'thiago' || nickname.toLowerCase() === 'thiagopnts' || nickname.toLowerCase() === 'tita') 
            nickname = 'otário';
        if (nickname.trim() === "") 
            alert('Deixe de onda...');
        else {
            socket.emit('set nickname', nickname);
            $("#nick-modal").modal().trigger('hide');
        }
    });

    $("#ok").click(function() {
        socket.emit('msg send', $("#textfield").val());
        $("#textfield").val('');
    });

    socket.on('message', function(data) {
        var li = document.createElement('li');
        li.innerHTML = "<p><strong>"+data.from+" diz:</strong><br/>"+data.msg+"</p>";
        $("#field")[0].appendChild(li);
        $("#field").animate({scrollTop: 10000000}, 500);
    });


  });
});
