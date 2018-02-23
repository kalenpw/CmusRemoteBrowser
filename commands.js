const PAUSE = "cmus-remote -u";
const NEXT = "cmus-remote -n";
const PREVIOUS = "cmus-remote -r";
const SHUFFLE = "cmus-remote -S";
const REPEAT = "cmus-remote -R";
const VOLUME_UP = "cmus-remote -v +5%";
const VOLUME_DOWN = "cmus-remote -v -5%";
const FASTFORWARD= "cmus-remote -k -10s";
const REWIND = "cmus-remote -k +10s";
const GET_SONG_NAME = "cmus-remote -Q | sed -n -e 's/^.*tag title //p'";
const GET_ALBUM_NAME = "cmus-remote -Q | sed -n -e 's/^.*tag album //p'";
const GET_ARTIST_NAME = "cmus-remote -Q | sed -n -e 's/^.*tag artist //p'";
const GET_SHUFFLE = "cmus-remote -Q | sed -n -e 's/^.*set shuffle //p'";
const GET_REPEAT = "cmus-remote -Q | sed -n -e 's/^.*set repeat //p'";
module.exports = {
    PAUSE: PAUSE,
    NEXT: NEXT,
    PREVIOUS: PREVIOUS,
    SHUFFLE: SHUFFLE,
    REPEAT: REPEAT,
    VOLUME_UP: VOLUME_UP,
    VOLUME_DOWN: VOLUME_DOWN,
    FASTFORWARD: FASTFORWARD,
    REWIND: REWIND,
    GET_SONG_NAME: GET_SONG_NAME,
    GET_ALBUM_NAME: GET_ALBUM_NAME,
    GET_ARTIST_NAME: GET_ARTIST_NAME,
    GET_SHUFFLE: GET_SHUFFLE,
    GET_REPEAT: GET_REPEAT
}
