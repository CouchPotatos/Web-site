let flag = true

let debug = 1;
let logger = function(a,b) { if ( debug == 1 ) console.log(a, b || "")};

logger("my", "log");

$('.btn').on('click', function() {
    var login = document.getElementById('login').value
    var password = document.getElementById('password').value
    $.ajax({
        type: 'POST',
        url: 'https://last-api.herokuapp.com/auth/token/login',
        data: { "password": password, "username": login},
        success: function () {
            window.location.href = "main.html";
        },
        error: function() {
            if (flag){
                $('.d-grid').prepend('<p style="border: 1px solid red; padding: 5px;">Убедитесь, что вы правильно ввели логин и пароль.<p>') 
                flag = false
            }  
        }
    })
})