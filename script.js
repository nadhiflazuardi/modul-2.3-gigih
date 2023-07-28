// Use ES6 features and separate JavaScript logic

const playlist = [];

function addSongToPlaylist() {
    const songTitleInput = document.getElementById("song-title");
    const artistNameInput = document.getElementById("artist-name");
    const songTitle = songTitleInput.value.trim();
    const artistName = artistNameInput.value.trim();

    if (songTitle !== "" && artistName !== "") {
        const newSong = {
            title: songTitle,
            artist: artistName,
            playCount: 0
        };

        playlist.push(newSong);
        songTitleInput.value = "";
        artistNameInput.value = "";
        updateSongLists();
    }
}

function increasePlayCount(songIndex) {
    playlist[songIndex].playCount++;
    updateSongLists();
}

function sortSongsByMostPlayed() {
    playlist.sort((a, b) => b.playCount - a.playCount);
}

function updateSongLists() {
    const allSongsList = document.getElementById("all-songs-list");
    const mostPlayedSongsList = document.getElementById("most-played-songs-list");

    // Get the current songs displayed in the "Show All Songs" section
    const currentAllSongs = allSongsList.querySelectorAll("li");

    // Clear the "Show All Songs" and "Show Your Most Played Songs" sections
    allSongsList.innerHTML = "";
    mostPlayedSongsList.innerHTML = "";

    // Repopulate the "Show All Songs" list based on the original playlist order
    playlist.forEach((song, index) => {
        const listItem = document.createElement("li");

        // Create a play button for each song
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        playButton.addEventListener("click", () => increasePlayCount(index));

        listItem.textContent = `${song.title} - ${song.artist} (${song.playCount} plays)`;
        listItem.appendChild(playButton);

        // Add the song to the "Show All Songs" section
        allSongsList.appendChild(listItem);
    });

    // Sort the playlist by play count (descending order)
    sortSongsByMostPlayed();

    // Repopulate the "Show Your Most Played Songs" section
    playlist.slice(0, 3).forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist} (${song.playCount} plays)`;

        mostPlayedSongsList.appendChild(listItem);
    });

    // Save playlist to localStorage
    localStorage.setItem("playlist", JSON.stringify(playlist));
}

// Load playlist from localStorage on page load
const savedPlaylist = localStorage.getItem("playlist");
if (savedPlaylist) {
    playlist.push(...JSON.parse(savedPlaylist));
    sortSongsByMostPlayed(); // Sort the playlist on page load
}

// Update the song lists on page load
updateSongLists();
