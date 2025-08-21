// Генератор иконок для PWA приложения Calm
// Запустите этот код в консоли браузера

function createIcon(size) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    // Создаем градиенты
    const bgGradient = ctx.createLinearGradient(0, 0, size, size);
    bgGradient.addColorStop(0, '#667eea');
    bgGradient.addColorStop(1, '#764ba2');

    const orbGradient = ctx.createLinearGradient(0, 0, size, size);
    orbGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    orbGradient.addColorStop(1, 'rgba(240, 248, 255, 0.7)');

    const breathGradient = ctx.createLinearGradient(0, 0, size, size);
    breathGradient.addColorStop(0, 'rgba(224, 247, 250, 0.8)');
    breathGradient.addColorStop(1, 'rgba(178, 235, 242, 0.6)');

    // Фон с закругленными углами
    ctx.fillStyle = bgGradient;
    ctx.beginPath();
    const radius = size * 0.23; // 120/512
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();

    // Внешний круг
    ctx.strokeStyle = orbGradient;
    ctx.lineWidth = size * 0.016; // 8/512
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.35, 0, 2 * Math.PI);
    ctx.stroke();

    // Средний круг
    ctx.lineWidth = size * 0.012; // 6/512
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.27, 0, 2 * Math.PI);
    ctx.stroke();

    // Основной орб
    ctx.fillStyle = orbGradient;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.195, 0, 2 * Math.PI);
    ctx.fill();

    // Центральный элемент
    ctx.fillStyle = breathGradient;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.117, 0, 2 * Math.PI);
    ctx.fill();

    // Точки вокруг (основные)
    ctx.fillStyle = orbGradient;
    ctx.globalAlpha = 0.6;
    const mainPoints = [
        [size/2, size * 0.305], // верх
        [size * 0.695, size/2], // право
        [size/2, size * 0.695], // низ
        [size * 0.305, size/2]  // лево
    ];
    mainPoints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, size * 0.023, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Диагональные точки
    ctx.globalAlpha = 0.4;
    const diagPoints = [
        [size * 0.598, size * 0.402], // верх-право
        [size * 0.402, size * 0.598], // низ-лево
        [size * 0.598, size * 0.598], // низ-право
        [size * 0.402, size * 0.402]  // верх-лево
    ];
    diagPoints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, size * 0.016, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Центральная точка
    ctx.fillStyle = breathGradient;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.039, 0, 2 * Math.PI);
    ctx.fill();

    return canvas;
}

function downloadIcon(size) {
    const canvas = createIcon(size);
    const link = document.createElement('a');
    link.download = `icon-${size}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function createAllIcons() {
    const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
    sizes.forEach(size => {
        setTimeout(() => downloadIcon(size), 100);
    });
}

// Создаем иконки для PWA
console.log('🎨 Calm Icon Generator готов!');
console.log('Используйте:');
console.log('- downloadIcon(192) - для иконки 192x192');
console.log('- downloadIcon(512) - для иконки 512x512');
console.log('- createAllIcons() - для всех размеров');

// Автоматически создаем основные иконки для PWA
setTimeout(() => {
    downloadIcon(192);
    downloadIcon(512);
}, 500);
