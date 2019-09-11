const clock = document.querySelector(".clock");
let classDuration = moment.duration(0);

clock.innerText = "00:00:00";

function runClock() {
  setInterval(() => {
    console.log("clock is running");

    classDuration.add(1000); // Adiciona 1segundo
    const seconds = `${classDuration.seconds()}`.padStart(2, "0");
    const minutes = `${classDuration.minutes()}`.padStart(2, 0);
    const hours = `${classDuration.hours()}`.padStart(2, 0);
    //  altera valor no html
    clock.innerText = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

runClock();
