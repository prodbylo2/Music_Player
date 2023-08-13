console.log("Welcome to Spotify")

// Initializing variables
let songIndex = 0;
let audioElement = new Audio('songs/0.wav');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Can't Lose", filePath: "songs/0.wav", coverPath: "prologue ai 1.0.png"},
    {songName: "Still I Rise", filePath: "songs/1.wav", coverPath: "prologue ai 1.0.png"},
    {songName: "Chicag-o", filePath: "songs/2", coverPath: "prologue ai 1.0.png"},
    {songName: "Lamp", filePath: "songs/3.wav", coverPath: "prologue ai 1.0.png"},
    {songName: "Why so Serious?", filePath: "songs/4.wav", coverPath: "prologue ai 1.0.png"},
    {songName: "This ain't a Lullaby", filePath: "songs/5.wav", coverPath: "prologue ai 1.0.png"},
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play()

// Playing and Pausing the song
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');

    // Update the time bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log(progress);
    myProgressBar.value = progress;

})

// Updating time bar when clicked
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/ 100);

})

const makeAllPlays = ()=>{

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
        })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{

        if(audioElement.paused || audioElement.currentTime <= 0){
            // To get which song is being clicked to play
            console.log(e.target);
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            masterSongName.innerText = songs[songIndex].songName;
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `songs/${songIndex}.wav`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else{
            console.log(e.target);
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            masterSongName.innerText = songs[songIndex].songName;
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            audioElement.src = `songs/${songIndex}.wav`;
            audioElement.currentTime = audioElement.currentTime;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }
    })
})

// For the next song button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.wav`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

// For the previous song button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.wav`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
