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
    Account.list(data, (response) => {
      if(response && response.success) {
        response.data.forEach((e) => {
          const option = document.createElement('option');
          option.value = e.id;
          option.innerText = e.name;
          select.append(option);
        }) 
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
        console.log(this.element);
        this.element.reset();
        App.getModal(this.element.id === 'new-income-form' ? 'newIncome' : 'newExpense').close();
        App.update();
      }
    });
  }
}