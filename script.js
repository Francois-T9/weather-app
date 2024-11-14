// globals
const APIKey = "H2A25Z92F33D97BKC63T4D2LM";
// functions expressions
const getUserInput = () => {
  const inputContainer = document.getElementById("search-bar");

  return inputContainer.value;
};

const resetUserInput = (container) => {
  container.value = "";
};

const handleClick = (() => {
  const searchButton = document.getElementById("search-btn");
  searchButton.addEventListener("click", () => {
    const userInput = getUserInput();
    getAPIResponse(APIKey, userInput);
    resetUserInput(document.getElementById("search-bar"));
  });
})();

const getAPIResponse = async (key, location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}&contentType=json`
    );
    if (!response.ok) {
      throw new Error(` ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const icon = await data.currentConditions.icon;
    console.log(data);

    //   function call
    setImageSource(addFileExtension("img/", icon, ".png"));
    setWeatherConditions(data.currentConditions.conditions);
    setTime(data.currentConditions.datetime);
    setTemperature(data.currentConditions.temp);
    setSunrise(data.currentConditions.sunrise);
    setSunset(data.currentConditions.sunset);
    displayLocation(data.resolvedAddress);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
};
const displayLocation = (city) => {
  const cityContainer = document.querySelector(".city-name h2");

  cityContainer.textContent = city;
};

const addFileExtension = (filepath, filename, extension) => {
  const newFilename = filepath + filename + extension;
  return newFilename;
};

const setImageSource = (imgSource) => {
  const imageContainer = document.querySelector(".city-name> img");
  imageContainer.src = imgSource;
};

const setWeatherConditions = (conditions) => {
  const conditionsContainer = document.querySelector(".conditions > p");
  conditionsContainer.textContent = conditions;
};

const setTemperature = (temp) => {
  const tempContainer = document.getElementById("current-temp");
  tempContainer.textContent = temp + " °C";
};
const setSunrise = (sunriseTime) => {
  const sunriseContainer = document.getElementById("sunrise");
  sunriseContainer.textContent = sunriseTime;
};
const setSunset = (sunsetTime) => {
  const sunsetContainer = document.getElementById("sunset");
  sunsetContainer.textContent = sunsetTime;
};
const setTime = (time) => {
  const timeContainer = document.getElementById("time");
  timeContainer.textContent = time;
};

// functions call
getAPIResponse(APIKey, "marseille");
