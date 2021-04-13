
$.ajax({
	type: 'GET',
	url: "https://api-test-post.herokuapp.com/api/v1/questions/",
	dataType: 'json',  	
  	success: function(data){
		let textArr = [];
		let messageBefore = [];
		let answList = [];
		let maxID = 0;
		let idList = [];
		let k = 1;
		for (let i = 0; i < data.length; i++){
			if (maxID < data[i]['id']){
				maxID = data[i]['id'];
				
			}	
		}
		for (let i = 0; i < data.length; i++){
			idList.push(data[i]['id']);
		}
		idList = idList.sort();
		let r = 1;
		for (let i = 0; i < idList.length; i++){
			if (r != idList[i]){
				idList.splice(i, 0, -1);
			}
			r++;
		}
		for (let i = 0; i < data.length - 1; i++) {
			for (let j = 0; j < data.length - 1 - i; j++) {
				if (data[j]['id'] > data[j + 1]['id']) {
					let swap = data[j];
					data[j] = data[j + 1];
					data[j + 1] = swap;
				}
			}
		}
		let j = 0;
		for (let i = 0; i < idList.length; i++){
			if (idList[i] != -1){
				textArr.push(data[j]['text']);
				messageBefore.push(data[j]['message_before_question']);
				answList.push(data[j]['answers']);
				j++;
			} else {
				textArr.push('-1');
				messageBefore.push('-1');
				answList.push([-1, -1]);	
			}	
		}
		for (let i = 0; i < maxID; i++) {
			for (let j = 0; j < data.length; j++){
				if (i + 1 === data[j]['id']){
					textArr.push(data[j]['text']);
					messageBefore.push(data[j]['message_before_question']);
					answList.push(data[j]['answers']);	
					var newClass;
					let newId, newIdDelete;
					var cloned = $('tbody .cont').clone().appendTo('.main');
					newClass = 'cont' + i;
					newId = 'popedUp' + i;
					newIdDelete = 'popedUpDelete' + i;
					cloned.removeClass('cont').addClass(newClass).css("display", "");
					newId = 'popedUp' + i;
					$('.' + newClass + ' form #popedUp').attr('id', newId);
					$('.' + newClass + ' form #popedUpDelete').attr('id', newIdDelete);
					var textQuest = data[j]['text'];
					var textBefore = data[j]['message_before_question'];
					$('.' + newClass + ' .text').text(textQuest);	
					$('.' + newClass + ' .before').text(textBefore);

					$('#' + newId).on('click', function(){
						$('html').css("overflow", "hidden");
						$('#textQ').text(textArr[Number(newId.slice(7))]);
						$('#beforeQ').text(messageBefore[Number(newId.slice(7))]);
						let height = 460;
						let chetAnsw = 0;
						$.ajax({
							type: 'GET',
							url: "https://api-test-post.herokuapp.com/api/v1/answers/",
							dataType: 'json',  
							success: function(data){
								let value = 0;
								for (let i = 0; i < data.length; i++) {
									var textAnsw = data[i]['text'];
									newClass = 'menu' + value;
   									value += 1;
									chetAnsw += 1;
									var element = $('#float');
									var cloned = $('.menu').clone().appendTo(element);
									cloned.removeAttr('value').attr({'value': value + 1}).text(textAnsw).removeClass('menu').addClass(newClass).css("display", "");
								}	
							}
						})	
						$('#addAnswerToQuest').on('click', function(){
							let newAnswerVal = document.getElementById('float').value
							let newAnswer = ""
							for (var i = 0; i < chetAnsw; i++){
								if ($('.menu' + i).attr('value') == newAnswerVal) {
									newAnswer = $('.menu' + i).text()
									let cloned = $('.listAnsw .0').clone().appendTo('.listAnsw');
									newClass = 'contAnsw' + i;
									$.ajax({
										type: 'GET',
										url: "https://api-test-post.herokuapp.com/api/v1/answer/" + String(newAnswerVal),
										dataType: 'json',  
										success: function(data){
											let goto;
											goto = data['goto'];
											cloned.removeClass('0').addClass(newClass).css("display", "");
											$('.' + newClass + ' .textAnsw').text(newAnswer).attr("id", String(newAnswerVal));	
											$('.' + newClass + ' .goto').text(goto);
											height += Number($('.' + newClass).height());
											$('#okno').css("height", String(height) + "px");
										}
									})
								}
							} 
						})
						$('#saveEdiBtn').on('click', function(){
							let textEdit = document.getElementById('textQ').value
							let messageEdit = document.getElementById('beforeQ').value
							let editlistAnswers = [];
							$('.textAnsw').each(function() {
								if ($(this).attr("id") != null){
									editlistAnswers.push(Number($(this).attr("id")));
								}
							});
							let sl = JSON.stringify({"text": textEdit, "message_before_question": messageEdit, "answers": editlistAnswers})
							$.ajax({
								type: 'POST',
								url: 'https://api-test-post.herokuapp.com/auth/token/login',
								data: {"username": "admin", "password": "SherBot"},
								success: function() {
									fetch('https://api-test-post.herokuapp.com/api/v1/question/' + String(Number(newId.slice(7)) + 1) + '/edit', {
										method: 'PUT',
										headers: {
											'Content-Type': 'application/json'
										},
										body: sl
									}).then((response) => {
										if (response["status"] === 200){
											alert('Данные успешно изменены');
											window.location.href = "main.html";
										} else {
											alert('Произошла ошибка, проверьте правильность заполнения формы')
										}
									});								
								}
							})
						})
						
						for (let i = 0; i < answList[Number(newId.slice(7))].length; i++){
							let question;
							question = answList[Number(newId.slice(7))][i];
							$.ajax({
								type: 'GET',
								url: "https://api-test-post.herokuapp.com/api/v1/answer/" + question,
								dataType: 'json',  	
								success: function(data){
									let cloned = $('.listAnsw .0').clone().appendTo('.listAnsw');
									newClass = String(question);
									cloned.removeClass('0').addClass(newClass).css("display", "");
									let textAnsw = data['text'];
									let nextQuest = data['goto'];
									$('.' + newClass + ' .textAnsw').text(textAnsw).attr("id", newClass);	
									$('.' + newClass + ' .goto').text(nextQuest);
									height += Number($('.' + newClass).height());
									$('#okno').css("height", String(height) + "px");
								}
							});
						}
					});

					$('#' + newIdDelete).on('click', function(){
						$('.cont' + i).css("background-color", "#D3D3D3");
						$('html').css("overflow", "hidden");
						$('#closePopUpDelete1').on('click', function(){
							$.ajax({
								type: 'DELETE',
								url: 'https://api-test-post.herokuapp.com/api/v1/question/' + String(i + 1) +'/delete',
								success: function(result) {
									alert(result['response'])
									window.location.href = "main.html";
								}
							});
							
						});
					});
			}
		}
	}
}
})


