
$(document).ready(function(){
	// маска для телефона
	$.mask.definitions['N'] = '[/0-6|9/]';
	$(".phone").mask("+7(N99)999-99-99");
	$.fn.setCursorPosition = function (pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};
	$('input.phone').click(function () {
		$(this).setCursorPosition(3); // set position number
	});
	//custom select
	const cityInput = document.querySelector('.select-wrapper');
	const cityArr = document.querySelector('.select-list');

	cityInput.addEventListener('click', function(){
		cityArr.style.height = cityArr.scrollHeight +'px';
		console.log(cityArr.scrollHeight);

	});

	cityArr.addEventListener('click', function(e){
		if(e.target.tagName == "LI"){
			e.stopPropagation();
			cityInput.querySelector('input').value = e.target.textContent;
			this.style.height = 0;
		}		
	})
})