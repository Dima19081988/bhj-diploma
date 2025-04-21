
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
    Account.create(data, (err, response) => {
      if (err) {
        console.log(err);
        alert('Ошибка сети');
        return;
      }

      if(response.success) {
        const modal = App.getModal('modal-new-account');
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