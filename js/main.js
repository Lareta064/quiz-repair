
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

	});

	cityArr.addEventListener('click', function(e){
		if(e.target.tagName == "LI"){
			e.stopPropagation();
			cityInput.querySelector('input').value = e.target.textContent;
			this.style.height = 0;
		}
	});

	/*START QUIZ*/
	const startQuiz = document.querySelector('#start-quiz');
	const quizBlock = document.querySelector('#quiz');
	startQuiz.addEventListener('click', function(){
		quizBlock.classList.add('active');
	});
	if(quizBlock){

		const quizcloseBtn = this.querySelector('.close-modal');

		quizBlock.addEventListener('click', function(e){
			if(!e.target.closest('.plate') ){
				this.classList.remove('active');
			}
		});
	}

	// ---------------------------------------------------------------------------Работа с формой
	// Список карточек вопросов
	const plates = document.querySelectorAll('.plate');

	// Обходим все карточки вопросов
	for(let i = 0 ; i < plates.length ; i++){
		// Обработчик клика внутри карточки вопроса
		plates[i].addEventListener('click', function(event){
			// Для тех карточек где выбирются варианты и только для клика на карточку с вариантом
			if(i < 3 && event.target.tagName === 'INPUT'){
				// Записать выбор в хранилище
				sessionStorage.setItem(event.target.name, event.target.value);

				// Если на экране уже есть выбранная карточка
				if(plates[i].querySelector('label.active')){
					// Снять "выбор"
					plates[i].querySelector('label.active').classList.remove('active');
				};

				// Установить "выбор" на нажатой карточке
				event.target.closest('label').classList.add('active');
				
				setTimeout(() => {
					// "Спрятать" эту карточку
					this.classList.remove('plate-active');

					// "Проявить" следующую
					plates[i+1].classList.add('plate-active');
				}, 200);
				
			}
		});

		// Селектор "кнопка назад"
		const backBtn = plates[i].querySelector('button.back-btn');

		// Если она есть на текущей карточке
		if(backBtn){
			// Обработка клика на кнопке назад
			backBtn.addEventListener('click', function(event){
				// "Спрятать" эту карточку
				plates[i].classList.remove('plate-active');

				// "Проявить" предыдущую
				plates[i-1].classList.add('plate-active');
			})
		};

		// Селектор кнопки отправки
		const sendBtn = plates[i].querySelector('button[type=submit]');

		// Если она есть на текущей карточке
		if(sendBtn){
			// Обработка клика на кнопке отправить
			sendBtn.addEventListener('click', function(event){
				// Отключение стандартной логики
				event.preventDefault();

				// Селекторы полей имени, телефона и города
				const name = plates[i].querySelector('input[name=user_Name]');
				const phone = plates[i].querySelector('input[name=user_Phone]');
				const city = plates[i].querySelector('input[name=user_City]');

				// Если все поля заполнены
				if(name.value.trim().length !== 0 &&
					phone.value.trim().length !== 0 &&
					city.value.trim().length !== 0)
					{

					// Добавить в хранилище информацию из полей
					sessionStorage.setItem('name', name.value.trim());
					sessionStorage.setItem('phone', phone.value.trim());
					sessionStorage.setItem('city', city.value.trim());

					setTimeout(() => {
						// "Спрятать" эту карточку
						plates[i].classList.remove('plate-active');

						// "Проявить" следующую
						plates[i+1].classList.add('plate-active');

						setTimeout(() => {
							document.querySelector('section.quiz').classList.remove('active');
						}, 1000);
					}, 200);
					
					// Создаем и отправляем запрос
					sendForm(['brand','problem','type','name','phone','city']);
				}
				// Если не все поля заполнены
				else{
					// Сообщение предупреждение
					alert("Пожалуйста, убедитесь что все поля заполнены!");
				}

			});
		};
	};

	// Функция для отправки формы
	function sendForm(atrArray){
		// Создаем запрос
		const request = new XMLHttpRequest();
		const url = 'php/send.php?';
		// const url = `https://httpbin.org/post`;
		request.open('POST', url, true);

		// Устанавливаем заголовок
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		// Инициализируем тело запроса
		let body = '';

		// Заполняем тело запроса атрибутами переданного аргумента
		for(const elem of atrArray){
			body += `${elem}=${sessionStorage.getItem(elem)}&`;
			sessionStorage.removeItem(elem);
		};

		// Отправляем запрос
		request.send(body);
	};
	// ------------------------------------------------------------------------------------------
});