$.ajax({
	type: 'GET',
	url: "https://api-test-post.herokuapp.com/api/v1/answers/",
	dataType: 'json',  	
  	success: function(data){
		request = data;
		let i = 0;
  		for (i; i < data.length; i++) {
  			let newClass;
  			let cloned = $('tbody > .contAnswer').clone().prependTo('.ListAnswers');
  			newClass = 'contAnswer' + i;
  			cloned.removeClass('contAnswer').addClass(newClass).css("display", "");			
  			let textAnswer = data[i]['text'];
  			let nextQuestion = data[i]['goto'];
  			$('.' + newClass + ' .textAnswer').text(textAnswer);	
    		$('.' + newClass + ' .nextQuest').text(nextQuestion);
			
    	}
		$.ajax({
			type: 'GET',
			url: "https://api-test-post.herokuapp.com/api/v1/questions/",
			dataType: 'json',  	
			success: function(data){
				for (let x = 0; x < i; x++){
					let newClass;
					newClass = 'contAnswer' + x;
					for (let j = 0; j < data.length; j++){
						if ($('.' + newClass + ' .nextQuest').text() == data[j]['id']){
							$('.' + newClass + ' .nextQuest').text(data[j]['text'])
						}
					}
				}
			}
		})
	}
});

$('#popedUp').on('click', function(){
	$('html').css("overflow", "hidden");
});

$('#popedUpDelete').on('click', function(){
	$('html').css("overflow", "hidden");
});


$('#closePopUp').on('click', function(){
	$('html').css("overflow", "");
});

$('#closePopUpDelete').on('click', function(){
	$('html').css("overflow", "");
});


$('#closePopUp2').on('click', function(){
	$('html').css("overflow", "");
});

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

	//$('.mainText').fadeOut(2000).fadeIn(3000);*/