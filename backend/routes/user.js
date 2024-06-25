const express = require("express");
const User = require("../Models/User");

const { generateToken } = require("../helper/generateToken");
const jsonWeb = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Playlist = require("../Models/Playlist");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.findOne({ email: username });
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    } else {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) {
        return res.json({ success: false, message: "wrong password" });
      } else {
        let token = generateToken(user._id);
        return res.json({
          success: true,
          message: "Succesful login",
          token,
          user,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "internal server error" });
  }
});

router.post("/reset", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    let email = false;
    const hash = await bcrypt.hash(password, 10);
    if (!user) {
      user = await User.findOne({ email: username });
      email = true;
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid username or email" });
    } else {
      if (email) {
        await User.updateOne({ email: username }, { password: hash });
      } else {
        await User.updateOne({ username: username }, { password: hash });
      }
      return res.json({
        success: true,
        message: "Reset password successfully",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, DOB, email, gender } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hash,
      DOB,
      email,
      gender,
    });
    if (user) {
      const token = generateToken(user._id);
      console.log(token);
      res.json({ success: true, message: "User created", user, token });
    } else {
      res.json({ success: false, message: "User not created" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "internal server error" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User unauthorized" });
    }

    const data = jsonWeb.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(data.id);
    if (user) {
      return res.json({ user, success: true, message: "User found" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session has expired, please login again",
    });
  }
});

router.post("/playlist/create", async (req, res) => {
  try {
    const { token } = req.headers;
    let { title, singers, songs } = req.body;

    const playlist = await Playlist.create({ title, singers, songs });

    const data = jsonWeb.verify(token, process.env.JWT_SECRET);

    User.findById(data.id).then(async (user) => {
      if (user) {
        user.playlists.push({ playlist_id: playlist.id });
        await user.save();

        res.json({ success: true, message: "Playlist added" });
      } else {
        res.json({ success: false, message: "No user found" });
      }
    });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
});

router.post("/like", async (req, res) => {
  const { song_title, song_artist } = req.body;
  const { token } = req.headers;
  console.log({ song_title, song_artist });
  try {
    if (token) {
      const data = jsonWeb.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(data.id);

      if (user) {
        const p = user.playlists;
        if (p.length !== 0) {
          let found = false;
          await Promise.all(
            p.map(async (play) => {
              const playlist = await Playlist.findById(play.playlist_id);

              if (playlist.title === "Liked Songs") {
                const songExists = playlist.songs.some(
                  (song) =>
                    song.song_title === song_title &&
                    song.song_artist === song_artist
                );
                found = true;
                if (!songExists) {
                  playlist.songs.push({ song_title, song_artist });

                  await Playlist.findByIdAndUpdate(play.playlist_id, playlist);
                }
              }
            })
          );

          if (found === false) {
            const playlist = await Playlist.create({
              title: "Liked Songs",
              singers: [{ singer_name: user.username }],
              songs: [{ song_title, song_artist }],
            });

            user.playlists.push({ playlist_id: playlist.id });
            await user.save();
            return res.json({
              success: false,
              message: "Liked song playlist created",
              playlists: [],
            });
          }
        } else {
          const playlist = await Playlist.create({
            title: "Liked Songs",
            singers: [{ singer_name: user.username }],
            songs: [{ song_title, song_artist }],
          });

          user.playlists.push({ playlist_id: playlist.id });
          await user.save();
          return res.json({
            success: false,
            message: "Liked song playlist created",
            playlists: [],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
      playlists: [],
    });
  }
});

router.get("/playlists", async (req, res) => {
  const { token } = req.headers;
  try {
    if (token) {
      const data = jsonWeb.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(data.id);

      if (user) {
        const p = user.playlists;

        if (p.length === 0) {
          return res.json({
            success: false,
            message: "No playlists found",
            playlists: [],
          });
        }
        const playlists = [];
        await Promise.all(
          p.map(async (play) => {
            const playlist = await Playlist.findById(play.playlist_id);
            if (playlist) {
              playlists.push(playlist);
            }
          })
        );

        return res.json({
          success: true,
          message: "Playlists found",
          playlists: playlists,
        });
      }
    } else {
      return res.json({
        success: false,
        message: "No playlists found",
        playlists: [],
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error",
      playlists: [],
    });
  }
});

module.exports = router;
