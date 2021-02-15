let flag = true
$('.btn').on('click', function() {
    var login = document.getElementById('login').value
    var password = document.getElementById('password').value
    if (login === 'admin' && password === 'admin'){
            window.location.href = "main.html";
        } else {
            if (flag){
                $('.d-grid').prepend('<p style="border: 1px solid red; padding: 5px;">Убедитесь, что вы правильно ввели логин и пароль.<p>') 
                flag = false
            }
        }
})