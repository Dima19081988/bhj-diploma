/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if(!element) {
      throw new Error ('Элемент не может быть пустым');
    }
    element = this.element;
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){ 
    const user = User.current();

    if (user) {
      const userNameElement = this.element.querySelector('.user-name');
      if (userNameElement) {
        userNameElement.textContent = user.name;
      };
    };
  };
}
