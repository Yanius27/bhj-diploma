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
    const menu = document.querySelectorAll('.menu-item');

    menu.forEach((e) => {
      e.addEventListener('click', (event)=> {
        event.preventDefault();
        if(e.classList.contains('menu-item_login')) {
          const modal = new Modal(App.getModal('login').element);
          modal.open();
        }
        else if(e.classList.contains('menu-item_register')) {
          const modal = new Modal(App.getModal('register').element);
          modal.open();
        }
        else {
          const user = new User();
          user.logout(callback);
          App.setState( 'init' );
        }
      });
    });
  }
}