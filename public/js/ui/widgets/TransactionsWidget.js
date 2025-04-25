/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if(!element) {
      throw new Error('Элемент не найден');
    };
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const buttonNewIncome = this.element.querySelector('.create-income-button');
    const buttonNewExpense = this.element.querySelector('.create-expense-button');

    buttonNewIncome.addEventListener('click', () => {
      const modal = App.getModal('newIncom');
      modal.open();
    });

    buttonNewExpense.addEventListener('click', () => {
      const modal = App.getModal('newExpense');
      modal.open();
    });
  };
}
