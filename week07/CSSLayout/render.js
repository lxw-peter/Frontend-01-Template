const images = require('images');

function render(viewport, element) {
    if (element.style) {
        console.log(element.style);
        let img = images(element.style.width, element.style.height);

        if (element.style['background-color']) {
            let color = element.style['background-color'] || 'rgb(255,255,255)';
            // let matchedArray = color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            let matchedArray = color.replace('rgb(', '').replace(')', '').split(',');
            let red = +matchedArray[0];
            let green = +matchedArray[1];
            let blue = +matchedArray[2];
            img.fill(red, green, blue, 1);
            viewport.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }

    if (element.children) {
        for (let child of element.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;