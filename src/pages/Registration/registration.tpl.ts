export default `
  <div class="entryform__wrapper">
    <div class="entryform__item">
      <h1>Регистрация</h1>
      <form action="">
        <label for="mail">Почта</label>
        <input type="email" id="email" name="email">
        <label for="login">Логин</label>
        <input type="text" id="login" name="login">
        <label for="first_name">Имя</label>
        <input type="text" id="first_name" name="first_name">
        <label for="second_name">Фамилия</label>
        <input type="text" id="second_name" name="second_name">
        <label for="phone">Телефон</label>
        <input type="tel" id="phone" name="phone">
        <label for="password">Пароль</label>
        <input type="password" id="password" name="password">
        <label for="password2">Пароль (ещё раз)</label>
        <input type="password" id="password2" name="password2">
      </form>

      <button>Авторизоваться</button>
      <p class="color-blue">{{{ LogIn }}}</p>

      <p class="color-blue">{{{ GoBack }}}</p>
    </div>
  </div>
`
