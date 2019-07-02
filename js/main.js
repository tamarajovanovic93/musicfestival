'use strict';

/* Function which manipulates with data */
const dataController = (function () {
    const data = {
        bands: [],
        programs: [],
        festivals: [],
        startDate: null,
        endDate: null
    };

    function Festival(festivalName, country, city, startDate, endDate) {
        this.festivalName = festivalName;
        this.country = country;
        this.city = city;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    function addFestival(festivalName, country, city, startDate, endDate) {
        var festival = new Festival(festivalName, country, city, startDate, endDate);
        data.festivals.push(festival);
        swal("New festival is created!", "\n" + "Festival name is: " + festival.festivalName + "\n" + "\n" +
            "It will be held in " + festival.city + ", " + festival.country + ".", "success");
        return festival;
    }

    /* Object constructor */
    function Band(bandName, musicGenre, performanceDuration) {
        this.bandName = bandName;
        this.musicGenre = musicGenre;
        this.performanceDuration = performanceDuration;
    }

    /* Object constructor */
    function addBand(bandName, musicGenre, performanceDuration) {
        var band = new Band(bandName, musicGenre, performanceDuration);
        data.bands.push(band);
        swal("New Band is added!", "Band Name is: " + band.bandName + ".\n Music genre is: " +
            band.musicGenre + ".\n Performance duration is: " + band.performanceDuration + ".", "success");
        return band;
    }

    function Program(day, band) {
        this.day = day;
        this.band = band;
    }

    function addProgram(day, band) {
        var program = new Program(day, band);
        data.programs.push(program);
        swal("", "Band is added successfully!", "success");
        return program;
    }

    function getBands() {
        return data.bands;
    }

    function getFestivals() {
        return data.festivals;
    }

    function getPrograms() {
        return data.bands;
    }

    /* Adding values in an array */
    const resultObj = {};
    resultObj.addFestival = addFestival;
    resultObj.addBand = addBand;
    resultObj.addProgram = addProgram;
    resultObj.getPrograms = getPrograms;
    resultObj.getFestivals = getFestivals;
    resultObj.getBands = getBands;
    return resultObj;
})();

const UIController = (function () {
    const DOMStrings = {
        inputFName: "festivalName",
        inputCountry: "country",
        inputCity: "city",
        inputStartDate: "startDate",
        inputEndDate: "endDate",
        buttonAddFestival: "btnFestival",
        formElement: "form",
        inputBName: "bandName",
        inputMGenre: "musicGenre",
        inputPDuration: "performanceDuration",
        buttonAddBand: "btnBand",
        inputSelectDay: "selectFestivalDay",
        inputSelectBand: "bands",
        buttonAddProgram: "btnProgram",
        buttonAddBandToFestival: "btnProgram",
        viewFestival: "view-festival",
        preview: "preview"
    };

    function handleFestivalDates() {
        document.getElementById(DOMStrings.inputStartDate).addEventListener("change", (event) => {
            const startDateValue = event.target.value;
            const endDateValue = document.getElementById(DOMStrings.inputEndDate);
            const maxEndDateValue = moment(startDateValue, 'YYYY-MM-DD').add(2, 'days').format('YYYY-MM-DD');
            endDateValue.disabled = false;
            endDateValue.setAttribute('min', startDateValue);
            endDateValue.setAttribute('max', maxEndDateValue);
        })
    };

    function collectInput() {
        /* Festival */
        const fNameElement = document.getElementById(DOMStrings.inputFName);
        const countryElement = document.getElementById(DOMStrings.inputCountry);
        const cityElement = document.getElementById(DOMStrings.inputCity);
        const startDateElement = document.getElementById(DOMStrings.inputStartDate);
        const endDateElement = document.getElementById(DOMStrings.inputEndDate);
        /* Band */
        const bNameElement = document.getElementById(DOMStrings.inputBName);
        const mGenreElement = document.getElementById(DOMStrings.inputMGenre);
        const mGenreOption = mGenreElement.options[mGenreElement.selectedIndex].text;
        const pDurationElement = document.getElementById(DOMStrings.inputPDuration);
        /* Program */
        const desiredDayElement = document.getElementById(DOMStrings.inputSelectDay);
        const desiredDayOption = desiredDayElement.options[desiredDayElement.selectedIndex].text;
        const selectBandElement = document.getElementById(DOMStrings.inputSelectBand);
        const selectBandOption = selectBandElement.options[selectBandElement.selectedIndex].text;

        const result = {
            fName: fNameElement.value,
            country: countryElement.value,
            city: cityElement.value,
            startDate: startDateElement.value,
            endDate: endDateElement.value,
            bName: bNameElement.value,
            mGenre: mGenreOption,
            pDuration: pDurationElement.value,
            desiredDay: desiredDayOption,
            selectedBand: selectBandOption.value,
        };
        return result;
    }

    function addBandToList(band) {
        const newListElement = document.createElement("option");
        document.getElementById("bands").appendChild(newListElement);
        newListElement.textContent = band.bandName;
    };

    function clearFormInputs() {
        document.querySelector(DOMStrings.formElement).reset();
    }

    function showProgramSection() {
        document.getElementById("programSection").classList.add("visible");
    }

    function validateBandData(input) {
        var errorMsg = '';
        if (!input.bName) {
            errorMsg = 'Please enter band name';
        } else if (!input.mGenre || input.mGenre == "Select genre") {
            errorMsg = 'Please enter genre';
        } else if (!input.pDuration) {
            errorMsg = 'Please enter performance duration';
        } else {
            errorMsg = 'Unknown error';
        }

        swal("", errorMsg, "warning");
    }

    function validateAddBandToFestival(input) {
        // var errorMessage = '';
        // if (!input.desiredDay || input.desiredDay == "Please select desired day" || input.desiredDay == "none") {
        //     errorMessage = 'Please select day!';
        // } else if (!input.selectedBand || input.selectedBand == "Select band" || input.selectedBand == "none") {
        //     errorMessage = 'Please select band! ';
        // }
        // swal("", errorMessage, "warning");
    }

    function validateFestivalData(input) {
        var errorMessage = '';
        if (!input.fName) {
            errorMessage = 'Please enter festival name!';
        } else if (!input.country) {
            errorMessage = 'Please enter country name!';
        } else if (!input.city) {
            errorMessage = 'Please enter city!';
        } else {
            errorMessage = 'Unknown error';
        }

        swal("", errorMessage, "warning");
    }

    // In order not to change the object itself, but rather to get its copy
    function getDOMStrings() {
        return DOMStrings;
    }

    return {
        getInput: collectInput, // input fields value
        addBandToList: addBandToList,
        getDOMStrings: getDOMStrings, // paths
        clearFormInputs: clearFormInputs,
        validateBandData: validateBandData,
        validateAddBandToFestival: validateAddBandToFestival,
        validateFestivalData: validateFestivalData,
        showProgramSection: showProgramSection,
        handleFestivalDates: handleFestivalDates
    };
})();

const mainController = (function (dataCtrl, UICtrl) {
    function setupEventListeners() {
        const DOM = UICtrl.getDOMStrings();
        document.getElementById(DOM.buttonAddFestival).addEventListener("click", function () {
            console.log('CLICKED ON BUTTON TO ADD A FESTIVAL AND CALLING ctrlAddFestival() FUNCTION');
            ctrlAddFestival();
        });
        document.getElementById(DOM.buttonAddBand).addEventListener("click", function () {
            console.log('CLICKED ON BUTTON TO ADD A NEW BAND AND CALLING addBand() FUNCTION');
            ctrlAddBand();
        });

        document.getElementById(DOM.buttonAddProgram).addEventListener("click", function () {
            console.log('CLICKED ON BUTTON TO ADD A NEW PROGRAM AND CALLING addProgram() FUNCTION');
            ctrlAddProgram();
        });

        document.getElementById(DOM.viewFestival).addEventListener("click", function () {
            const festivalDays = {};

            dataCtrl.getPrograms.forEach(({
                day,
                band
            }) => {
                if (!festivalDays[day]) {
                    festivalDays[day] = [];
                    festivalDays[day].push(band);
                } else {
                    festivalDays[day].push(band);
                }
            })

            dataCtrl.getFestivals.forEach(festival => {
                const preview = document.getElementById(DOM.preview);
                preview.innerHTML = "";
                const h2 = document.createElement("h2");
                h2.innerText = `Welcome to ${festival.festivalName}!`;
                preview.appendChild(h2);
                const h6 = document.createElement("h6");
                h6.innerText = `From ${festival.startDate} to ${festival.endDate} in ${festival.city}, ${festival.country}`;
                preview.appendChild(h6);
                Object.entries(festivalDays).forEach(([day, bands], index) => {
                    const article = document.createElement("article");
                    const dayHeading = document.createElement("h5");
                    dayHeading.innerText = `Day ${index + 1} - ${day}:`;
                    article.appendChild(dayHeading);
                    const bandList = document.createElement("ul");
                    bands.forEach(band => {
                        const bandLi = document.createElement("li");
                        bandLi.innerText = `Band: ${band.bandName}, genre:  ${band.musicGenre}, duration: ${band.performanceDuration}`;
                        bandList.appendChild(bandLi);
                    })
                    article.appendChild(bandList);
                    preview.appendChild(article);
                });
            })
        });

        UICtrl.handleFestivalDates();
    }

    function ctrlAddBand() {
        // Get form data (UI)
        const input = UICtrl.getInput();

        // Validate form
        if (!input.bName || input.mGenre == "none" || input.mGenre == "Select genre" || !input.pDuration) {
            return UICtrl.validateBandData(input);
        }

        // Add band to list
        const band = dataCtrl.addBand(input.bName, input.mGenre, input.pDuration);

        //3. Clear form inputs
        UICtrl.clearFormInputs();

        //4. Add band to a list
        UICtrl.addBandToList(band);
    };

    function ctrlAddProgram() {
        const input = UICtrl.getInput();
        // if (!input.desiredDay || !input.selectedBand || input.selectedBand == "Select band" || input.selectedBand == "none" ||
        //     input.desiredDay == "none" || input.desiredDay == "Please select desired day") {
        //     return UICtrl.validateAddBandToFestival(input);
        // }
        dataCtrl.addProgram(input.desiredDay, input.selectedBand);
        UICtrl.clearFormInputs();
    }

    function ctrlAddFestival() {
        const input = UICtrl.getInput();
        if (!input.fName || !input.country || !input.city) {
            return UICtrl.validateFestivalData(input);
        }

        (function () {
            let date1 = new Date(input.startDate);
            let date2 = new Date(input.endDate);
            const diffDays = (date2.getDate() - date1.getDate());
            console.log(diffDays);
            date1 = moment(date1, 'DD-MM-YYYY').format('DD-MM-YYYY');
            date2 = moment(date2, 'DD-MM-YYYY').format('DD-MM-YYYY');
            for (let i = 0; i < diffDays; i++) {
                const option = document.createElement("option");
                option.value = moment(date1, 'DD-MM-YYYY').add(i, 'days').format('DD-MM-YYYY');
                document.getElementById("selectFestivalDay").appendChild(option);
                option.textContent = option.value;
            }
        })();
        dataCtrl.addFestival(input.fName, input.country, input.city, input.startDate, input.endDate);
        UICtrl.clearFormInputs();
        UICtrl.showProgramSection();
    }

    return {
        init: function () {
            console.log("App has started");
            setupEventListeners();
        }
    };

})(dataController, UIController);

mainController.init();