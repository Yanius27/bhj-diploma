/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('select');
    const data = this.getData();
    Account.list(data, (response, err) => {
      if(response && response.success) {
        if(Object.keys(response.data).length !== 0) {
          select.innerHTML = response.data.reduce((accum, current) => {
            return accum + `<option value="${current.id}">${current.name}</option>`;
          }, 0);
        }
      }
      else {
        alert(err);
      }
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
      if(response && response.success) {
        this.element.reset();
        App.getModal(this.element.id === 'new-income-form' ? 'newIncome' : 'newExpense').close();
        App.update();
      }
      else {
        alert(err);
      }
    });
  }
}