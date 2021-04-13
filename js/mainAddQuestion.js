let i = 0;
let lengthOfSelectMenu = 0;

var saveBtn = $('#saveBtn')

$.ajax({
	type: 'GET',
	url: "https://api-test-post.herokuapp.com/api/v1/questions/",
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
				url: 'https://api-test-post.herokuapp.com/auth/token/login',
				data: {"username": "admin", "password": "SherBot"},
				success: function(response) {
					$.ajax({
						type: 'POST',
						url: 'https://api-test-post.herokuapp.com/api/v1/answer/create',
						data: {"text": textAnsw, "goto": idQuest},
						success: function(){
							alert('Данные успешно записаны в БД');
							window.location.href = "main.html";
						}
					})
				}
			})
		})
	  }
	}
)




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