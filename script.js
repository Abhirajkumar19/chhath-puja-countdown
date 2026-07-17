// =========================
// Countdown
// =========================

const targetDate = new Date("November 15, 2026 00:00:00").getTime();

// =========================
// Fireworks Setup
// =========================

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

function createFirework() {

    for (let i = 0; i < 120; i++) {

        particles.push({

            x: canvas.width / 2,
            y: canvas.height / 2,

            dx: (Math.random() - 0.5) * 12,
            dy: (Math.random() - 0.5) * 12,

            radius: Math.random() * 3 + 2,

            alpha: 1,

            color: `hsl(${Math.random() * 360},100%,60%)`

        });

    }

}

function animateFireworks() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {

        p.x += p.dx;
        p.y += p.dy;

        p.alpha -= 0.01;

        ctx.globalAlpha = p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

function showFireworks() {

    canvas.style.display = "block";

    let interval = setInterval(createFirework, 700);

    setTimeout(() => {

        clearInterval(interval);
        canvas.style.display = "none";

    }, 10000);

}

// =========================
// Countdown Timer
// =========================

const timer = setInterval(function () {

    const now = new Date().getTime();

    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance <= 0) {

        clearInterval(timer);

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        document.getElementById("message").innerHTML =
            "🪔 Happy Chhath Puja 2026 🙏";

        // Fireworks Start
        showFireworks();

    }

}, 1000);

