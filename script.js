
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const periodo = document.getElementById("periodo");
const fuso = document.getElementById("fuso");
const data = document.getElementById("data");
const regua = document.getElementById("regua");
const formato = document.getElementById("formato");

let formato24 = true;

// Garante dois dígitos: 7 vira "07"
function dois(n) {
  return String(n).padStart(2, "0");
}

// Atualiza as informações do relógio
function atualizar() {
  const agora = new Date();

  let horas = agora.getHours();
  const minutos = agora.getMinutes();
  const segundos = agora.getSeconds();

  // Alterna entre 12 e 24 horas
  if (!formato24) {
    periodo.hidden = false;
    periodo.textContent = horas >= 12 ? "PM" : "AM";
    horas = horas % 12 || 12;
  } else {
    periodo.hidden = true;
  }

  hh.textContent = dois(horas);
  mm.textContent = dois(minutos);
  ss.textContent = dois(segundos);

  // Data por extenso em português
  data.textContent = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(agora);

  // Descobre o fuso horário local
  const zona = Intl.DateTimeFormat().resolvedOptions().timeZone;

  fuso.textContent = zona.replaceAll("_", " ").replaceAll("/", " / ");

  // Barra de progresso do minuto
  const progresso = (segundos + agora.getMilliseconds() / 1000) / 60;
  regua.style.transform = `scaleX(${progresso})`;
}

// Atualiza no início de cada segundo
function ciclo() {
  atualizar();
  setTimeout(ciclo, 1000 - (Date.now() % 1000));
}

// Botão para alternar o formato
formato.addEventListener("click", () => {
  formato24 = !formato24;
  formato.textContent = formato24
    ? "Formato 24 h"
    : "Formato 12 h";

  atualizar();
});

// Inicia o relógio
ciclo();