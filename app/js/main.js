jQuery(document).ready(function($){
	const bannerParralax = function(){
		window.onscroll = () => {
			let scrolled = window.pageYOffset;

			const banner = document.querySelector('.banner'),
				bannerText = document.querySelector('.banner__text');
			banner.style.transform = 'translate(0%,' + scrolled / 40 + '%';
			bannerText.style.margin = ("70" - scrolled / 30 + "px") + " auto";
		};
	}
	
	const headerMenuToggle = function(){
		const menuToggle = $('#menu-responsive-toggle'),
			menuResponsive = $('#menu-responsive'),
			buttonClose = $('#close-menu');

		const activeClass = 'menu-responsive-wrapper--active';

		menuToggle.on('click', () => {
			if(!menuResponsive.hasClass(activeClass)){
				menuResponsive.addClass(activeClass);
			}
		})

		buttonClose.on('click', () => {
			if (menuResponsive.hasClass(activeClass)) {
				menuResponsive.removeClass(activeClass);
			}
		})

	}
	
	const memoriesSliderInit = function(){

		$('.memories-slider').slick({
			autoplay: true,
			autoplaySpeed: 3000,
			arrows: false
		})

	}

	const pancakesSliderInit = function() {
		$('.pancakes-slider').slick({
			autoplay: true,
			autoplaySpeed: 3000,
			arrows: false,
		})
	}

	const tastySliderInit = function() {
		$('.tasty-slider').slick({
			autoplay: true,
			autoplaySpeed: 3000,
			prevArrow: '<button type="button" class="tasty-slider__button tasty-slider__button--prev"><i class="fas fa-angle-left"></i></ button>',
			nextArrow: '<button type="button" class="tasty-slider__button tasty-slider__button--next"><i class="fas fa-angle-right"></i></ button>',
			slidesToShow: 3,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2
					}
				}
			]
		})
	}

	const tastyResizeInit = function() {

		const tastyResizeBtn = document.querySelector('.tasty__resize-button'),
			  blockToMove = document.querySelector('.tasty');

		const buttonDefaultPos = blockToMove.getBoundingClientRect().left;

		const maxMoveRight = buttonDefaultPos + 167;
		let currentMove = 0,
			startMargin = -167;

		const moveElementRight = function(e){
			let xOffset = e.clientX;
			currentMove = xOffset - buttonDefaultPos + startMargin;
			if (
				xOffset >= buttonDefaultPos && xOffset <= maxMoveRight
			) {
				blockToMove.style.marginLeft = currentMove + 'px';
			} else if (xOffset > maxMoveRight) {
				currentStep = -167;
				blockToMove.style.marginLeft = 0 + 'px';
			}
		}
		
		tastyResizeBtn.addEventListener('mousedown', () => {
			tastyResizeBtn.addEventListener('mousemove',moveElementRight)
		});
		document.addEventListener('mouseup', () => {
			tastyResizeBtn.removeEventListener('mousemove', moveElementRight);
		})
	}

	const breakfastMenuPick = function() {
		const breakfastMenus = document.querySelectorAll('.breakfast-morning');

		let currentActiveZ = 0;

		let minDataZ = 10,
			maxDataZ = minDataZ * breakfastMenus.length;

		let scaleMinus = .05,
			transformPlus = 7;

		breakfastMenus.forEach(item => {
			item.setAttribute('data-z', maxDataZ);
			if(maxDataZ === breakfastMenus.length * 10){
				currentActiveZ = maxDataZ;
				item.style.transform = "translateX(0%) scale(1)";
				item.style.zIndex = maxDataZ;
				maxDataZ -= 10;
			}else if(maxDataZ >= minDataZ){	
				item.style.transform = `translateX(${transformPlus}%) scale(${1 - scaleMinus})`;
				item.style.zIndex = maxDataZ;
				maxDataZ -= 10;
				transformPlus += 7;
				scaleMinus += .05;
			}
			
		})

		breakfastMenus.forEach(item => {
			item.addEventListener('click', e => {
				const target = e.target,
					  targetZ = target.getAttribute('data-z'),
					  previousActiveItem = document.querySelector(`.breakfast-morning[data-z="${currentActiveZ}"`);

				if (currentActiveZ !== targetZ) {

					const targetZStyle = target.style.zIndex,
						targetTransformStyle = target.style.transform,
						previosZStyle = previousActiveItem.style.zIndex,
						previousTransformStyle = previousActiveItem.style.transform;
						
						previousActiveItem.style.transform = targetTransformStyle;
						previousActiveItem.style.zIndex = targetZStyle;

						target.style.transform = previousTransformStyle;
						target.style.zIndex = previosZStyle;
					
						
						currentActiveZ = targetZ;
				}
			})
		})
	}

	const smoothScroll = function(target, duration) {

		let targetEl = $(target),
		targetPosition = targetEl.offset().top,
		startPosition = window.pageYOffset,
		startTime = null;
		
		let timeIs = new Date()

		function animate(currentTime) {

			if (startTime === null) startTime = currentTime
			let timePassed = currentTime - startTime,
				distance = targetPosition - startPosition,
				scrollTo = easeInOutQuad(timePassed, startPosition, distance, duration);

			window.scrollTo(0, scrollTo);
			if (duration > timePassed) requestAnimationFrame(animate)


		}

		function easeInOutQuad(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		requestAnimationFrame(animate)

  	}  

	$('.banner__button').on('click', () => {
		smoothScroll('#s-breakfast', 500)
	})

	$('.banner__cake').on('click', () => {
		smoothScroll('#s-pancakes', 500)
	})


	bannerParralax();
	headerMenuToggle();
	memoriesSliderInit();
	pancakesSliderInit();
	tastySliderInit();
	tastyResizeInit();
	breakfastMenuPick();
})