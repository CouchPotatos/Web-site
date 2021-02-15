let i = 0;

$.ajax({
	type: 'GET',
	url: "https://app-name112.herokuapp.com/api/v1/questions/?format=json",
	dataType: 'json',  	
  	success: function(data){
        	
    }
});

$.ajax({
	type: 'GET',
	url: "https://app-name112.herokuapp.com/api/v1/answers/?format=json",
	dataType: 'json',  	
  	success: function(data){
  		for (i; i < data.length; i++) {
  			var newClass;
  			if (i){
  				var cloned = $('tbody > .cont').clone().prependTo('.ListAnsw');
  				newClass = 'cont' + i;
  				cloned.removeClass('cont').addClass(newClass);
  			}
  			var textQuest = data[i]['text'];
  			var textBefore = data[i]['message_before_question'];
  			let goto = data[i]['goto'];
  			if (i){
  				$('.' + newClass + ' .text').text(textQuest);	
    			$('.' + newClass + ' .before').text(textBefore);	
    			$('.' + newClass + ' .textQuest').text(goto);
  			} else {
  				$('.cont .text').text(textQuest);	
    			$('.cont .before').text(textBefore);	
    			$('.cont .textQuest').text(goto);   
  			}
		}
    }
});

