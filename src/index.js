// src/index.js
export default () => {
  // Задача 1: Добавляем форму в index.html
  const container = document.querySelector('.container');
  const h2 = container.querySelector('h2');
  
  const formHTML = `
    <form>
      <div class="mb-3">
        <label for="where" class="form-label">Откуда-Куда</label>
        <input autocomplete="off" type="text" class="form-control" id="where" placeholder="Введите город">
        <p id="where-notification"></p>
      </div>
      <div class="mb-3">
        <label for="when" class="form-label">Когда</label>
        <input autocomplete="off" type="text" class="form-control" id="when" placeholder="Введите число и месяц">
        <p id="when-notification"></p>
      </div>
      <button type="submit" class="btn btn-primary" id="submit-btn">Найти билеты</button>
    </form>
  `;
  
  h2.insertAdjacentHTML('afterend', formHTML);
  
  // Получаем элементы формы
  const form = document.querySelector('form');
  const whereInput = document.getElementById('where');
  const whenInput = document.getElementById('when');
  const whereNotification = document.getElementById('where-notification');
  const whenNotification = document.getElementById('when-notification');
  const submitBtn = document.getElementById('submit-btn');
  
  // Задача 3: Функции валидации
  const validateWhere = (value) => {
    const pattern = /^[a-zA-Zа-яА-Я]+-[a-zA-Zа-яА-Я]+$/;
    return pattern.test(value.trim());
  };
  
  const validateWhen = (value) => {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])$/;
    return pattern.test(value.trim());
  };
  
  // Функция обновления состояния формы
  const updateFormState = () => {
    const whereValue = whereInput.value;
    const whenValue = whenInput.value;
    
    const isWhereValid = validateWhere(whereValue);
    const isWhenValid = validateWhen(whenValue);
    
    // Задача 3: Обновляем уведомления
    whereNotification.className = '';
    whereNotification.classList.add(isWhereValid ? 'text-success' : 'text-danger');
    whereNotification.textContent = isWhereValid ? '✓' : '✗';
    
    whenNotification.className = '';
    whenNotification.classList.add(isWhenValid ? 'text-success' : 'text-danger');
    whenNotification.textContent = isWhenValid ? '✓' : '✗';
    
    // Задача 4: Обновляем цвет кнопки
    submitBtn.classList.remove('btn-primary', 'bg-success', 'btn-danger');
    
    if (isWhereValid && isWhenValid) {
      submitBtn.classList.add('bg-success');
    } else {
      submitBtn.classList.add('btn-danger');
    }
  };
  
  // Добавляем обработчики событий на ввод текста
  whereInput.addEventListener('input', updateFormState);
  whenInput.addEventListener('input', updateFormState);
  
  // Вызываем начальное обновление состояния
  updateFormState();
  
  // Задача 2: Логика отправки запроса через XMLHttpRequest
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Убираем предыдущий класс bg-success, если он был
    document.body.classList.remove('bg-success');
    
    const requestData = JSON.stringify({
      where: whereInput.value.trim(),
      when: whenInput.value.trim()
    });
    
    // Создаем XMLHttpRequest вместо fetch
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/tickets', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        document.body.classList.add('bg-success');
      }
    };
    
    xhr.onerror = function() {
      console.error('Request failed');
    };
    
    xhr.send(requestData);
  });
};