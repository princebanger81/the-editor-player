document.addEventListener('DOMContentLoaded', function () {
    const songs = [
        "Adhoore Sapno Ka Jahan",
        "Barsaat Ki Raat",
        "Echoes in My Ear",
        "In the Stillness",
        "Jatt Da Style",
        "Jatt Di Thug Life",
        "Kaafla Te Superstar",
        "Oh Jann",
        "Prem Ki Murli",
        "Badlan Jattan Da",
        "Takkar Wale Yaar",
        "Khoya Pyaar",
        "Maa - Mother",
        "Raindrops on the Window",
        "Shadows in the Gray",
        "Starlit Reflections",
        "Tanha Safar",
        "Tera Mera Pyaar",
        "Toota Hua Dil",
        "Toote Dil Ka Afsana",
        "Toote Khwab",
        "Veer Ki Goonj",
        "Yaadein - Memories"
    ];

    const songDetails = songs.map(song => ({
        title: song,
        artist: "Prince Banger",
        album: "The Editor",
        filePath: `songs/${song}.mp3`,
        coverPath: `images/${song}.jpg`
    }));

    const menuBtn = document.getElementById('menu-btn');
    const menuOptions = document.getElementById('menu-options');
    const homeBtn = document.getElementById('home-btn');
    const searchBtn = document.getElementById('search-btn');
    const libraryBtn = document.getElementById('library-btn');
    const homePage = document.getElementById('home-page');
    const searchPage = document.getElementById('search-page');
    const libraryPage = document.getElementById('library-page');
    const songPage = document.getElementById('song-page');
    const recentSongsDiv = document.getElementById('recent-songs');
    const trendingSongsDiv = document.getElementById('trending-songs');
    const allSongsDiv = document.getElementById('all-songs');
    const recentSearchesDiv = document.getElementById('recent-searches');
    const librarySongsDiv = document.getElementById('library-songs');
    const searchBar = document.getElementById('search-bar');
    const songCover = document.getElementById('song-cover');
    const songTitle = document.getElementById('song-title');
    const currentTimeEl = document.getElementById('current-time');
    const songProgress = document.getElementById('song-progress');
    const totalTimeEl = document.getElementById('total-time');
    const playPauseBtn = document.getElementById('play-pause');
    const prevSongBtn = document.getElementById('prev-song');
    const nextSongBtn = document.getElementById('next-song');
    const fileInput = document.getElementById('file-input');

    let currentSongIndex = 0;
    let audio = new Audio();
    let isPlaying = false;

    function displaySongs() {
        recentSongsDiv.innerHTML = '';
        trendingSongsDiv.innerHTML = '';
        allSongsDiv.innerHTML = '';

        songDetails.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <img src="${song.coverPath}" alt="Song Cover">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            `;
            songItem.addEventListener('click', () => {
                playSong(index);
            });

            if (index < 5) {
                recentSongsDiv.appendChild(songItem);
            }
            if (index < 10) {
                trendingSongsDiv.appendChild(songItem);
            }
            allSongsDiv.appendChild(songItem);
        });
    }

    function playSong(index) {
        if (audio.src !== songDetails[index].filePath) {
            audio.src = songDetails[index].filePath;
            audio.load();
        }
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = 'Pause';
        songTitle.textContent = songDetails[index].title;
        songCover.src = songDetails[index].coverPath;
        songPage.classList.remove('hidden');
    }

    function updateProgress() {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            songProgress.value = progress;
            currentTimeEl.textContent = formatTime(audio.currentTime);
            totalTimeEl.textContent = formatTime(audio.duration);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    menuBtn.addEventListener('click', () => {
        menuOptions.classList.toggle('menu-visible');
    });

    homeBtn.addEventListener('click', () => {
        homePage.classList.remove('hidden');
        searchPage.classList.add('hidden');
        libraryPage.classList.add('hidden');
        songPage.classList.add('hidden');
    });

    searchBtn.addEventListener('click', () => {
        homePage.classList.add('hidden');
        searchPage.classList.remove('hidden');
        libraryPage.classList.add('hidden');
        songPage.classList.add('hidden');
    });

    libraryBtn.addEventListener('click', () => {
        homePage.classList.add('hidden');
        searchPage.classList.add('hidden');
        libraryPage.classList.remove('hidden');
        songPage.classList.add('hidden');
    });

    fileInput.addEventListener('change', function () {
        const files = this.files;
        librarySongsDiv.innerHTML = '';
        for (const file of files) {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <img src="images/default.jpg" alt="Song Cover">
                <h3>${file.name}</h3>
                <p>Uploaded</p>
            `;
            librarySongsDiv.appendChild(songItem);
        }
    });

    searchBar.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        recentSearchesDiv.innerHTML = '';
        songDetails.forEach((song, index) => {
            if (song.title.toLowerCase().includes(searchTerm)) {
                const songItem = document.createElement('div');
                songItem.classList.add('song-item');
                songItem.innerHTML = `
                    <img src="${song.coverPath}" alt="Song Cover">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                `;
                songItem.addEventListener('click', () => {
                    playSong(index);
                });
                recentSearchesDiv.appendChild(songItem);
            }
        });
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    prevSongBtn.addEventListener('click', () => {
        if (currentSongIndex > 0) {
            currentSongIndex--;
        } else {
            currentSongIndex = songDetails.length - 1;
        }
        playSong(currentSongIndex);
    });

    nextSongBtn.addEventListener('click', () => {
        if (currentSongIndex < songDetails.length - 1) {
            currentSongIndex++;
        } else {
            currentSongIndex = 0;
        }
        playSong(currentSongIndex);
    });

    audio.addEventListener('timeupdate', updateProgress);

    songProgress.addEventListener('input', () => {
        audio.currentTime = (songProgress.value / 100) * audio.duration;
    });

    displaySongs();
});
