let i = 0;
let lengthOfSelectMenu = 0;

var saveBtn = $('#saveBtn')

let request;

$.ajax({
	type: 'GET',
	url: "https://last-api.herokuapp.com/api/v1/answers/",
	dataType: 'json',  	
  	success: function(data){
		request = data;

  		for (i; i < data.length; i++) {
  			var newClass;
  			
  			var cloned = $('tbody > .cont').clone().prependTo('.ListAnsw');
  			newClass = 'cont' + i;
  			cloned.removeClass('cont').addClass(newClass).css("display", "");
			$("." + newClass + " div").attr("id", "app2");

			let app = new Vue({
				el: "#app2",
				data: {
					picked: false
				}
			});  
			
  			var textQuest = data[i]['text'];
  			var textBefore = data[i]['message_before_question'];
  			let goto = data[i]['goto'];
  			$('.' + newClass + ' .text').text(textQuest);	
    		$('.' + newClass + ' .before').text(textBefore);	
    		$('.' + newClass + ' .textQuest').text(goto);
    	}
	}
});

$.ajax({
	type: 'GET',
	url: "https://last-api.herokuapp.com/api/v1/questions/",
	dataType: 'json',  	
	success: function(data){
		for (let x = 0; x < i; x++){
			let newClass;
			newClass = 'cont' + x;
			for (let j = 0; j < data.length; j++){
				if ($('.' + newClass + ' .textQuest').text() == data[j]['id']){
					$('.' + newClass + ' .textQuest').text(data[j]['text'])
				}
			}
			
		}
	}
})

/*

$(".cont12 td form button").on('click', function(){
	alert($(this).text());
});

*/


saveBtn.on('click', function() {
	let textQuest = document.getElementById('textQuest').value;
	let messageBefore = document.getElementById("messageBefore").value;
	let arr = [];
	for (let j = i - 1; j >= 0; j--){
		let newClass;
		newClass = 'cont' + j;		
		if ($('.' + newClass + ' #true').length === 1){
			arr.push($('.' + newClass + ' .text').text());
		};
	}
	let questlist = [];
		for (let x = 0; x < i; x++){
			for (let t = 0; t < arr.length; t++){
				if (request[x]['text'] === arr[t]){
					questlist.push(request[x]['id']);
				}
			}
		}
	console.log(questlist);
	console.log(textQuest);
	console.log(messageBefore);
	let value = questlist;
	let sl;
	sl = JSON.stringify({"text": textQuest, "message_before_question": messageBefore, "answers": value})
	console.log(sl);

	$.ajax({
		type: 'POST',
		url: 'https://last-api.herokuapp.com/auth/token/login',
		data: { "password": "SherBot", "username": "admin"},
		success: function() {
			fetch('https://last-api.herokuapp.com/api/v1/question/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: sl
			}).then(() => {
				alert('Данные успешно записаны в БД');
				window.location.href = "main.html";
			});
		}
	})
	
});



/*


$.ajax({
	type: 'GET',
	url: "https://last-api.herokuapp.com/api/v1/questions/",
	dataType: 'json',  	
  	success: function(data){
		lengthOfSelectMenu = data.length;
  		i -= 1;
  		for (let j = 0; j < i; j++) {
  			if (j){
  				var selector = $('.cont' + j + ' .textQuest'); 
  			} else {
  				var selector = $('.cont .textQuest');
  			}
			var numb = selector.text();
			for (let k = 0; k < data.length; k++){
				if (data[k]['id'] == numb){
					selector.text(data[k]['text']);
				}
			}
		}    
		i = 0;
		let value = 0 
		for (i; i < data.length; i++) {
			var textQuest = data[i]['text'];
			newClass = 'menu' + value;
  			if (i){
   				value += 1;
				var element = document.getElementById('floatingSelect');
				var cloned = $('.menu').clone().appendTo(element);
				cloned.removeAttr('value').attr({'value': value + 1}).text(textQuest).removeClass('menu').addClass(newClass);
  			} else {
  				$('.menu').text(textQuest);	
			}
		}	

		saveBtn.on('click', function() {
			var textAnsw = document.getElementById('textAnsw').value
			var nextQuest = document.getElementById('floatingSelect').value
			
			var textNextQuest = ''
			if (nextQuest == 1){
				textNextQuest = $('.menu').text()
			}
			for (var i = 0; i < lengthOfSelectMenu; i++){
				if ($('.menu' + i).attr('value') == nextQuest) {
					textNextQuest = $('.menu' + i).text()
				}
			} 
			
			let idQuest = 0
			for (var i = 0; i < data.length; i++){
				if (data[i]['text'] == textNextQuest){
						idQuest = data[i]['id']
					}
				}
			
				$.ajax({
				type: 'POST',
				url: 'https://last-api.herokuapp.com/auth/token/login',
				data: {"username": "admin", "password": "admin"},
				success: function(response) {
					$.ajax({
						type: 'POST',
						url: 'https://last-api.herokuapp.com/api/v1/answer/create',
						data: {"text": textAnsw, "goto": idQuest},
						success: function(){
							alert('Данные успешно записаны в БД')
						}	
					})
				}
			})
		})
	  }
	}
)


*/

	//$('.icons img').each(function(){
	//	if ($(this).attr('src') == 'img/icon3.png'){
	//		$(this).fadeOut(1000);
	//	}
	//});

	//function change(element, newAttr, newWalue){
	//	var className = "." + element;
	//	$(className).attr(newAttr, newWalue);
	//}
	//change("logo", "title", "Новая подсказка");

	//$('.mainText').fadeTo(4000, 0.25);
	//$('.mainText').slideUp(2000).slideDown(3000).fadeTo(2000, 1);

	//$('.mainText').fadeTo(4000, 0.25).fadeTo(2000, 1);	

	//function elemOut (element, time) {
	//	if (time>5000 || time<1000){
	//		return false;
	//	} else {
	//		var className = "." + element;
	//		alert(className);
	//		$(className).fadeOut(time);
	//	}
	//}
	//elemOut('mainText', 5000);

	//$('.mainText').fadeOut(2000).fadeIn(3000);