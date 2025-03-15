// src/utils/audioConfig.js

/**
 * Configuration for the wedding audio player
 * You can add multiple songs to create a playlist
 */
const audioConfig = {
	// Main wedding background music
	defaultSong: {
		src: "/audio/wedding-song.mp3",
		title: "Wedding Melody",
		artist: "Romantic Orchestra",
	},

	// Alternative songs that can be used in different sections
	songs: [
		{
			id: "main",
			src: "/audio/wedding-song.mp3",
			title: "Wedding Melody",
			artist: "Romantic Orchestra",
		},
		{
			id: "entrance",
			src: "/audio/entrance-song.mp3",
			title: "Welcome to Our Day",
			artist: "Love Ensemble",
		},
		{
			id: "reception",
			src: "/audio/reception-song.mp3",
			title: "Celebration of Love",
			artist: "Romantic Strings",
		},
	],

	// Get a specific song by ID
	getSongById: function (id) {
		return this.songs.find((song) => song.id === id) || this.defaultSong
	},
}

export default audioConfig
