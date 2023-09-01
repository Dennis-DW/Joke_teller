const button = document.getElementsByClassName('button')[0];
const audioElement = document.getElementById('audio');



// voices Javascript sdk
const VoiceRSS = { speech(e) { this._validate(e), this._request(e) }, _validate(e) { if (!e) throw "The settings are undefined"; if (!e.key) throw "The API key is undefined"; if (!e.src) throw "The text is undefined"; if (!e.hl) throw "The language is undefined"; if (e.c && "auto" != e.c.toLowerCase()) { let a = !1; switch (e.c.toLowerCase()) { case "mp3": a = (new Audio).canPlayType("audio/mpeg").replace("no", ""); break; case "wav": a = (new Audio).canPlayType("audio/wav").replace("no", ""); break; case "aac": a = (new Audio).canPlayType("audio/aac").replace("no", ""); break; case "ogg": a = (new Audio).canPlayType("audio/ogg").replace("no", ""); break; case "caf": a = (new Audio).canPlayType("audio/x-caf").replace("no", "") }if (!a) throw `The browser does not support the audio codec ${e.c}` } }, _request(e) { const a = this._buildRequest(e), t = this._getXHR(); t.onreadystatechange = function () { if (4 == t.readyState && 200 == t.status) { if (0 == t.responseText.indexOf("ERROR")) throw t.responseText; let e = t.responseText; audioElement.src = e, audioElement.onloadedmetadata = (() => { audioElement.play() }) } }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a) }, _buildRequest(e) { const a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec(); return `key=${e.key || ""}&src=${e.src || ""}&hl=${e.hl || ""}&r=${e.r || ""}&c=${a || ""}&f=${e.f || ""}&ssml=${e.ssml || ""}&b64=true` }, _detectCodec() { const e = new Audio; return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : "" }, _getXHR() { try { return new XMLHttpRequest } catch (e) { } try { return new ActiveXObject("Msxml3.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { } throw "The browser does not support HTTP request" } };
// Function to enable or disable the button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Function to pass a joke to the VoiceRSS API for text-to-speech conversion
function tellThe(joke) {
    VoiceRSS.speech(
        {
            key: 'edd15aa1e1204c6fab8a814ac813f9ab',
            src: joke,
            hl: 'en-us',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        }
    );
}

// Function to fetch a joke from the joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=political,racist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        
        // Pass the joke to the text-to-speech function
        tellThe(joke);
        
        // Disable the button after clicking
        toggleButton();
    } catch (errors) {
        // Handle errors
    }
}

// Add a click event listener to the button to trigger joke fetching
button.addEventListener('click', getJokes);

// Add an event listener to the audio element to re-enable the button after audio playback ends
audioElement.addEventListener('ended', toggleButton);
