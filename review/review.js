const onGetData = async () => {
    console.log('Click on get data');
    await fetch('http://localhost:3666/api/v1/products')
        .then((data) => data.json())
        .then(info => {
            console.log('Array data', info);
            const container = document.createElement('div');
            container.id = 'data-container';
            info.forEach(item => {
                const p = document.createElement('p');
                p.textContent = JSON.stringify(item);
                container.appendChild(p);
            });
            document.body.appendChild(container);
        })
        .catch(error => console.error('Error fetching data:', error));
};