$(function(){$(document).ready(function(){var a;$("#nick-modal").modal({backdrop:"static",keyboard:false,show:true});var b=io.connect();$(window).unload(function(){b.emit("disconnect",$("#nickname").val())});$("#nickname").keypress(function(a){if((a.keyCode?a.keyCode:a.which)==13){a.preventDefault();$("#nick-ok").click()}});$("#textfield").keypress(function(a){if((a.keyCode?a.keyCode:a.which)==13){$("#ok").click()}});b.on("connected",function(a){for(var b=0;b<a.length;b++){var c=document.createElement("li");c.innerHTML=a[b];$("#lateral")[0].appendChild(c)}});b.on("out",function(a){if(a.nickname!=null){var b=document.createElement("li");b.innerHTML="<p><strong>"+a.nickname+"</strong> saiu do chat.</p>";$("#field")[0].appendChild(b);var c=$("#lateral").children();$("#field").animate({scrollTop:1e7},500);for(var d=0;d<c.length;d++){if(c[d].innerHTML===a.nickname){$("#lateral")[0].removeChild(c[d]);return}}}});b.on("ready",function(a){var b=document.createElement("li");b.innerHTML="<p><strong>"+a.nickname+"</strong> entrou no chat. </p>";var c=document.createElement("li");$("#field")[0].appendChild(b);c.innerHTML=a.nickname;$("#lateral")[0].appendChild(c);$("#field").animate({scrollTop:1e7},500)});$("#nick-ok").click(function(){a=$("#nickname").val();if(a.toLowerCase()==="thiago"||a.toLowerCase()==="thiagopnts"||a.toLowerCase()==="tita")a="otário";if(a.trim()==="")alert("Deixe de onda...");else{b.emit("set nickname",a);$("#nick-modal").modal().trigger("hide")}});$("#ok").click(function(){b.emit("msg send",$("#textfield").val());$("#textfield").val("")});b.on("message",function(a){var b=document.createElement("li");b.innerHTML="<p><strong>"+a.from+" diz:</strong><br/>"+a.msg+"</p>";$("#field")[0].appendChild(b);$("#field").animate({scrollTop:1e7},500)})})})
