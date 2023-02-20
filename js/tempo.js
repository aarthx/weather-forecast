export default class Tempo {
  constructor(latitude, longitude, timezone, interfacePrincipal, local) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.timezone = timezone;
    this.interfacePrincipal = document.querySelector(interfacePrincipal);
    this.local = local;
  }

  addEventoVoltar(btnElement) {
    btnElement.addEventListener("click", () => {
      location.reload();
    });
  }

  converteWeatherCode(code) {
    switch (code) {
      case 0:
        return "Céu limpo" + "<img src='./css/img/[0,1].png'/>";
      case 1:
        return "Tempo limpo" + "<img src='./css/img/[0,1].png'/>";
      case 2:
        return "Tempo Parcialmente nublado" + "<img src='./css/img/[2].png'/>";
      case 3:
        return "Tempo encoberto" + "<img src='./css/img/[3,45].png'/>";
      case 45:
        return "Nevoeiro" + "<img src='./css/img/[3,45].png'/>";
      case 48:
        return "Nevoeiro com geada" + "<img src='./css/img/[48,71,73].png'/>";
      case 51:
        return "Garoa leve" + "<img src='./css/img/[51,53,55,56,57].png'/>";
      case 53:
        return "Garoa moderada" + "<img src='./css/img/[51,53,55,56,57].png'/>";
      case 55:
        return "Garoa densa" + "<img src='./css/img/[51,53,55,56,57].png'/>";
      case 56:
        return (
          "Garoa congelante leve" +
          "<img src='./css/img/[51,53,55,56,57].png'/>"
        );
      case 57:
        return (
          "Garoa congelante densa" +
          "<img src='./css/img/[51,53,55,56,57].png'/>"
        );
      case 61:
        return (
          "Chuva leve" + "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 63:
        return (
          "Chuva moderada" +
          "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 65:
        return (
          "Chuva forte" + "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 66:
        return (
          "Chuva congelante leve" +
          "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 67:
        return (
          "Chuva congelante forte" +
          "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 71:
        return "Neve leve" + "<img src='./css/img/[48,71,73].png'/>";
      case 73:
        return "Neve moderada" + "<img src='./css/img/[48,71,73].png'/>";
      case 75:
        return "Neve forte" + "<img src='./css/img/[75,85,86].png'/>";
      case 77:
        return "Grãos de neve" + "<img src='./css/img/[77].png'/>";
      case 80:
        return (
          "Pancadas de chuva leves" +
          "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 81:
        return (
          "Pancadas de chuva moderadas" +
          "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 82:
        return (
          "Pancadas de chuva violentas" +
          "<img src='./css/img/[61,63,65,66,67,80,81,82].png'/>"
        );
      case 85:
        return (
          "Aguaceiro de neve leve" + "<img src='./css/img/[75,85,86].png'/>"
        );
      case 86:
        return (
          "Aguaceiro de neve pesado" + "<img src='./css/img/[75,85,86].png'/>"
        );
      case 95:
        return (
          "Tempestade de trovão leve ou moderada" +
          "<img src='./css/img/[95,96,99].png'/>"
        );
      case 96:
        return (
          "Tempestade de trovão com granizo leve" +
          "<img src='./css/img/[95,96,99].png'/>"
        );
      case 99:
        return (
          "Tempestade de trovão com granizo forte" +
          "<img src='./css/img/[95,96,99].png'/>"
        );
    }
  }

  criaPrevisao(max, min, weathercode) {
    const localCompleto = `<h1> <img src="https://hatscripts.github.io/circle-flags/flags/${this.local.countryCode.toLowerCase()}.svg" width="32">${
      this.local.name
    } - ${this.local.admin1 ? this.local.admin1 : this.local.admin2} - ${
      this.local.country
    } (${this.local.countryCode})</h1>`;
    const tempMax = `<p class="previsao">Temperatura máxima: ${max} °C</p>`;
    const tempMin = `<p class="previsao">Temperatura mínima: ${min} °C</p>`;
    const code = `<p class="previsao">Situação: ${this.converteWeatherCode(
      weathercode
    )}</p>`;
    let botaoVoltar = '<button class="btn-voltar">Voltar</button>';
    this.interfacePrincipal.innerHTML =
      "<h1>Previsão de hoje para:" +
      localCompleto +
      tempMax +
      tempMin +
      code +
      botaoVoltar;
    let btnElement = document.querySelector(".btn-voltar");
    this.addEventoVoltar(btnElement);
  }

  buscaTempo() {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${this.timezone}`
    )
      .then((response) => response.json())
      .then((previsao) => {
        console.log(previsao);
        return {
          max: previsao.daily.temperature_2m_max[0],
          min: previsao.daily.temperature_2m_min[0],
          weathercode: previsao.daily.weathercode[0],
        };
      })
      .then((previsao) => {
        return this.criaPrevisao(
          previsao.max,
          previsao.min,
          previsao.weathercode
        );
      });
  }

  init() {
    this.buscaTempo();
    return this;
  }
}
