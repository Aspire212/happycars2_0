"use strict";

    const form = document.forms[0];
    const name = form[0];
    const email = form[1];
    const phone = form[3];
    const mess = form[4];
    const allInput = form.querySelectorAll('.allInput');
    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regPhone = /\d{9}/;

    const modal = document.querySelector('.modal');
    const modalText = document.querySelector('.modalText');


    form.onsubmit = function(e) {
        e.preventDefault();

        mess.value = setStringPhp(mess.value);

        const data = {
            [name.name]: name.value,
            [phone.name]: `+375${phone.value}`,
            [email.name]: email.value,
            [mess.name]: mess.value,
        }

        if (Object.values(data).every(val => !!val.length)) {
            /*Валидация имени*/

            successColor(name);
            /*Валидация телефона*/
            if (!validate(phone.value, regPhone)) {
                console.log(phone.value)
                console.error("Пожалуйста введите коректный номер ");
                phone.classList.remove('green');
                phone.classList.add('red');
                return;
            }
            successColor(phone);
            /*Валидация  email*/
            if (!validate(email.value, regEmail)) {
                console.error('введите коректный эмаил');
                email.classList.remove('green');
                email.classList.add('red');
                return;
            }
            successColor(email);
            successColor(mess);
            modal.classList.add('modalActive');
            let xhr = new XMLHttpRequest();
            xhr.open('post', 'send.php');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.addEventListener('load', function() {
                if (xhr.status < 400 && xhr.readyState === 4) {
                    clearForm()
                } else {
                    console.log(xhr.readyState);
                    console.log(xhr.status);
                    console.log('error');
                }
            });
            xhr.addEventListener('error', function() {
                console.log('error')
            })
        } else {
            allInput.forEach(input => {
                if (!input.value) {
                    input.classList.add('red');
                } else {
                    successColor(input);
                }
            });

            console.log('заполните все поля')
        } 
    }
    function clearForm() {
        modal.classList.remove('modalActive');
        allInput.forEach(input => {
            input.value = "";
            input.classList.remove('green');
        });
    }


    //добавление - удаление классов
    function successColor(el) {
        el.classList.contains('red') ? el.classList.remove('red') : false;
        !el.classList.contains('green') ? el.classList.add('green') : false;
    }
    //валидация полей по заготовленым паттернам
    function validate(str, reg) {
        str = str.trim();
        return reg.test(str);
    }
    //форматирование строки для PHP
    function setStringPhp(str) {
        str = [...str];
        if (str.length > 50) {
            let temp = Math.floor(str.length / 50);
            for (let i = 0; i < temp; i++) {
                let space = str.indexOf(' ', (i + 1) * 50);
                str[space] += "\n";
            }
        }
        return str.join('');
    }