
/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (response) => {
      if(response.success) {
        const modal = App.getModal('modal-login');
        modal.close();
        App.update();
        this.element.reset();
      } else {
        console.error(response.error);
        alert(response.error || 'Не получилось создать аккаунт:');
      };
    });
  };
}