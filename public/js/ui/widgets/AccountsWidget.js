/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if(!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {  
    this.element.querySelector('.create-account').addEventListener('click', () => {
      App.getModal('createAccount').open();
    })
    
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      const accountElement = event.target.closest('.account');
      if (accountElement) {
        this.onSelectAccount(accountElement);
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list({}, (error, response) => {
        if (error) {
          console.error('Ошибка получения счета: ', error);
          alert('Ошибка сети');
          return;
        }
        if (response.success) {
          this.clear();
          response.data.forEach(account => {
            this.renderItem(account);
          });
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountElements = this.element.querySelectorAll('.account');
    accountElements.forEach(account => account.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const previousActiveElement = document.querySelector('.active');
    if (previousActiveElement) {
      previousActiveElement.classList.remove('active');
    }

    element.classList.add('active');

    const accountId = element.getAttribute('data-id');

    App.showPage( 'transactions', { account_id: accountId });   

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
      <li class="account" data-id='${item.id}'>
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum}</span>
        </a>
      </li>
    `
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    const html = this.getAccountHTML(data);
    this.element.insertAdjacentHTML('beforeend', html);
  }
}
