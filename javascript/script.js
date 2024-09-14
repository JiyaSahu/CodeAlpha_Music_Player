let index=0;
let playingSong=false;
let songName=document.querySelector("#song-name");
let singerName=document.querySelector("#singer-name");
let songImg=document.querySelector(".img-music");
let playPauseImg=document.querySelector("#playPause");
let vlmRange=document.querySelector("#vlm-range");
let songRange=document.querySelector("#song-duration");
let vlmImg=document.querySelector("#vlmImg");
let songAnim=document.querySelector("#song-anim");
let playlistImg=document.querySelector("#playlist-img");
let songsList=document.querySelector(".songsList");
let playList=document.querySelectorAll(".playList");

let track=document.createElement("audio");
let songs=[
    {
        name:"Kananiya",
        path:"../audio/kahani.mp3",
        image:"../images/kahani.jpeg",
        singer:"K Mohan"
    },
    
    {
        name:"Nadaniya",
        path:"../audio/nadaniya.mp3",
        image:"../images/nadaniya.jpg",
        singer:"Rahul Vaidya"
    },
    {
        name:"Long Time No See",
        path:"../audio/longTimeNoSee.mp3",
        image:"../images/longTimeNoSee.jpg",
        singer:"Raffey Anwar and TAIMOUR BAIG"
    },

    {
        name:"Tauba Tauba",
        path:"../audio/tauba_tauba.mp3",
        image:"images/tauba.webp",
        singer:"Karan Aujla"
    }
]

function loadTrack(index){
    track.src=songs[index].path;
    songName.innerHTML=songs[index].name;
    singerName.innerHTML=songs[index].singer;
    songImg.style=`background-image:url("${songs[index].image}");`
    volume();
    duration();

    setInterval(()=>{
        songRange.max=track.duration
        songRange.value=track.currentTime
    },1000)
    track.loop=true;
    track.load();
}

loadTrack(index);

function playPause()
{
    if(playingSong==false)
    {
        playSong()

    }else{
         pauseSong()
    }
}

function playSong(){
    track.play();
    playingSong=true;
    playPauseImg.src="svgs/pause-sharp.svg"
    songAnim.style.display="block";
}

function pauseSong(){
    track.pause();
    playingSong=false;
    playPauseImg.src="svgs/play-outline (1).svg";
    songAnim.style.display="none";

}

function nextSong(){
    if(index<songs.length-1)
    {
        index++;
        loadTrack(index);
        playSong();
    }else{
        index=0;
        loadTrack(index);
        playSong
    }
}
function previousSong(){
    if(index>0)
    {
        index--;
        loadTrack(index);
        playSong();
    }else{
        index=songs.length-1;
        loadTrack(index);
        playSong();
    }
}

function volume()
{
    track.volume=vlmRange.value/100
    if(vlmRange.value==0){

        vlmImg.src="svgs/volume-mute-outline.svg";
    }else{
        vlmImg.src="svgs/volume-medium-outline.svg";
    }
}

function duration(){
    track.currentTime=songRange.value
}

playlistImg.addEventListener("click",()=>{
    songsList.classList.toggle("songsList-active");
    if(songsList.classList.contains("songsList-active")){
        playlistImg.src="svgs/cross.svg";
    }else{
        playlistImg.src="svgs/playlist.svg";
    }
})

playList.forEach((songs,index)=>{
    songs.addEventListener("click",()=>{
        loadTrack(index);
        playSong();
        songsList.classList.remove("songsList-active");
        playlistImg.src="svgs/playlist.svg";
    }
    )
})