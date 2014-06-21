var cmdPlug = {
	autowoot: true,
	autojoin: true,
	cooldown: 1000,
	notif: function(text, icon) {
		_$context.trigger('notify', icon, text);
	},
	meh: function() {
		if($("#user-lists").children(".header").children().hasClass("button room selected") && $("#user-lists").attr("style").indexOf("display: block;") !=-1) {
			var a = $("#user-lists .list .user");
			var b = API.getUsers();
			for (var c = 0; c < b.length; c++) {
				if(b[c].vote == -1) { 
					if ($(a[c]).find('.icon-meh').length === 0) {
						$(a[c]).find('.name').after('<i style="left: auto;right: 9px;top: -1px;" class="icon icon-meh"></i>');
					}
				}
				else if (b[c].vote == 0 || b[c].vote == 1 || b[c].vote == 2) {
					if ($(a[c]).find('.icon-meh').length) {
						$(a[c]).find('.icon-meh').remove();
					}
				}
			}
		}
	},
	random_item: function(list) {
		var random = Math.floor(Math.random() * list.length);
		return list[random]
	},
	eventDjAdvance: function(obj) {
		if(cmdPlug.autowoot){
			setTimeout(function(){ $('#woot').click() }, cmdPlug.cooldown);
		}
		if(cmdPlug.autojoin){
			setTimeout(function(){ API.djJoin() }, cmdPlug.cooldown);
		}
	},
	eventChatCommand: function(value) {
		if(value.split(' ').length === 1) {
			switch(value) {
				case "/autowoot":
					cmdPlug.autowoot = !cmdPlug.autowoot;
					var bool = cmdPlug.autowoot ? "activé" : "désactivé";
					API.chatLog("Autowoot est maintenant " + bool);
					break;
				case "/autojoin":
					cmdPlug.autojoin = !cmdPlug.autojoin;
					var bool = cmdPlug.autojoin ? "activé" : "désactivé";
					API.chatLog("Autojoin est maintenant " + bool);
					break;
				case "/?":
					API.chatLog("Aide: /autowoot active / désactive l'auto-woot");
					API.chatLog("/autojoin active / désactive l'auto-join");
					break;
				default:
					API.chatLog("Commande introuvable");
					break;
			}
		}
		else if(value.split(' ').length === 2){
			var cmd = value.split(' ')[0];
			var opt = value.split(' ')[1];
			switch(cmd){
				case "/bg":
					// Background by http://maxkunowski.com/plug/
					var num = parseInt(opt);
					switch(num){
						case 1:
							$('body').css('background-image', 'url(http://i.imgur.com/nptZvUk.png)');
							break;
						case 2:
							$('body').css('background-image', 'url(http://i.imgur.com/mL0fuwb.png)');
							break;
						case 3:
							$('body').css('background-image', 'url(http://i.imgur.com/WTylHRy.png)');
							break;
						case 4:
							$('body').css('background-image', 'url(http://i.imgur.com/u36VR4n.png)');
							break;
						case 5:
							$('body').css('background-image', 'url(http://i.imgur.com/GZKgCpk.png)');
							break;
						case 6:
							$('body').css('background-image', 'url(http://i.imgur.com/XZNVZmj.png)');
							break;
						case 7:
							$('body').css('background-image', 'url(http://i.imgur.com/9DVTnnW.png)');
							break;
						case 8:
							$('body').css('background-image', 'url(http://i.imgur.com/6N7svVu.png)');
							break;
						default:
							API.chatLog('Background non trouvé: /bg 1 à 8');
							break;
					}
					break;
				default:
					API.chatLog("Commande introuvable");
					break;
			}
		}
	},
	annonce: ["Le site web de RealityGaming: http://realitygaming.fr/", "Le tutoriel et les règles du plug: http://goo.gl/oRMhpS", "Liste des smileys disponible sur le plug: http://goo.gl/AKDkeo", "Musique interdite: http://goo.gl/eiRdQK", "Passez un bon moment sur le plug officiel de RealityGaming !", "Pour tout problème, veuillez contacter un staff !", "Il est interdit d'être dj en étant afk plus de 30 minutes !"],
	api_listener: function() {
		API.on(API.DJ_ADVANCE, cmdPlug.eventDjAdvance);
		API.on(API.CHAT_COMMAND, cmdPlug.eventChatCommand);
	},
	init: function() {
		API.chatLog('cmdPlug lancé, aide: /?');
		if((window.location.pathname == '/realitygaming/' || window.location.pathname == '/realitygaming') && API.getUser().permission => 1) {
			var annonce_list = cmdPlug.annonce;
			var cooldown = 1200000;
			setInterval(function(){ API.sendChat(cmdPlug.random_item(annonce_list)) }, cooldown);
		}
		setInterval(cmdPlug.meh, 100);
		cmdPlug.api_listener();
	}
}