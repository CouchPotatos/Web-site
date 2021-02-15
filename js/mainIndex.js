$.ajax({
	type: 'GET',
	url: "https://app-name112.herokuapp.com/api/v1/questions/?format=json",
	dataType: 'json',  	
  	success: function(data){
  		for (let i = 0; i < data.length; i++) {
  			var newClass;
  			if (i){
  				var cloned = $('tbody > .cont').clone().appendTo('tbody');
  				newClass = 'cont' + i;
  				cloned.removeClass('cont').addClass(newClass);
  			}
  			var textQuest = data[i]['text'];
  			var textBefore = data[i]['message_before_question'];
  			if (i){
  				$('.' + newClass + ' .text').text(textQuest);	
    			$('.' + newClass + ' .before').text(textBefore);	
  			} else {
  				$('.cont .text').text(textQuest);	
    			$('.cont .before').text(textBefore);	
  			}
		}	
    }
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