let btn = document.querySelector('.mic-btn')
let content = document.querySelector('.content-btn')
let gif = document.querySelector('.gif-img')

function speak(text){
    let talk =new SpeechSynthesisUtterance(text);
    talk.rate = 1;
    talk.pitch = 1;
    talk.volume = 1;
    talk.lang = 'hi-GB';
    window.speechSynthesis.speak(talk);
};

function wish(){
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12){
        speak(`Hi Sumit Good Morning. I am JoJo`);
    }else if (hours >=12 && hours < 16){
        speak(`Hi Sumit Good Afternoon. I am JoJo`);
    }else{
        speak(`Hi Sumit Good Evening. I am JoJo`);
    }
};

window.addEventListener('load',() =>{
    wish();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition()

recognition.onresult=(event)=>{
    let current_index = event.resultIndex
    let transcript= event.results[current_index][0].transcript
    content.innerText = transcript
    console.log(event)
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener('click',()=>{
    recognition.start()
    btn.style.display = "none"
    gif.style.display = "block"
}
)

function takeCommand(message){
    btn.style.display = 'flex'
    gif.style.display = "none";
    if(message.includes('hello') || message.includes('hey')){
        speak('Hi how can i help you')
    }else if(message.includes('how are you') || message.includes("what's up") || message.includes('how r u')){
        speak('I am good')
    }else if(message.includes('who are you') || message.includes('who r u')){
        speak('I am virtual assistant created by my boss sumit')
    }else if(message.includes('open youtube') || message.includes('open tube')){
        speak('okay opening youtube')
        window.open("https://www.youtube.com")
    }else if(message.includes(`open ${message}`)){
        speak(`Sorry i don't have acess right now`)
    }
    else{
        speak(`this is what i found on ${message.replace('jojo')}`)
        window.open(`https://www.google.com/search?q=${message.replace('jojo')} `)
    }
}