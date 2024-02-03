import { users } from 'users';
import { tableContainerLink } from 'index';
import { Link } from 'RenderUsers';
import { eyeColorSelect } from 'Sort';

// Объект, который сохраняет id пользователя для редактирования, а также ссылки на элементы в списках таблицы, чтобы редактировать только текущую выбранную строку, а не отображать повторно всю таблицу
export const editItem: Link = {
  id: null,
  firstNameLiItem: null,
  lastNameLiItem: null,
  aboutLiItem: null,
  eyeColorCircleItem: null,
};

// Создаем div, в котором будет отображена форма редактиования выбранной строки
export const editListItemLink = document.createElement('div');
// Устанавливаем соответствующий класс
editListItemLink.setAttribute('class', 'editListItem');
// Создаем заголовок первого уровня, чтобы написать там "Редактирование"
const h1Item = document.createElement('h1');
h1Item.textContent = 'Редактирование';

// Создаем div`ы, которые будут отвечать за соответствующие поля редактирования записи
const editFirtNameLink = document.createElement('div');
const editLastNameLink = document.createElement('div');
const editAboutLink = document.createElement('div');
const editEyeColorLink = document.createElement('div');

// Устанавливаем соответствующие классы
editFirtNameLink.setAttribute('class', 'editFirstName');
editLastNameLink.setAttribute('class', 'editLastName');
editAboutLink.setAttribute('class', 'editAbout');
editEyeColorLink.setAttribute('class', 'editEyeColor');

// Создаем input, чтобы можно было вносить изменения в запись
export const editFirtNameInputLink = document.createElement('input');
export const editLastNameInputLink = document.createElement('input');
export const editAboutInputLink = document.createElement('textarea');
export const editEyeColorInputLink = document.createElement('input');

// Создаем span, чтобы подписать input, который мы создали выше
const editFirtNameSpanLink = document.createElement('span');
const editLastNameSpanLink = document.createElement('span');
const editAboutSpanLink = document.createElement('span');
const editEyeColorSpanLink = document.createElement('span');

// Задаем соответсвующие подписи для span элементов
editFirtNameSpanLink.textContent = 'Имя:';
editLastNameSpanLink.textContent = 'Фамилия:';
editAboutSpanLink.textContent = 'Описание:';
editEyeColorSpanLink.textContent = 'Цвет глаз:';

// Отображаем соответствующие элементы в соотвествующих блоках
editFirtNameLink.appendChild(editFirtNameSpanLink);
editFirtNameLink.appendChild(editFirtNameInputLink);

editLastNameLink.appendChild(editLastNameSpanLink);
editLastNameLink.appendChild(editLastNameInputLink);

editAboutLink.appendChild(editAboutSpanLink);
editAboutLink.appendChild(editAboutInputLink);

editEyeColorLink.appendChild(editEyeColorSpanLink);
editEyeColorLink.appendChild(editEyeColorInputLink);

// Создаем кнопки управления формой редактирования: "Сохранить", "Отменить"
const submitBtnLink = document.createElement('button');
const cancelBtnLink = document.createElement('button');
// Создаем div, в котором будут содержаться кнопки управления формой
const editButtonsLink = document.createElement('div');
// Задаем соответствующий класс div`у
editButtonsLink.setAttribute('class', 'editButtons');

// Подписываем кнопки и отображаем их
submitBtnLink.textContent = 'Сохранить';
cancelBtnLink.textContent = 'Отменить';
editButtonsLink.appendChild(submitBtnLink);
editButtonsLink.appendChild(cancelBtnLink);

// Собираем форму редактирования
editListItemLink.appendChild(h1Item);
editListItemLink.appendChild(editFirtNameLink);
editListItemLink.appendChild(editLastNameLink);
editListItemLink.appendChild(editAboutLink);
editListItemLink.appendChild(editEyeColorLink);
editListItemLink.appendChild(editButtonsLink);

// Обработчик события на кнопку "Отменить"
cancelBtnLink.addEventListener('click', () => {
  if (document.contains(editListItemLink) && tableContainerLink) {
    tableContainerLink.removeChild(editListItemLink);
  }
});

// Обработчик события на кнопку "Сохранить"
// Алгоритм сохранения: в выбранной строке изменяем данные, затем изменяем данные в json файле
submitBtnLink.addEventListener('click', () => {
  if (document.contains(editListItemLink) && tableContainerLink) {
    if (
      editItem.firstNameLiItem &&
      editItem.lastNameLiItem &&
      editItem.aboutLiItem &&
      editItem.eyeColorCircleItem
    ) {
      editItem.firstNameLiItem.textContent = editFirtNameInputLink.value;
      editItem.lastNameLiItem.textContent = editLastNameInputLink.value;
      editItem.aboutLiItem.textContent = editAboutInputLink.value;
      editItem.eyeColorCircleItem.style.backgroundColor = editEyeColorInputLink.value;
    }

    const findIndex = users.findIndex((obj) => obj.id == editItem.id);
    users[findIndex].name.firstName = editFirtNameInputLink.value;
    users[findIndex].name.lastName = editLastNameInputLink.value;
    users[findIndex].about = editAboutInputLink.value;
    users[findIndex].eyeColor = editEyeColorInputLink.value;

    // Отображаем элементы сортировки для столбца "Цвет глаз", поскольку цвет мог измениться, нужно добавить новый цвет или убрать старый цвет
    const uniqueEyeColors: string[] = users.reduce((acc: string[], { eyeColor }) => {
      if (acc.includes(eyeColor)) {
        return acc;
      }
      return [...acc, eyeColor];
    }, []);

    // Убираем старые options из select
    const eyeColorSelectOptions = eyeColorSelect.querySelectorAll('option');
    eyeColorSelectOptions.forEach((value) => eyeColorSelect.removeChild(value));

    // Создаем option с уникальными цветами глаз для столбца "Цвет глаз"
    uniqueEyeColors.map((value, i) => {
      if (i == 0) {
        const option = document.createElement('option');
        option.value = 'default';
        option.textContent = 'default';
        eyeColorSelect.appendChild(option);
      }
      const option = document.createElement('option');
      option.value = value;
      option.style.backgroundColor = value;
      option.textContent = value;
      option.style.color = 'white';
      eyeColorSelect.appendChild(option);
    });

    // Убираем форму редактирования с экрана
    tableContainerLink.removeChild(editListItemLink);
  }
});
