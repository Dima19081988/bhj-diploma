const { response } = require("express");

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {    
    User.register(data, (response) => {
      if(response.success) {
        this.element.reset();

        App.setState('user-logged');

        const modal = App.getModal('#modal-register');
        modal.close();
      } else {
        console.error(response.error);
        alert(response.error || 'Произошла ошибка при регистрации');
      };
    });
  };
}