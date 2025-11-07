// Menú móvil
const toggle = document.querySelector('.nav__toggle');
const list = document.querySelector('.nav__list');
if (toggle && list) {
    toggle.addEventListener('click', () => {
        const open = list.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

// Año dinámico en el footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Cerrar menú al hacer click en un enlace (móvil)
document.querySelectorAll('.nav__link').forEach(a => {
    a.addEventListener('click', () => list.classList.remove('is-open'));
});
function desglosarDias(total) {
    let t = Math.max(0, Number(total) || 0);
    let y = 0, m = 0, s = 0, d = 0;
    while (t >= 365) { y++; t -= 365; }
    while (t >= 30) { m++; t -= 30; }
    while (t >= 7) { s++; t -= 7; }
    d = t;
    return { y, m, s, d };
}
function desglosarDiasDoWhile(total) {
    let t = Math.max(0, Number(total) || 0);
    let y = 0, m = 0, s = 0, d = 0;
    if (t >= 365) { do { y++; t -= 365; } while (t >= 365); }
    if (t >= 30) { do { m++; t -= 30; } while (t >= 30); }
    if (t >= 7) { do { s++; t -= 7; } while (t >= 7); }
    d = t;
    return { y, m, s, d };
}
function runDiasWhile() {
    const v = document.getElementById('dias-input').value;
    const r = desglosarDias(v);
    document.getElementById('dias-output').textContent =
        `${r.y} años\n${r.m} meses\n${r.s} semanas\n${r.d} días`;
}
function runDiasDoWhile() {
    const v = document.getElementById('dias-input').value;
    const r = desglosarDiasDoWhile(v);
    document.getElementById('dias-output').textContent =
        `${r.y} años\n${r.m} meses\n${r.s} semanas\n${r.d} días`;
}
// Asegurar resaltado al cargar
window.addEventListener('DOMContentLoaded', () => {
    if (window.Prism) Prism.highlightAll();

    // Re-resaltar cuando se abre un <details>
    document.querySelectorAll('details').forEach(d => {
        d.addEventListener('toggle', () => {
            if (d.open && window.Prism) {
                d.querySelectorAll('pre code').forEach(el => Prism.highlightElement(el));
            }
        });
    });
});
/* =========================
   EJERCICIO 2 – FIZZBUZZ
========================= */
function runFizzBuzz() {
    const out = [];
    for (let i = 1; i <= 100; i++) {
        if (i % 15 === 0) out.push('fizzbuzz');
        else if (i % 3 === 0) out.push('fizz');
        else if (i % 5 === 0) out.push('buzz');
        else out.push(String(i));
    }
    const el = document.getElementById('fizzbuzz-output');
    if (el) el.textContent = out.join('\n');
}

/* =========================
   EJERCICIO 3 – ANAGRAMAS
========================= */
function normAnagrama(s) {
    return s.toLowerCase().split('').sort().join('');
}
function runAnagramas() {
    const aEl = document.getElementById('ana-a');
    const bEl = document.getElementById('ana-b');
    const outEl = document.getElementById('ana-output');
    const a = aEl ? aEl.value.trim() : '';
    const b = bEl ? bEl.value.trim() : '';
    if (!a || !b) { if (outEl) outEl.textContent = 'Ingrese ambas palabras.'; return; }
    const sonIguales = a.toLowerCase() === b.toLowerCase();
    const esAnagrama = !sonIguales && normAnagrama(a) === normAnagrama(b);
    if (outEl) outEl.textContent = esAnagrama ? 'Las palabras son anagramas.' : 'Las palabras NO son anagramas.';
}

/* =========================
   EJERCICIO 4 – DECIMAL -> BINARIO
========================= */
function runDecBin() {
    const nEl = document.getElementById('decbin-n');
    const outEl = document.getElementById('decbin-out');
    let n = nEl ? parseInt(nEl.value, 10) : NaN;
    if (Number.isNaN(n) || n < 0) { if (outEl) outEl.textContent = 'Ingrese un entero >= 0'; return; }
    if (n === 0) { if (outEl) outEl.textContent = '0'; return; }
    let bits = '';
    while (n > 0) { bits = (n % 2) + bits; n = Math.floor(n / 2); }
    if (outEl) outEl.textContent = bits;
}

/* =========================
   EJERCICIO 5 – PALINDROMO
========================= */
function limpiarTextoJS(txt) {
    const mapa = { 'a': 'a', 'e': 'e', 'i': 'i', 'o': 'o', 'u': 'u' }; // simplificado para ASCII
    let out = '';
    for (var i = 0; i < txt.length; i++) {
        var c = txt[i].toLowerCase();
        // reemplazos basicos sin acentos (puedes mejorar si guardas en UTF-8)
        if ('áéíóú'.indexOf(c) !== -1) {
            if (c === 'á') c = 'a'; else if (c === 'é') c = 'e'; else if (c === 'í') c = 'i'; else if (c === 'ó') c = 'o'; else if (c === 'ú') c = 'u';
        }
        if (/[a-z0-9]/.test(c)) out += c;
    }
    return out;
}
function runPalindromo() {
    const tEl = document.getElementById('pal-text');
    const outEl = document.getElementById('pal-out');
    const t = tEl ? tEl.value : '';
    const limpio = limpiarTextoJS(t);
    const inv = limpio.split('').reverse().join('');
    const msg = (limpio && limpio === inv) ? 'El texto es un palindromo.' : 'El texto NO es un palindromo.';
    if (outEl) outEl.textContent = msg;
}

/* =========================
   EJERCICIO 6 – MCD y MCM
========================= */
function mcdJS(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b !== 0) { const t = a % b; a = b; b = t; }
    return a;
}
function mcmJS(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(Math.trunc(a / mcdJS(a, b)) * b);
}
function runMcdMcm() {
    const aEl = document.getElementById('mcd-a');
    const bEl = document.getElementById('mcd-b');
    const outEl = document.getElementById('mcd-out');
    const a = aEl ? parseInt(aEl.value, 10) : NaN;
    const b = bEl ? parseInt(bEl.value, 10) : NaN;
    if (Number.isNaN(a) || Number.isNaN(b)) { if (outEl) outEl.textContent = 'Ingrese dos enteros validos.'; return; }
    const mcd = mcdJS(a, b);
    const mcm = mcmJS(a, b);
    if (outEl) outEl.textContent = 'MCD: ' + mcd + '\nMCM: ' + mcm;
}
