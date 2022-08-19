if ("webkitSpeechRecognition" in window) {
    let final_transcript = "";

    // Config
    let webkitSpeechRecognition            = new webkitSpeechRecognition();
    webkitSpeechRecognition.continuous     = true;
    webkitSpeechRecognition.interimResults = true;
    webkitSpeechRecognition.lang           = document.querySelector("#select_dialect").value;

    // Events
    webkitSpeechRecognition.onstart = () => {
        document.querySelector("#listening").style.display = "flex";
        console.log("Speech Recognition Start");
    };
    webkitSpeechRecognition.onend = () => {
        document.querySelector("#listening").style.display = "none";
        console.log("Speech Recognition Ended");
    };
    webkitSpeechRecognition.onerror = () => {
        document.querySelector("#listening").style.display = "none";
        console.log("Speech Recognition Error");
    };
    webkitSpeechRecognition.onresult = (event) => {
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
        webkitSpeechRecognition.start();
        document.querySelector("#start").disabled = true;
        document.querySelector("#stop").disabled = false;
    };
    document.querySelector("#stop").onclick = () => {
        webkitSpeechRecognition.stop();
        document.querySelector("#start").disabled = false;
        document.querySelector("#stop").disabled = true;
    };
    document.querySelector("#clear").onclick = () => {
        document.querySelector("#final").innerHTML = "";
    }

} else {
    console.log("Speech Recognition Not Available");
}