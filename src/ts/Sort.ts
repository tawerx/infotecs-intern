import { users } from 'users';
import { sortBy } from '.';
import { RenderUsers, User } from 'RenderUsers';

// Ссылки на заголовки столбцов таблицы
const firstNameColHeaderLink = document.querySelector('div.firstNameColHeader');
const lastNameColHeaderLink = document.querySelector('div.lastNameColHeader');
const aboutColHeaderLink = document.querySelector('div.aboutColHeader');
const eyeColorColHeaderLink = document.querySelector('div.eyeColorColHeader');

// Создаем select
export const eyeColorSelect = document.createElement('select');
const firstNameSelect = document.createElement('select');
const lastNameSelect = document.createElement('select');
const aboutSelect = document.createElement('select');

export const Sort = () => {
  // Создаем option для столбцов: "Имя", "Фамилия"
  for (let i = 0; i < 2; i++) {
    const optionDefault = document.createElement('option');
    optionDefault.value = 'default';
    optionDefault.textContent = 'default';

    const optionAlphUp = document.createElement('option');
    optionAlphUp.value = 'a-z';
    optionAlphUp.textContent = 'a-z';

    const optionAlphDown = document.createElement('option');
    optionAlphDown.value = 'z-a';
    optionAlphDown.textContent = 'z-a';

    if (i == 0) {
      firstNameSelect.appendChild(optionDefault);
      firstNameSelect.appendChild(optionAlphUp);
      firstNameSelect.appendChild(optionAlphDown);
      firstNameColHeaderLink && firstNameColHeaderLink.appendChild(firstNameSelect);
    }
    if (i == 1) {
      lastNameSelect.appendChild(optionDefault);
      lastNameSelect.appendChild(optionAlphUp);
      lastNameSelect.appendChild(optionAlphDown);
      lastNameColHeaderLink && lastNameColHeaderLink.appendChild(lastNameSelect);
    }
  }

  // Создаем option для столбца "Описание"
  const optionDefault = document.createElement('option');
  optionDefault.value = 'default';
  optionDefault.textContent = 'default';

  const optionAlphUp = document.createElement('option');
  optionAlphUp.value = 'low length';
  optionAlphUp.textContent = 'low length';

  const optionAlphDown = document.createElement('option');
  optionAlphDown.value = 'high length';
  optionAlphDown.textContent = 'high lenght';

  aboutSelect.appendChild(optionDefault);
  aboutSelect.appendChild(optionAlphUp);
  aboutSelect.appendChild(optionAlphDown);
  aboutColHeaderLink && aboutColHeaderLink.appendChild(aboutSelect);

  // Создаем массив с уникальными цветами глаз
  const uniqueEyeColors: string[] = users.reduce((acc: string[], { eyeColor }) => {
    if (acc.includes(eyeColor)) {
      return acc;
    }
    return [...acc, eyeColor];
  }, []);

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
    option.style.color = 'black';
    eyeColorSelect.appendChild(option);
  });
  eyeColorColHeaderLink && eyeColorColHeaderLink.appendChild(eyeColorSelect);

  // Обработчики событий изменений select, при срабатывании происходит сортировка таблицы по определенному признаку столбца
  // Алгоритм: при выборе любого из пунктов select, остальные 3 столбца выставляют значение select "default", что означает, что сортировка происходит по текущему столбцу.
  // При выборе определенного признака сортировки просходит соотвествующий алгоритм сортировки
  firstNameSelect.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (target.value == 'default') {
      lastNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray = users.map((value) => value);
      RenderUsers(sortBy.renderArray);
    }
    if (target.value == 'a-z') {
      lastNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray.sort((a, b) => {
        if (a.name.firstName.toLowerCase() < b.name.firstName.toLowerCase()) {
          return -1;
        }
        if (a.name.firstName.toLowerCase() > b.name.firstName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      RenderUsers(sortBy.renderArray);
    }
    if (target.value == 'z-a') {
      lastNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray.sort((a, b) => {
        if (a.name.firstName.toLowerCase() > b.name.firstName.toLowerCase()) {
          return -1;
        }
        if (a.name.firstName.toLowerCase() < b.name.firstName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      RenderUsers(sortBy.renderArray);
    }
  });

  lastNameSelect.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (target.value == 'default') {
      firstNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray = users.map((value) => value);
      RenderUsers(sortBy.renderArray);
    }
    if (target.value == 'a-z') {
      firstNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray.sort((a, b) => {
        if (a.name.lastName.toLowerCase() < b.name.lastName.toLowerCase()) {
          return -1;
        }
        if (a.name.lastName.toLowerCase() > b.name.lastName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      RenderUsers(sortBy.renderArray);
    }
    if (target.value == 'z-a') {
      firstNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray.sort((a, b) => {
        if (a.name.lastName.toLowerCase() > b.name.lastName.toLowerCase()) {
          return -1;
        }
        if (a.name.lastName.toLowerCase() < b.name.lastName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      RenderUsers(sortBy.renderArray);
    }
  });

  aboutSelect.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (target.value == 'default') {
      firstNameSelect.selectedIndex = 0;
      lastNameSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray = users.map((value) => value);
      RenderUsers(sortBy.renderArray);
    }
    if (target.value == 'low length') {
      firstNameSelect.selectedIndex = 0;
      lastNameSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray.sort((a, b) => a.about.length - b.about.length);
      RenderUsers(sortBy.renderArray);
    }
    if (target.value == 'high length') {
      firstNameSelect.selectedIndex = 0;
      lastNameSelect.selectedIndex = 0;
      eyeColorSelect.selectedIndex = 0;
      sortBy.renderArray.sort((a, b) => b.about.length - a.about.length);
      RenderUsers(sortBy.renderArray);
    }
  });

  eyeColorSelect.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (target.value == 'default') {
      firstNameSelect.selectedIndex = 0;
      lastNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      sortBy.renderArray = users.map((value) => value);
      RenderUsers(sortBy.renderArray);
    } else {
      firstNameSelect.selectedIndex = 0;
      lastNameSelect.selectedIndex = 0;
      aboutSelect.selectedIndex = 0;
      sortBy.renderArray = sortBy.renderArray.reduce((acc: User[], obj) => {
        if (obj.eyeColor == target.value) {
          return [obj, ...acc];
        }
        return [...acc, obj];
      }, []);
      RenderUsers(sortBy.renderArray);
    }
  });
};
