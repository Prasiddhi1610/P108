Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("output").innerHTML = '<img id="selfie" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rZ_OQIKxl/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

prediction = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The gesture is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('selfie');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Great") {
            document.getElementById("result_gesture_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Bad") {
            document.getElementById("result_gesture_emoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "Victory") {
            document.getElementById("result_gesture_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Nice") {
            document.getElementById("result_gesture_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Cool") {
            document.getElementById("result_gesture_emoji").innerHTML = "&#129304;";
        }
        if(results[0].label == "Call") {
            document.getElementById("result_gesture_emoji").innerHTML = "&#129305;";
        }
    }
}