
///open-close menu
const navBtn = document.querySelector(".menu-btn"),
  navMenu = document.querySelector(".nav");

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("menu-btn_open-menu");
  navMenu.classList.toggle("nav_open");
});

//like

function getLike() {
  const likes = document.querySelectorAll(".card__like"),
  popup = document.querySelector(".popup");

function closePopup() {
  popup.classList.remove("popup_open");
}

likes.forEach((el) => {
  el.addEventListener("click", () => {
    if (!el.classList.contains("card__like_active")) {
      popup.classList.add("popup_open");
    }
    el.classList.toggle("card__like_active");
    setTimeout(closePopup, 1000);
  });
});
};

getLike();

//показать еще
const templateFragment = document.querySelector("#card-template").content,
  template = templateFragment.querySelector(".card"),
  fragment = document.createDocumentFragment(),
  btnShowMore = document.querySelector(".main__btn-show-more"),
  cardsBox = document.querySelector(".main__cards");

btnShowMore.addEventListener("click", () => {
  for (let i = 0; i <= 20; i++) {
    const element = template.cloneNode(true),
      elementImg = element.querySelector(".card__img"),
      price = element.querySelector(".card__price");

    let numImg = Math.floor(Math.random() * (4 - 1) + 1);
    let numPtice =Math.floor(Math.random() * (5 - 1) + 1);

    elementImg.attributes[1].textContent = `img/cat${numImg}.jpg`;
    price.textContent = `${numPtice}0 000 руб.`;
    element.setAttribute("data-price", `${numPtice}0000`);

    fragment.appendChild(element);
  }
  cardsBox.appendChild(fragment);

  btnUp.classList.remove("main__btn-up_hide");

  getLike();
});

//сортировка
const btnPrice = document.querySelector('#sorting-btn-price'),
  btnAge = document.querySelector('#sorting-btn-age');

btnPrice.addEventListener('click', () => {
  btnPrice.classList.toggle('sorting__btn_up');
  sort(btnPrice, "data-price");
});
btnAge.addEventListener('click', () => {
  btnAge.classList.toggle('sorting__btn_up');
  sort(btnAge, "data-age");
});

function sort(btn, dataAttr) {
  for(let i = 0; i < cardsBox.children.length; i++){
    for(let j = i; j < cardsBox.children.length; j++){
      if(btn.classList.contains("sorting__btn_up")) {
        if(+cardsBox.children[i].getAttribute(dataAttr) < +cardsBox.children[j].getAttribute(dataAttr)) {
          replacedNode = cardsBox.replaceChild(cardsBox.children[j], cardsBox.children[i])
          insertAfter(replacedNode, cardsBox.children[i]);
        }
      } else {
        if(+cardsBox.children[i].getAttribute(dataAttr) > +cardsBox.children[j].getAttribute(dataAttr)) {
          replacedNode = cardsBox.replaceChild(cardsBox.children[j], cardsBox.children[i])
          insertAfter(replacedNode, cardsBox.children[i]);
        }
      }
    }
  }
}
function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

//btn-up
const cards = document.querySelectorAll(".card"),
  btnUp = document.querySelector(".main__btn-up");

window.addEventListener('scroll', function() {
  if(pageYOffset >= 700) {
    btnUp.classList.remove("main__btn-up_hide")
  } else {
    btnUp.classList.add("main__btn-up_hide")
  }
});

//email
const regEmail = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
const userEmail = document.querySelector('#user-email'),
  form = document.querySelector('#form');
  let resEmail = "";

userEmail.addEventListener("input", () => {
  resEmail = verification(userEmail, regEmail);
});

function regexValidite(input, regex) {
  return regex.test(input);
}

function verification(input, regex) {
  const errorMes = document.querySelector('.form__field-error-mess');
  if(input.value.length <= 5){
    errorMes.textContent = "Заполните поле.";
    userEmail.classList.add('form__field-input_invalid');
  } else if (!regexValidite(input.value, regex)) {
    errorMes.textContent = "Проверьте поле на правильность заполения.";
  } else {
    errorMes.textContent = "";
    userEmail.classList.remove('form__field-input_invalid');
    return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if(resEmail) {
    alert("Подписка оформлена");
    userEmail.value = "";
  } else {
    alert("Проверьте правильность заполения.");
  }
});
