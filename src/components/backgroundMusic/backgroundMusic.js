import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import classes from "../../pages/settings/settings.module.css";

const availableMusic = [
  { url: "", label: "No Background Noise" },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fstrong_wind.mp3?alt=media&token=44aa839d-a951-4439-8327-6910c6c79dcc",
    label: "Strong Wind",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fcity-traffic.mp3?alt=media&token=f888c740-ce54-452b-8ef5-d93c2faec30e",
    label: "City Traffic",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fcoffee-shop.mp3?alt=media&token=aeaaaeda-3d15-46a8-be8c-737facb3129e",
    label: "Coffee Shop",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Ffire-engine-with-siren.mp3?alt=media&token=000c7f4f-e5c2-4760-ae53-ce39190c4825",
    label: "Sirens",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Frestaurant-busy.mp3?alt=media&token=e763007e-5a2c-453e-986a-f852bb3f109",
    label: "Busy Restaurant",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fseagull-on-beach.mp3?alt=media&token=3e17bf7f-f426-437c-a318-bcb079c3f00f",
    label: "Beach",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fstorm.mp3?alt=media&token=8495f0f6-ad6c-4d17-88ce-bcea212ba012",
    label: "Storm",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fcafeteria.mp3?alt=media&token=fbf76b2f-6814-44f7-8039-c84fb64fd1be",
    label: "School Cafeteria",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fchildrens-playground.mp3?alt=media&token=94629b45-bb15-413d-a839-4a43ec4cd92b",
    label: "Children's Playground",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fbackgroundsound%2Fcity-ambience.mp3?alt=media&token=ccb89a53-d33f-4d53-aed5-921a9604e65",
    label: "City Ambience",
  },
];
function BackgroundMusicSelector() {
  const [selectedMusic, setSelectedMusic] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioPlayer) {
      //Set volume
      audioPlayer.volume = volume;
      //audioPlayer.addEventListener('ended', handleAudioEnded);
    }
  }, [volume, audioPlayer]);

  useEffect(() => {
    if (!isDropdownOpen && audioPlayer && selectedMusic === "") {
      audioPlayer.pause();
    }
  }, [isDropdownOpen, audioPlayer, selectedMusic]);

  useEffect(() => {
    return () => {
      // Cleanup function to stop the music when component unmounts
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reset the playback position
        //audioPlayer.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [audioPlayer]);

  /*const handleAudioEnded = () => {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    };*/

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };
  const handleMusicChange = (event) => {
    const selectedUrl = event.target.value;
    setSelectedMusic(selectedUrl);

    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.src = selectedUrl;
      audioPlayer.loop = true;
      audioPlayer.play();
    } else {
      const newAudioPlayer = new Audio(selectedUrl);
      newAudioPlayer.play();
      newAudioPlayer.loop = true;
      setAudioPlayer(newAudioPlayer);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const exitDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        bottom: "10px",
        maxHeight: "60px",
        zIndex: "50",
      }}
    >
      <button
        onClick={toggleDropdown}
        style={{
          borderRadius: "5px",
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
        }}
      >
        {isDropdownOpen ? "Close" : "Select Background Noise"}
      </button>
      {isDropdownOpen && (
        <div
          style={{
            borderRadius: "5px",
            width: "200px",
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
            backgroundColor: "#f0f0f0",
            padding: "10px",
          }}
        >
          <Form.Control
            as="select"
            value={selectedMusic}
            onChange={handleMusicChange}
            style={{ fontSize: "16px" }}
          >
            {availableMusic.map((music) => (
              <option key={music.url} value={music.url}>
                {music.label}
              </option>
            ))}
          </Form.Control>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: "100%", marginTop: "5px", padding: "0" }}
          />
        </div>
      )}
    </div>
  );
}
export default BackgroundMusicSelector;
