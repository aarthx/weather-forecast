import Tempo from "./tempo.js";

export default class Busca {
  constructor(campoBusca, dataList) {
    this.campoBusca = document.querySelector(campoBusca);
    this.dataList = document.querySelector(dataList);

    this.buscaSugerido = this.buscaSugerido.bind(this);
  }

  criaTempo(e) {
    const localEscolhido = e.target;
    console.log(e.target);
    const tempo = new Tempo(
      localEscolhido.latitude,
      localEscolhido.longitude,
      localEscolhido.timezone,
      ".interface",
      localEscolhido
    );
    tempo.init();
  }

  addEventoSugeridos(item) {
    item.addEventListener("click", this.criaTempo);
  }

  criaSugeridos() {
    if (this.listaSugeridos) {
      const opcoesSugeridas = [];
      this.listaSugeridos.forEach((item) => {
        const opcao = document.createElement("p");
        opcao.latitude = item.latitude;
        opcao.longitude = item.longitude;
        opcao.timezone = item.timezone;
        opcao.countryCode = item.countryCode;
        opcao.name = item.name;
        opcao.admin1 = item.admin1;
        opcao.admin2 = item.admin2;
        opcao.country = item.country;
        opcao.innerHTML = `
        <img src="https://hatscripts.github.io/circle-flags/flags/${item.countryCode.toLowerCase()}.svg" width="32"> 
        ${item.name} - ${item.admin1 ? item.admin1 : item.admin2} - ${
          item.country
        } (${item.countryCode})`;
        opcoesSugeridas.push(opcao);
      });
      this.mostraSugerido(opcoesSugeridas);
    }
  }

  mostraSugerido(opcoes) {
    this.dataList.innerHTML = "";
    opcoes.forEach((item) => {
      this.dataList.appendChild(item);
      this.addEventoSugeridos(item);
    });
  }

  buscaSugerido() {
    console.log("oi");
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${this.campoBusca.value}`
    )
      .then((response) => response.json())
      .then((response) => response.results)
      .then((response) => {
        if (response !== undefined) {
          return response.map((local) => {
            return {
              name: local.name,
              admin1: local.admin1,
              admin2: local.admin2,
              country: local.country,
              countryCode: local.country_code,
              latitude: local.latitude,
              longitude: local.longitude,
              timezone: local.timezone,
            };
          });
        }
      })
      .then((response) => {
        if (response !== undefined) {
          this.listaSugeridos = response.slice(0, 5);
          this.criaSugeridos();
        }
      });
  }

  addEventoBusca() {
    this.campoBusca.addEventListener("keyup", this.buscaSugerido);
  }

  init() {
    this.addEventoBusca();
    return this;
  }
}
