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
			let newId;
  			var cloned = $('tbody .cont').clone().appendTo('.main');
  			newClass = 'cont' + i;
			newId = 'popedUp' + i;
			cloned.removeClass('cont').addClass(newClass).css("display", "");
			newId = 'popedUp' + i;
			$('.' + newClass + ' form #popedUp').attr('id', newId);
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
					console.log(question);
					$.ajax({
						type: 'GET',
						url: "https://api-test-post.herokuapp.com/api/v1/answer/" + question,
						dataType: 'json',  	
						  	success: function(data){
								console.log(data['text']);
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
				/*height += 50;
				$('#okno').css("height", String(height) + "px");*/
			});
		}	
    }
});

$('#popedUp').on('click', function(){
	$('html').css("overflow", "hidden");
});

$('#closePopUp').on('click', function(){
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