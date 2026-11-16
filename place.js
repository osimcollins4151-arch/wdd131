const temperature = 23;
const windSpeed = 9;
const windChillElement = document.querySelector("#wind-chill");

function calculateWindChill(temperature, windSpeed) {
  return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

if (windChillElement) {
  if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)}°C`;
  } else {
    windChillElement.textContent = "N/A";
  }
}

const currentYearElement = document.querySelector("#current-year");
if (currentYearElement) {
  currentYearElement.textContent = String(new Date().getFullYear());
}

const lastModifiedElement = document.querySelector("#last-modified");
if (lastModifiedElement) {
  const lastModified = new Date(document.lastModified);
  if (!Number.isNaN(lastModified.getTime())) {
    lastModifiedElement.dateTime = lastModified.toISOString();
    lastModifiedElement.textContent = lastModified.toLocaleString("en-GB");
  }
}