export default function initForm() {
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

  const form = document.querySelector('form');
  const whereInput = document.getElementById('where');
  const whenInput = document.getElementById('when');
  const whereNotification = document.getElementById('where-notification');
  const whenNotification = document.getElementById('when-notification');
  const submitBtn = document.getElementById('submit-btn');

  const validateWhere = (value) => {
    const pattern = /^[a-zA-Zа-яА-Я]+-[a-zA-Zа-яА-Я]+$/;
    return pattern.test(value.trim());
  };

  const validateWhen = (value) => {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])$/;
    return pattern.test(value.trim());
  };
  const updateFormState = () => {
    const whereValue = whereInput.value;
    const whenValue = whenInput.value;
    const isWhereValid = validateWhere(whereValue);
    const isWhenValid = validateWhen(whenValue);
    whereNotification.className = '';
    whereNotification.classList.add(isWhereValid ? 'text-success' : 'text-danger');
    whereNotification.textContent = isWhereValid ? '✓' : '✗';
    whenNotification.className = '';
    whenNotification.classList.add(isWhenValid ? 'text-success' : 'text-danger');
    whenNotification.textContent = isWhenValid ? '✓' : '✗';
    submitBtn.classList.remove('btn-primary', 'bg-success', 'btn-danger');
    if (isWhereValid && isWhenValid) {
      submitBtn.classList.add('bg-success');
    } else {
      submitBtn.classList.add('btn-danger');
    }
  };
  whereInput.addEventListener('input', updateFormState);
  whenInput.addEventListener('input', updateFormState);
  updateFormState();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.body.classList.remove('bg-success');
    const requestData = JSON.stringify({
      where: whereInput.value.trim(),
      when: whenInput.value.trim(),
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/tickets', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function handleLoad() {
      if (xhr.status >= 200 && xhr.status < 300) {
        document.body.classList.add('bg-success');
      }
    };
    xhr.onerror = function handleError() {
      console.error('Request failed');
    };
    xhr.send(requestData);
  });
}
