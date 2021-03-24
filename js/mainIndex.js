// makeDTO(1);

$.ajax({
	type: 'GET',
	url: "https://api-test-post.herokuapp.com/api/v1/questions/",
	dataType: 'json',  	
  	success: function(data){
  		for (let i = 0; i < data.length; i++) {
  			var newClass;
  			var cloned = $('tbody .cont').clone().appendTo('.main');
  			newClass = 'cont' + i;
			cloned.removeClass('cont').addClass(newClass).css("display", "");
  			var textQuest = data[i]['text'];
  			var textBefore = data[i]['message_before_question'];
  			$('.' + newClass + ' .text').text(textQuest);	
    		$('.' + newClass + ' .before').text(textBefore);
			$('#popedUp').on('click', function(){
				$('html').css("overflow", "hidden");
				console.log('suck');
			});	
		}	
    }
});

$('#popedUp').on('click', function(){
	$('html').css("overflow", "hidden");
	console.log('suck');
});	

$('#closePopUp').on('click', function(){
	$('html').css("overflow", "");
	console.log('suck');
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