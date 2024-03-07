// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = form.elements.delay.value;
    const radioResult = form.elements.state.value;
    console.log(radioResult);
    console.log(delay);

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radioResult === "fulfilled") {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay);
    });

    promise.then((value) => {
        iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`
        });
    })

    promise.catch((value) => {
        iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${delay}ms`
        });
    })

});