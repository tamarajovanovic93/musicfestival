'use strict';

const dataController = (function () {
    const data = {
        bands: [],
        programs: [],
        festivals: []
    };

    function Band(bandName, musicGenre, performanceDuration) {
        this.bandName = bandName;
        this.musicGenre = musicGenre;
        this.performanceDuration = performanceDuration;
    }

    function addBand(bandName, musicGenre, performanceDuration) {
        var band = new Band(bandName, musicGenre, performanceDuration);
        data.bands.push(band);
        console.log("Band Name is: " + band.bandName + ". Music genre is: " +
            band.musicGenre + ". Performance duration is: " + band.performanceDuration + ".");
        return band;
    }

    function Program(performanceDate) {
        this.performanceDate = performanceDate;
    }

    function addProgram(performanceDate) {
        var program = new Program(performanceDate);
        data.programs.push(program);
        console.log("New program is created on a day: " + program.performanceDate)
        return program;
    }

    const resultObj = {};

    resultObj.addBand = addBand;
    resultObj.addProgram = addProgram;

    return resultObj;
})();

const UIController = (function () {
    const DOMStrings = {
        inputBName: "bandName",
        inputMGenre: "musicGenre",
        inputPDuration: "performanceDuration",
        containerError: "bandError",
        buttonAddBand: "btnBand",
        inputPDate: "performanceDate",
        buttonAddProgram: "btnProgram",
        inputAddBandToProgram: "bands",
        buttonAddBandToProgram: "btnAddBandToProgram",
        inputSelectProgram: "selectProgram",
        inputAddProgrToFestival: "programToFestival",
        inputFName: "festivalName",
        inputCountry: "country",
        inputCity: "city",
        buttonAddFestival: "btnFestival",
        formElement: "form"
    };

    function collectInput() {
        /* Band */
        const bNameElement = document.getElementById(DOMStrings.inputBName);
        const mGenreElement = document.getElementById(DOMStrings.inputMGenre);
        const mGenreOption = mGenreElement.options[mGenreElement.selectedIndex].text;
        const pDurationElement = document.getElementById(DOMStrings.inputPDuration);
        /* Program */
        const pDateElement = document.getElementById(DOMStrings.inputPDate);
        const selectProgramElement = document.getElementById(DOMStrings.inputSelectProgram);
        const addBandToProgramElement = document.getElementById(DOMStrings.inputAddBandToProgram);
        /* Festival */
        const addProgrToFestivalElement = document.getElementById(DOMStrings.inputAddProgrToFestival);
        const fNameElement = document.getElementById(DOMStrings.inputFName);
        const countryElement = document.getElementById(DOMStrings.inputCountry);
        const cityElement = document.getElementById(DOMStrings.inputCity);

        const result = {
            bName: bNameElement.value,
            mGenre: mGenreOption,
            pDuration: pDurationElement.value,
            pDate: pDateElement.value,
            selectProgramElement: selectProgramElement.value,
            addBandToProgram: addBandToProgramElement.value,
            addProgramToFestival: addProgrToFestivalElement.value,
            fName: fNameElement.value,
            country: countryElement.value,
            city: cityElement.value
        };
        return result;
    }

    function addBandToList(band) {
        console.log("Band name is: " + band.bandName);
        const newListElement = document.createElement("option");
        document.getElementById("bands").appendChild(newListElement);
        newListElement.textContent = band.bandName;
    };

    function addProgramToList(program) {
        console.log("Add the following program to list " + program.performanceDate);
        const newListElement = document.createElement("option");
        document.getElementById("selectProgram").appendChild(newListElement);
        newListElement.textContent = program.performanceDate;
    };

    function clearFormInputs() {
        document.querySelector(DOMStrings.formElement).reset();
    }

    function showError(input) {
        var errorMsg = '';
        if (!input.bName) {
            errorMsg = 'Enter band name';
        } else if (!input.mGenre || input.mGenre == "Select genre") {
            errorMsg = 'Enter genre';
        } else if (!input.pDuration) {
            errorMsg = 'Enter performance duration';
        } else {
            errorMsg = 'Unknown error';
        }

        document.getElementById(DOMStrings.containerError).textContent = errorMsg;
    }

    //in order not to change the object itself, but rather to get its copy
    function getDOMStrings() {
        return DOMStrings;
    }

    return {
        getInput: collectInput, // input fields value
        addBandToList: addBandToList,
        addProgramToList: addProgramToList,
        getDOMStrings: getDOMStrings, // paths
        clearFormInputs: clearFormInputs,
        showError: showError,
    };
})();

const mainController = (function (dataCtrl, UICtrl) {
    function setupEventListeners() {
        const DOM = UICtrl.getDOMStrings();
        document.getElementById(DOM.buttonAddBand).addEventListener("click", function () {
            console.log('CLICKED ON BUTTON TO ADD A NEW BAND AND CALLING addBand FUNCTION');
            ctrlAddBand();

        });

        document.getElementById(DOM.buttonAddProgram).addEventListener("click", function () {
            console.log('CLICKED ON BUTTON TO ADD A NEW PROGRAM AND CALLING addProgram FUNCTION');
            ctrlAddProgram();
        });

        document.getElementById(DOM.buttonAddBandToProgram).addEventListener("click", function () {
            ctrlbtnAddBandToProgram();
        });
        document.getElementById(DOM.buttonAddFestival).addEventListener("click", function () {
            ctrlAddFestival();
        });
    }

    function ctrlAddBand() {
        // Get form data (UI)
        const input = UICtrl.getInput();

        // Validate form
        if (!input.bName || input.mGenre == "none" || input.mGenre == "Select genre" || !input.pDuration) {
            UICtrl.showError(input);
            return;
        }

        // Add band to list
        const band = dataCtrl.addBand(input.bName, input.mGenre, input.pDuration);

        //3. Clear form inputs
        UICtrl.clearFormInputs();

        //4. Add band to a list 
        console.log("Now it should add a band to the list");
        UICtrl.addBandToList(band);
    }

    function ctrlAddProgram() {
        const input = UICtrl.getInput();
        const date = new Date(input.pDate);

        const program = dataCtrl.addProgram(date.toDateString());

        // Add a program to Add Band to Program section
        UICtrl.addProgramToList(program);
    }

    return {
        init: function () {
            console.log("App has started");
            setupEventListeners();
        }
    };
})(dataController, UIController);

mainController.init();