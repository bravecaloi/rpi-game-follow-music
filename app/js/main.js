$('.instruments a').on('click', function(){
	$(this).find("strong").addClass('animated wobble').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(this).removeClass('animated wobble');
		});
});