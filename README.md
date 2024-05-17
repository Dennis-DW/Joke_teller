# Joke_teller
A web application that fetches jokes from a joke API and then uses a Text-to-Speech (TTS) service to read the jokes aloud.
 

### Code Explanation

The code is divided into three main parts:

1. The HTML code defines the user interface of the app.
2. The CSS code styles the user interface.
3. The JavaScript code implements the functionality of the app.


#### HTML

The HTML code defines the user interface of the app. It consists of a button that triggers the joke fetching process and an audio element that plays the joke.


<button class="button">Tell me a joke</button>
<audio id="audio"></audio>

#### CSS

The CSS code styles the user interface of the app. It makes the button look like a button and the audio element invisible.


#### JavaScript

The JavaScript code implements the functionality of the app. It fetches jokes from the Joke API, converts them to speech using the VoiceRSS API, and plays them using the audio element.

