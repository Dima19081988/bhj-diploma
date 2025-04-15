/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {  
    User.login(data, (response) => {
      if(response.success) {
        this.element.reset();

        App.setState('user-logged');

        const modal = App.getModal('modal-login');
        modal.close();
      } else {
        console.error(response.error);
        alert(response.error || 'Произошла ошибка авторизации');
      };
    });
  };
}