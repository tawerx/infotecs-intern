import { users } from 'users';
import { hideLi } from 'index';
import { pageCount } from 'PageCount';
import {
  firstNameListLink,
  lastNameListLink,
  aboutListLink,
  eyeColorListLink,
  tableContainerLink,
} from './index.js';
import {
  editFirtNameInputLink,
  editLastNameInputLink,
  editAboutInputLink,
  editEyeColorInputLink,
  editListItemLink,
  editItem,
} from './EditNote.js';

export interface Link {
  id: string | null;
  firstNameLiItem: HTMLLIElement | null;
  lastNameLiItem: HTMLLIElement | null;
  aboutLiItem: HTMLLIElement | null;
  eyeColorCircleItem: HTMLSpanElement | null;
}

// Функция обработчика события нажатия на элементы списков таблицы
const showEditListItem = (link: Link) => {
  // Находим выбранного пользователя
  const user = users.find(({ id }) => id == link.id);
  // Передаем данные пользователя в форму редактирования
  if (document.contains(editListItemLink) && user) {
    editFirtNameInputLink.value = user.name.firstName;
    editLastNameInputLink.value = user.name.lastName;
    editAboutInputLink.value = user.about;
    editEyeColorInputLink.value = user.eyeColor;
    editItem.id = link.id;
    editItem.aboutLiItem = link.aboutLiItem;
    editItem.firstNameLiItem = link.firstNameLiItem;
    editItem.lastNameLiItem = link.lastNameLiItem;
    editItem.eyeColorCircleItem = link.eyeColorCircleItem;
  } else if (tableContainerLink && user) {
    tableContainerLink.appendChild(editListItemLink);
    editFirtNameInputLink.value = user.name.firstName;
    editLastNameInputLink.value = user.name.lastName;
    editAboutInputLink.value = user.about;
    editEyeColorInputLink.value = user.eyeColor;
    editItem.id = link.id;
    editItem.aboutLiItem = link.aboutLiItem;
    editItem.firstNameLiItem = link.firstNameLiItem;
    editItem.lastNameLiItem = link.lastNameLiItem;
    editItem.eyeColorCircleItem = link.eyeColorCircleItem;
  }
};

export interface User {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: string;
  about: string;
  eyeColor: string;
}

// Функция отображения принимает массив данных, соответствующий структуре из json файла
export const RenderUsers = (usersArray: User[]) => {
  usersArray.map(({ id, name, about, eyeColor }, i) => {
    // На первой итерации очищаем всю таблицу
    if (i == 0) {
      // Выбираем все элементы списков таблицы
      const firstNameLiItems = firstNameListLink.querySelectorAll('li');
      const lastNameLiItems = lastNameListLink.querySelectorAll('li');
      const aboutLiItems = aboutListLink.querySelectorAll('li');
      const eyeColorLiItems = eyeColorListLink.querySelectorAll('li');

      // Удаляем элементы списка из списков таблицы
      firstNameLiItems.forEach((value) => firstNameListLink.removeChild(value));
      lastNameLiItems.forEach((value) => lastNameListLink.removeChild(value));
      aboutLiItems.forEach((value) => aboutListLink.removeChild(value));
      eyeColorLiItems.forEach((value) => eyeColorListLink.removeChild(value));

      // Элементы который мы скрывали также очищаем, чтобы не отобразить ошибочно данные двух страниц
      hideLi.aboutLi = null;
      hideLi.eyeColorLi = null;
      hideLi.firstNameLi = null;
      hideLi.lastNameLi = null;
    }
    // Условие, которое выбирает 10 записей для определенной страницы
    if (pageCount * 10 + 10 > i && i >= pageCount * 10) {
      // Создаем элементы списков таблицы
      const firstNameLiItem = document.createElement('li');
      const lastNameLiItem = document.createElement('li');
      const aboutLiItem = document.createElement('li');
      const eyeColorLiItem = document.createElement('li');
      const eyeColorCircleItem = document.createElement('span');

      // Отображаем соответствующую информацию в этих элементах
      firstNameLiItem.textContent = name.firstName;
      lastNameLiItem.textContent = name.lastName;
      aboutLiItem.textContent = about;
      eyeColorLiItem.appendChild(eyeColorCircleItem);
      // В случае со столбцом "Цвет глаз" мы устанавливаем цвет соответствующий цвету глаз
      eyeColorCircleItem.style.backgroundColor = eyeColor;

      // Отображаем элементы списка в списках
      firstNameListLink.appendChild(firstNameLiItem);
      lastNameListLink.appendChild(lastNameLiItem);
      aboutListLink.appendChild(aboutLiItem);
      eyeColorListLink.appendChild(eyeColorLiItem);

      // Объект, который содержит id записи, а также ссылки на элементы списков выбранной строки
      const link = {
        id,
        firstNameLiItem,
        lastNameLiItem,
        aboutLiItem,
        eyeColorCircleItem,
      };

      // Обработчики событий, при нажатии на элементы списков открывает div редактирования записи
      firstNameLiItem.addEventListener('click', () => showEditListItem(link));
      lastNameLiItem.addEventListener('click', () => showEditListItem(link));
      aboutLiItem.addEventListener('click', () => showEditListItem(link));
      eyeColorLiItem.addEventListener('click', () => showEditListItem(link));
    }
  });
};
