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
    const user = new User();
    user.register(data, (err, response)=> {
      if(response.success) {
        new App().setState('user-logged');
        const modal = new Modal(App.getModal('register').element);
        modal.close();
      }
    });
  }
}