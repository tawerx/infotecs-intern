import { users } from 'users';
import { sortBy } from 'index';
import { RenderUsers } from 'RenderUsers';

// Переменная, которая будет хранить ссылку на текущей элемент выбранной страницы, чтобы класс "seleсted" или ''
let currentPage: HTMLLIElement;
// Переменная, которая хранит номер текущей страницы
export let pageCount = 0;

// Ссылка на div, данный div является родительским к остальным div
const wrapperLink = document.querySelector('div.wrapper');

// Отображаем список с номерами страниц, при условии, что json файл непустой
if (wrapperLink && users.length > 0) {
  // Создаем div, в котором будет содержаться список с номерами страниц
  const pageCountLink = document.createElement('div');
  // Устанавливаем соответсвующий класс div`у
  pageCountLink.setAttribute('class', 'pageCount');
  // Создаем список, в котором будут содержаться номера страниц
  const pageCountList = document.createElement('ul');
  pageCountLink.appendChild(pageCountList);

  // Алгоритм заполнения списка номерами страниц: проходим по массиву из json файла, когда мы достигаем записи, которая кратна 10,
  // мы создаем элемент списка, присваиваем ей номер соответствующей циклу страницы. На элемент списка пишем обработчик события нажатия, который установит элементу текущей выбранной страницы
  // класс "selected", после этого отображаем json файла, в соответствии с выбранной страницей
  users.map((_, i) => {
    // Условие кратности 10
    if (i % 10 == 0) {
      // Создаем элемент списка
      const pageLiItem = document.createElement('li');

      // При первой итерации, задаем номер страницы "1", а также делаем эту страницу текущей выбранной
      if (i == 0) {
        pageLiItem.textContent = String(1);
        currentPage = pageLiItem;
        pageLiItem.setAttribute('class', 'selected');
      } else {
        // Если это не первая итерация, то присваиваем соотвествующий циклу номер страницы
        pageLiItem.textContent = String(i / 10 + 1);
      }

      // Обработчик события, при нажатии устанавливает класс "selected" на нажатый элемент страницы, при этом прошлая активная страница становится неактивной
      pageLiItem.addEventListener('click', () => {
        // Условие, что уже выбрана какая то страница
        if (currentPage != null) {
          currentPage.removeAttribute('class');
          currentPage = pageLiItem;
          currentPage.setAttribute('class', 'selected');
          pageCount = Number(pageLiItem.textContent) - 1;
        } else {
          currentPage = pageLiItem;
          currentPage.setAttribute('class', 'selected');
          pageCount = Number(pageLiItem.textContent) - 1;
        }
        // Отображаем json файл в соответсвии с выбранной страницей
        RenderUsers(sortBy.renderArray);
      });

      // Отображаем элемент списка в списке
      pageCountList.appendChild(pageLiItem);
    }
  });
  // Отображаем div с номера страниц на экране
  wrapperLink.appendChild(pageCountLink);
}
