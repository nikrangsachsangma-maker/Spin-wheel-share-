const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');
const registerForm = document.getElementById('registerForm');
let isSpinning = false;
let currentResult = '';

const prizes = [
    '10 Points',
    '20 Points',
    '30 Points',
    '50 Points',
    '100 Points',
    'Try Again'
];

spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const degrees = randomIndex * 60 + 360 * 5; // 5 full rotations + segment angle

    wheel.style.transform = `rotate(${degrees}deg)`;
    setTimeout(() => {
        currentResult = prizes[randomIndex];
        resultDiv.textContent = `You won: ${currentResult}!`;
        isSpinning = false;
        spinBtn.disabled = false;
    }, 4000);
});

function shareResult() {
    if (!currentResult) {
        alert('Spin the wheel first!');
        return;
    }
    const shareText = `I won ${currentResult} on the Spin the Wheel game! Try it now!`;
    if (navigator.share) {
        navigator.share({
            title: 'Spin the Wheel Result',
            text: shareText,
            url: window.location.href
        }).catch(err => console.error('Share failed:', err));
    } else {
        alert('Sharing not supported. Copy this: ' + shareText);
    }
}

function showRegisterForm() {
    registerForm.style.display = 'block';
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    alert(`Registered! Name: ${name}, Email: ${email}`);
    registerForm.style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

