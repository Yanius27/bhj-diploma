/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector('.sidebar-mini');
    const toggle = document.querySelector('.sidebar-toggle');

    toggle.addEventListener('click', ()=> {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const register = document.querySelector('.menu-item_register');
    const login = document.querySelector('.menu-item_login');
    const logaut = document.querySelector('.menu-item_logout');

      register.addEventListener('click', (event)=> {
        event.preventDefault();
        const registerModal = App.getModal('register');
        registerModal.open();
      });
      login.addEventListener('click', (event)=> {
        event.preventDefault();
        const loginModal = App.getModal('login');
        loginModal.open();
      });
      logaut.addEventListener('click', (event)=> {
        event.preventDefault();
        User.logaut(function(err, response) {
          if(response && response.success) {
            User.unsetCurrent();
            App.setState('init');
          }
          else {
            alert(err);
          }
        });
      });  
  }
}