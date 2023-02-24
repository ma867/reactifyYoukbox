import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { Buffer } from "buffer";
import { UploadButton } from 'react-uploader';
import { Uploader } from 'uploader'
import { upload } from "@testing-library/user-event/dist/upload"
import Homepage from "../Homepage/Home";
import MainPage from "../MainPage/Main";
import SearchPage from "../SearchPage/SearchPage";
import PlaylistPage from "../PlaylistPage/Playlist";
import Auth from "../Auth/Auth";
import PlaylistsPage from "../PlaylistsPage/Playlists";

function App() {
  const [user, setUser] = useState(getUser());
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [showUpdatePlaylist, setShowUpdatePlaylist] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  const [artwork, setArtwork] = useState("https://i.imgur.com/0FUT9eJ.png");
  const [playlistArtwork, setPlaylistArtwork] = useState("https://i.imgur.com/0FUT9eJ.png");

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    audio: "",
    userId: user?._id,
  });

  const [playlistFormData, setPlaylistFormData] = useState({
    title: "",
    description: "",
    userId: user?._id,
  });



  const getRefreshedUser = async () => {

    try {

      const response = await fetch(`/api/users/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setSongs(data.songs)
      setPlaylists(data.playlists)
      setUser(data)
    }
    catch (error) {
      console.error(error)
    }

  }


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })

  }
  const handlePlaylistChange = (evt) => {
    setPlaylistFormData({ ...playlistFormData, [evt.target.name]: evt.target.value })

  }


  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const formDataCopy = { ...formData, artwork }

      const response = await fetch(`/api/songs/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formDataCopy })
      })
      setFormData({
        title: '',
        artist: '',
        album: '',
        audio: '',
        userId: user._id

      })
      setShowModal(false)
      getRefreshedUser()
    }
    catch (error) {
      console.error(error)
    }

  }
  const handlePlaylistSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const playlistFormDataCopy = { ...playlistFormData, playlistArtwork }

      const response = await fetch(`/api/playlists/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...playlistFormDataCopy, artwork: playlistArtwork, songs: playlistSongs })
      })
      setPlaylistFormData({
        title: "",
        description: "",
        userId: user._id,
      })
      setShowModal(false)
      getRefreshedUser()
    }
    catch (error) {
      console.error(error)
    }

  }
  const uploader = Uploader({
    apiKey: 'free'
  })

  const options = {
    multi: false,
    maxFileCount: 1,
    editor: {
      images: {
        crop: true,
        cropShape: 'circ',
        cropRatio: 1 / 1
      }
    }
  }
  return (
    <>
      {user ? (
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                showUpdatePlaylist={showUpdatePlaylist}
                setShowUpdatePlaylist={setShowUpdatePlaylist}
                handlePlaylistChange={handlePlaylistChange}
                handlePlaylistSubmit={handlePlaylistSubmit}
                playlistArtwork={playlistArtwork}
                setPlaylistArtwork={setPlaylistArtwork}
                playlistFormData={playlistFormData}
                setPlaylistFormData={setPlaylistFormData}
                uploader={uploader}
                options={options}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                getRefreshedUser={getRefreshedUser}
                songs={songs}
                setSongs={setSongs}
                artwork={artwork}
                setArtwork={setArtwork}
                formData={formData}
                setFormData={setFormData}
                user={user}
                setUser={setUser}
                showModal={showModal}
                setShowModal={setShowModal}
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                setShowUpload={setShowUpload}
                showUpload={showUpload}
                setShowNewPlaylist={setShowNewPlaylist}
                showNewPlaylist={showNewPlaylist}
                playlistSongs={playlistSongs}
                setPlaylistSongs={setPlaylistSongs}
              />
            }
          />
          <Route
            path="/search/:songTitle"
            element={
              <SearchPage
                showUpdatePlaylist={showUpdatePlaylist}
                setShowUpdatePlaylist={setShowUpdatePlaylist}
                handlePlaylistChange={handlePlaylistChange}
                handlePlaylistSubmit={handlePlaylistSubmit}
                playlistArtwork={playlistArtwork}
                setPlaylistArtwork={setPlaylistArtwork}
                playlistFormData={playlistFormData}
                setPlaylistFormData={setPlaylistFormData}
                uploader={uploader}
                options={options}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                getRefreshedUser={getRefreshedUser}
                songs={songs}
                setSongs={setSongs}
                artwork={artwork}
                setArtwork={setArtwork}
                formData={formData}
                setFormData={setFormData}
                user={user}
                setUser={setUser}
                showModal={showModal}
                setShowModal={setShowModal}
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                setShowUpload={setShowUpload}
                showUpload={showUpload}
                setShowNewPlaylist={setShowNewPlaylist}
                showNewPlaylist={showNewPlaylist}
                playlistSongs={playlistSongs}
                setPlaylistSongs={setPlaylistSongs}
              />
            }
          />
          <Route
            path="/playlists"
            element={
              <PlaylistsPage
                showUpdatePlaylist={showUpdatePlaylist}
                setShowUpdatePlaylist={setShowUpdatePlaylist}
                handlePlaylistChange={handlePlaylistChange}
                handlePlaylistSubmit={handlePlaylistSubmit}
                playlistArtwork={playlistArtwork}
                setPlaylistArtwork={setPlaylistArtwork}
                playlistFormData={playlistFormData}
                setPlaylistFormData={setPlaylistFormData}
                uploader={uploader}
                options={options}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                getRefreshedUser={getRefreshedUser}
                songs={songs}
                setSongs={setSongs}
                artwork={artwork}
                setArtwork={setArtwork}
                formData={formData}
                setFormData={setFormData}
                user={user}
                setUser={setUser}
                showModal={showModal}
                setShowModal={setShowModal}
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                setShowUpload={setShowUpload}
                showUpload={showUpload}
                setShowNewPlaylist={setShowNewPlaylist}
                showNewPlaylist={showNewPlaylist}
                playlistSongs={playlistSongs}
                setPlaylistSongs={setPlaylistSongs}
                playlists={playlists}
              />
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <PlaylistPage
                showUpdatePlaylist={showUpdatePlaylist}
                setShowUpdatePlaylist={setShowUpdatePlaylist}
                handlePlaylistChange={handlePlaylistChange}
                handlePlaylistSubmit={handlePlaylistSubmit}
                playlistArtwork={playlistArtwork}
                setPlaylistArtwork={setPlaylistArtwork}
                playlistFormData={playlistFormData}
                setPlaylistFormData={setPlaylistFormData}
                uploader={uploader}
                options={options}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                getRefreshedUser={getRefreshedUser}
                songs={songs}
                setSongs={setSongs}
                artwork={artwork}
                setArtwork={setArtwork}
                formData={formData}
                setFormData={setFormData}
                user={user}
                setUser={setUser}
                showModal={showModal}
                setShowModal={setShowModal}
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                setShowUpload={setShowUpload}
                showUpload={showUpload}
                setShowNewPlaylist={setShowNewPlaylist}
                showNewPlaylist={showNewPlaylist}
                playlistSongs={playlistSongs}
                setPlaylistSongs={setPlaylistSongs}
                playlists={playlists}
              />
            }
          />
        </Routes>
      )
        :
        <Homepage user={user} setUser={setUser} />
      }
    </>

  )

}

export default App;
