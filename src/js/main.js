import Swiper, { Navigation, Pagination, EffectFade, Autoplay, FreeMode } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import '@/styles/style.scss';
import axios from 'axios';
import IMask from 'imask';
import gsap from 'gsap';
import ScrollReveal from 'scrollreveal'


// ========== BURGER ==========
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const header = document.querySelector('.header')
if(iconMenu) {
	iconMenu.addEventListener("click", e => {
		e.preventDefault();
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
		header.classList.toggle('_active');
	})
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header')
  if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== swiperPartners ===============*/
var swiperPartners = new Swiper(".partners__swiper", {
  slidesPerView: 5,
  spaceBetween: 15,
  loop: true,
  breakpoints: {
        1: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        570: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        968: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1300: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
      },
  modules: [Navigation],
  navigation: {
    nextEl: ".partners__next",
    prevEl: ".partners__prev",
  },
});

/*=============== swiperReviews ===============*/
var swiperReviews = new Swiper(".reviews__swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  modules: [Pagination],
  breakpoints: {
      1: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      700: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      968: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('[data-goto]')

const linkAction = () =>{
  document.body.classList.remove('_lock');
  iconMenu.classList.remove('_active');
  menuBody.classList.remove('_active');
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// ПРОКРУТКА
const menuLinks = document.querySelectorAll('[data-goto]');
if(menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick)
   
  });

  function onMenuLinkClick (e) {
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      console.log(gotoBlock)
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY- document.querySelector('header').offsetHeight;
      console.log(gotoBlockValue)
      window.scrollTo({
        top:gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault(e)
    }
  }
}
// Функция для обновления стилей ссылок при прокрутке
const updateMenuLinks = () => {
  const scrollY = window.scrollY;

  menuLinks.forEach(menuLink => {
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    if (gotoBlock) {
      const sectionTop = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight;

      if (scrollY > sectionTop && scrollY < sectionTop + gotoBlock.offsetHeight) {
        menuLink.classList.add('accent');
      } else {
        menuLink.classList.remove('accent');
      }
    }
  });
}

window.addEventListener('scroll', updateMenuLinks);

/*=============== scrollUp ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll');
    header.classList.remove('_active');
};
window.addEventListener('scroll', scrollUp);
// const changeScrollUpBackground = () => {
//   const scrollUp = document.getElementById('scroll-up');
//   const section = document.querySelector('.help');
//   if (section) {
//     const rect = section.getBoundingClientRect();
//     const scrollUpRect = scrollUp.getBoundingClientRect();
//     if (scrollUpRect.top >= rect.top && scrollUpRect.bottom <= rect.bottom) {
//       scrollUp.classList.add('hameleon');
//     } else {
//       scrollUp.classList.remove('hameleon');
//     }
//   }
// };

// const scrollUp = () => {
//   const scrollUp = document.getElementById('scroll-up');
//   window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
//     : scrollUp.classList.remove('show-scroll');
// };

// window.addEventListener('scroll', () => {
//   scrollUp();
//   changeScrollUpBackground();
// });


/*=============== INPUT MASK ===============*/
// Найти все элементы с атрибутом data-mask="phone"
let phones = document.querySelectorAll('[data-mask="phone"]');

// Применить маску к каждому найденному элементу
phones.forEach(function(element) {
  new IMask(element, {
    mask: '+{7}(000)000-00-00'
  });
});

/*=============== AXIOS ===============*/
function validatePhone(phone)  {
  const cleanedPhone = phone.replace(/\D/g, "");
  console.log(new String(cleanedPhone).length)
  console.log(cleanedPhone.length === 11, "partial")

  if(cleanedPhone.length === 11) {
    return true; 
  } else {
    return false;
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateText(text)  {
  const trimmedText = text.trim();

    if (trimmedText.length >= 2) {
    return true;
  } else {
    return false;
  }
}
const validate = (input) => {
  const dataType = input.getAttribute("data-type");
  let res = true;

  switch(dataType) {
      case "phone": 
      res = validatePhone(input.value)
      break;
      case "text": 
      res = validateText(input.value)
      break;
      case "email":
      res = validateEmail(input.value);
      break;
  }
  console.log(input, res, dataType)
  return res;
}

let forms = document.querySelectorAll('.js-form');
console.log(forms)
forms.forEach((form) => {
  let formButton = form.querySelector(".js-form-submit");
	console.log(formButton)
	if(formButton) {
		formButton.addEventListener("click", (e) => {
		e.preventDefault();
		formButton.disabled = true;
		const inputs = form.querySelectorAll("input");
		const method = form.method;
		const action = form.action;
		let isValidated = true;
		let formData = [];

		inputs.forEach(input => {
      formData.push({
        name: input.name,
        value: input.value,
        isValidate: validate(input),
      })  
  })

	formData.forEach(item => {
    const input = form.querySelector(`[name="${item.name}"]`);
    const wrapper = input.parentNode;
    const errorBlock = wrapper.querySelector('.js-error');

    if(!item.isValidate) {
        isValidated = false;
        errorBlock.classList.add("_active")
        wrapper.classList.add("_active")
    } else {
        errorBlock.classList.remove("_active");
        wrapper.classList.remove("_active")
    }
  })

	if(!isValidated) {
    formButton.disabled = false;
    return false;
  }

	axios({
		method,
		url: action,
		data: formData,
}).then((response) => {
  sucesOpen();
		console.log("success");
		formButton.disabled = false;
      // Очистка полей ввода
    inputs.forEach(input => {
      input.value = "";
    });
}).catch((error) => {
		console.error(error);
    sucesOpen();
		formButton.disabled = false;
    inputs.forEach(input => {
      input.value = "";
    });
	});
})
	}
})


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 1000,
  delay: 100,
  // reset: true,
})
sr.reveal('.about__data, .discount__img , .contacts__content', {origin: 'left'})
sr.reveal('.outsourcing__image, .work__image , .contacts-form', {origin: 'right'})
sr.reveal('.help__image', {origin: 'bottom'})
sr.reveal('.help__image', {origin: 'top'})
sr.reveal(`.advantages__item`, {interval: 100})
sr.reveal(`.tarifs__item`, {interval: 100})