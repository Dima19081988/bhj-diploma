/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element, type) {
    super(element);
    this.type = type;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list((accounts) => { 
      const select = this.element.querySelector('.accounts-select');

      const optionsHtml = accounts.reduce((html, account) => {
        return html + `<option value="${account.id}">${account.name}</option>`;
      }, '');

      select.innerHTML = optionsHtml;
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (response) => {
      if(response.success) {
        App.update();
        this.element.reset();

        const modalId = this.type === 'income' ? 'modal-new-income' : 'modal-new-expense';
        const modal = App.getModal(modalId);
        modal.close();
      } else {
        console.log(response.error);
        alert(response.error || 'ошибка транзакции');
      };
    });
  };
}