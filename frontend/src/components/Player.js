
import React from 'react';
import YouTube from 'react-youtube';

class Player extends React.Component {
   
  render(props) {
    function onPlayerReady(event) {
        var embedCode = event.target.getVideoEmbedCode();
        event.target.playVideo();
        if (document.getElementById('embed-code')) {
          document.getElementById('embed-code').innerHTML = embedCode;
        }
      }
    const opts = {
      height: '485',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return <YouTube videoId={this.props.videoId} opts={opts} onReady={onPlayerReady} />;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Player;