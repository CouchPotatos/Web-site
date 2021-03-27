// makeDTO(1);

$.ajax({
	type: 'GET',
	url: "https://api-test-post.herokuapp.com/api/v1/questions/",
	dataType: 'json',  	
  	success: function(data){
		let textArr = [];
		let messageBefore = [];
		let answList = [];
  		for (let i = 0; i < data.length; i++) {
			textArr.push(data[i]['text']);
			messageBefore.push(data[i]['message_before_question']);
			answList.push(data[i]['answers']);
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
  			var textQuest = data[i]['text'];
  			var textBefore = data[i]['message_before_question'];
  			$('.' + newClass + ' .text').text(textQuest);	
    		$('.' + newClass + ' .before').text(textBefore);

			$('#' + newId).on('click', function(){
				$('html').css("overflow", "hidden");
				$('#textQ').text(textArr[Number(newId.slice(7))]);
				$('#beforeQ').text(messageBefore[Number(newId.slice(7))]);
				let height = 350;
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
								height += 50;
								$('#okno').css("height", String(height) + "px");
						  	}
					});
				}
			});

			$('#' + newIdDelete).on('click', function(){
				$('.cont' + i).css("background-color", "#C0C0C0");
				$('html').css("overflow", "hidden");
				$('#closePopUpDelete1').on('click', function(){
					$.ajax({
						type: 'DELETE',
						url: 'http://127.0.0.1:8000/api/v1/question/' + String(i + 1) +'/delete',
						success: function(result) {
							alert(result);
						}
					});
					
				});
			});
		}	
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