document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const search = document.querySelector('input');
    const result = document.querySelector('#result');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value;
        const url = '/weather?address=' + location;
        result.textContent = 'Loading...';
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    result.innerHTML = data.error;
                    return;
                }
                result.innerHTML = data.location + ': ' + data.forecast;
            })
        })
    })
})
