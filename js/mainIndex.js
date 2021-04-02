// makeDTO(1);

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
			while (k != data[i]['id']){
				idList.push(-1);
				k++;
			}
			if (k === data[i]['id']){
				idList.push(data[i]['id']);
				k++;
			} 	
		}
		let r = 0;
		for (let j = 0; j < idList.length; j++){
			if (idList[j] != -1){
				textArr.push(data[r]['text']);
				messageBefore.push(data[r]['message_before_question']);
				answList.push(data[r]['answers']);
				r++;
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
						$.ajax({
							type: 'GET',
							url: "https://api-test-post.herokuapp.com/api/v1/answers/",
							dataType: 'json',  
							success: function(data){
								let value = 0;
								for (i; i < data.length; i++) {
									var textAnsw = data[i]['text'];
									newClass = 'menu' + value;
   									value += 1;
									var element = $('#floatingSelect');
									var cloned = $('.menu').clone().appendTo(element);
									cloned.removeAttr('value').attr({'value': value + 1}).text(textAnsw).removeClass('menu').addClass(newClass).css("display", "");
								}	
							}
						})	
						for (let i = 0; i < answList[Number(newId.slice(7))].length; i++){
							let question;
							question = answList[Number(newId.slice(7))][i];
							$.ajax({
								type: 'GET',
								url: "https://api-test-post.herokuapp.com/api/v1/answer/" + question,
								dataType: 'json',  	
									success: function(data){
										let cloned = $('.listAnsw .contAnsw').clone().appendTo('.listAnsw');
										newClass = 'contAnsw' + i;
										cloned.removeClass('contAnsw').addClass(newClass).css("display", "");
										let textAnsw = data['text'];
										let nextQuest = data['goto'];
										$('.' + newClass + ' .textAnsw').text(textAnsw);	
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
									if (result['failure'] === "undefined"){
										alert(result["success"]);
									} else { 
										alert(result["failure"]);
									}
									window.location.href = "main.html";
								}
							});
							
						});
					});
				}
			}
		}	
    }
});


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

	//$('.mainText').fadeOut(2000).fadeIn(3000);