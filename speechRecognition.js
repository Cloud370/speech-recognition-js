if ("webkitSpeechRecognition" in window) {
    let final_transcript = "";

    // Config
    let speechRecognition = new webkitSpeechRecognition();

    console.log(document.querySelector("#select_dialect").value);
    // Events
    speechRecognition.onstart = () => {
        document.querySelector("#listening").style.display = "flex";
        console.log("Speech Recognition Start");
    };
    speechRecognition.onend = () => {
        document.querySelector("#listening").style.display = "none";
        console.log("Speech Recognition Ended");
    };
    speechRecognition.onerror = () => {
        document.querySelector("#listening").style.display = "none";
        console.log("Speech Recognition Error");
    };
    speechRecognition.onresult = (event) => {
        console.log("Speech Recognition Result");
        document.querySelector("#loading").style.display = "loading";
        let interim_transcript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        document.querySelector("#final").innerHTML = final_transcript;
        document.querySelector("#interim").innerHTML = interim_transcript;
        document.querySelector("#loading").style.display = "none";
    };

    // Buttons
    document.querySelector("#start").onclick = () => {
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.lang = document.querySelector("#select_dialect").value;
        speechRecognition.start();
        document.querySelector("#start").disabled = true;
        document.querySelector("#stop").disabled = false;
    };
    document.querySelector("#stop").onclick = () => {
        speechRecognition.stop();
        document.querySelector("#start").disabled = false;
        document.querySelector("#stop").disabled = true;
    };
    document.querySelector("#clear").onclick = () => {
        document.querySelector("#final").innerHTML = "";
    }

} else {
    console.log("Speech Recognition Not Available");
}
