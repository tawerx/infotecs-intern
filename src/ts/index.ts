import { users } from 'users';
import { RenderUsers, User } from 'RenderUsers';
import { Sort } from 'Sort';

// Объект, содержащий массив, который будем сортировать и отображать в таблице, изначально он принимает значение из json файла
export const sortBy: { renderArray: User[] } = {
  renderArray: users.map((value) => value),
};

interface HideLi {
  firstNameLi: NodeListOf<Element> | null;
  lastNameLi: NodeListOf<Element> | null;
  aboutLi: NodeListOf<Element> | null;
  eyeColorLi: NodeListOf<Element> | null;
}

// Объект который содержит список элементов столбца таблицы, который будем скрывать или отображать
export const hideLi: HideLi = {
  firstNameLi: null,
  lastNameLi: null,
  aboutLi: null,
  eyeColorLi: null,
};

// Ссылка на div, в котором содержится таблица и div редактирования строки таблицы
export const tableContainerLink = document.querySelector('div.tableContainer');

// Ссылки на столбцы таблицы
const firstNameColLink = document.querySelector('div.firstNameCol');
const lastNameColLink = document.querySelector('div.lastNameCol');
const aboutColLink = document.querySelector('div.aboutCol');
const eyeColorColLink = document.querySelector('div.eyeColorCol');

// Создаем кнопки скрыть/показать столбцы
const manageFirstNameColBtnLink = document.createElement('button');
const manageLastNameColBtnLink = document.createElement('button');
const manageAboutColBtnLink = document.createElement('button');
const manageEyeColorColBtnLink = document.createElement('button');

// Задаем текстовый контент кнопкам, изначально "Скрыть"
manageFirstNameColBtnLink.textContent = 'Скрыть';
manageLastNameColBtnLink.textContent = 'Скрыть';
manageAboutColBtnLink.textContent = 'Скрыть';
manageEyeColorColBtnLink.textContent = 'Скрыть';

// Обработчики событий на кнопки скрыть/показать столбцы
// Алгоритм скрытия: сохраняем список элементов столбца, который будем скрывать, чистим список от элементов, удаляем список с экрана
// Алгоритм показа: отображаем список и кнопку "скрыть", отображаем сохраненный список элементов в списке
manageFirstNameColBtnLink.addEventListener('click', () => {
  if (document.contains(firstNameListLink) && firstNameColLink) {
    const firstNameLiItems = document.querySelectorAll('ul.firstNameList li');
    hideLi.firstNameLi = firstNameLiItems;
    firstNameLiItems.forEach((value) => firstNameListLink.removeChild(value));
    firstNameColLink.removeChild(firstNameListLink);
    manageFirstNameColBtnLink.textContent = 'Показать';
  } else if (firstNameColLink) {
    firstNameColLink.appendChild(firstNameListLink);
    firstNameColLink.removeChild(manageFirstNameColBtnLink);
    firstNameColLink.appendChild(manageFirstNameColBtnLink);
    hideLi.firstNameLi &&
      hideLi.firstNameLi.forEach((value) => firstNameListLink.appendChild(value));
    manageFirstNameColBtnLink.textContent = 'Скрыть';
  }
});

manageLastNameColBtnLink.addEventListener('click', () => {
  if (document.contains(lastNameListLink) && lastNameColLink) {
    const lastNameLiItems = document.querySelectorAll('ul.lastNameList li');
    hideLi.lastNameLi = lastNameLiItems;
    lastNameLiItems.forEach((value) => lastNameListLink.removeChild(value));
    lastNameColLink.removeChild(lastNameListLink);
    manageLastNameColBtnLink.textContent = 'Показать';
  } else if (lastNameColLink) {
    lastNameColLink.appendChild(lastNameListLink);
    lastNameColLink.removeChild(manageLastNameColBtnLink);
    lastNameColLink.appendChild(manageLastNameColBtnLink);
    hideLi.lastNameLi && hideLi.lastNameLi.forEach((value) => lastNameListLink.appendChild(value));
    manageLastNameColBtnLink.textContent = 'Скрыть';
  }
});

manageAboutColBtnLink.addEventListener('click', () => {
  if (document.contains(aboutListLink) && aboutColLink) {
    const aboutLiItems = document.querySelectorAll('ul.aboutList li');
    hideLi.aboutLi = aboutLiItems;
    aboutLiItems.forEach((value) => aboutListLink.removeChild(value));
    aboutColLink.removeChild(aboutListLink);
    manageAboutColBtnLink.textContent = 'Показать';
  } else if (aboutColLink) {
    aboutColLink.appendChild(aboutListLink);
    aboutColLink.removeChild(manageAboutColBtnLink);
    aboutColLink.appendChild(manageAboutColBtnLink);
    hideLi.aboutLi && hideLi.aboutLi.forEach((value) => aboutListLink.appendChild(value));
    manageAboutColBtnLink.textContent = 'Скрыть';
  }
});

manageEyeColorColBtnLink.addEventListener('click', () => {
  if (document.contains(eyeColorListLink) && eyeColorColLink) {
    const eyeColorLiItems = document.querySelectorAll('ul.eyeColorList li');
    hideLi.eyeColorLi = eyeColorLiItems;
    eyeColorLiItems.forEach((value) => eyeColorListLink.removeChild(value));
    eyeColorColLink.removeChild(eyeColorListLink);
    manageEyeColorColBtnLink.textContent = 'Показать';
  } else if (eyeColorColLink) {
    eyeColorColLink.appendChild(eyeColorListLink);
    eyeColorColLink.removeChild(manageEyeColorColBtnLink);
    eyeColorColLink.appendChild(manageEyeColorColBtnLink);
    hideLi.eyeColorLi && hideLi.eyeColorLi.forEach((value) => eyeColorListLink.appendChild(value));
    manageEyeColorColBtnLink.textContent = 'Скрыть';
  }
});

// Создаем списки столбцов таблицы, в которых будем отображать информацию из json файла
export const firstNameListLink = document.createElement('ul');
export const lastNameListLink = document.createElement('ul');
export const aboutListLink = document.createElement('ul');
export const eyeColorListLink = document.createElement('ul');

// Устанавливаем соответсвующие классы спискам
firstNameListLink.setAttribute('class', 'firstNameList');
lastNameListLink.setAttribute('class', 'lastNameList');
aboutListLink.setAttribute('class', 'aboutList');
eyeColorListLink.setAttribute('class', 'eyeColorList');

// Отображаем информацию из json файла, отображаем сортировку по столбцам, отображаем списки на экран, отображаем кнопки скрыть/показать - это всё при выполнении условия, что json файл непустой
if (users.length > 0 && firstNameColLink && lastNameColLink && aboutColLink && eyeColorColLink) {
  RenderUsers(users);
  Sort();
  firstNameColLink.appendChild(firstNameListLink);
  lastNameColLink.appendChild(lastNameListLink);
  aboutColLink.appendChild(aboutListLink);
  eyeColorColLink.appendChild(eyeColorListLink);

  firstNameColLink.appendChild(manageFirstNameColBtnLink);
  lastNameColLink.appendChild(manageLastNameColBtnLink);
  aboutColLink.appendChild(manageAboutColBtnLink);
  eyeColorColLink.appendChild(manageEyeColorColBtnLink);
}
