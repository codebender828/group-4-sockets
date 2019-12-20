<template>
  <section class="container">
    <h2 class="label absolute text-3xl t-0 r-1 font-bold text-green-dark z-10">
      VIEWER
    </h2>
    <video ref="video" autoplay="true" />
  </section>
</template>

<script lang="js">
import socket from '@/plugins/socket.io'

export default {
  data() {
    return {
      stream: undefined
    }
  },
  mounted() {
    const config = { // eslint-disable-line no-unused-vars
      'iceServers': [{
        'urls': ['stun:stun.l.google.com:19302']
      }]
    }

    let peerConnection

    const video = this.$refs.video

    socket.on('offer', function (id, description) {
      peerConnection = new RTCPeerConnection(config)
      peerConnection.setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(function () {
          socket.emit('answer', id, peerConnection.localDescription)
        })
      peerConnection.onaddstream = function (event) {
        video.srcObject = event.stream
      }
      peerConnection.onicecandidate = function (event) {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate)
        }
      }
    })

    socket.on('candidate', (id, candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(e => console.error('[addIceCandidate]:', e))
    })

    socket.on('connect', () => {
      socket.emit('watcher')
    })

    socket.on('broadcaster', () => {
      socket.emit('watcher')
    })

    socket.on('bye', () => {
      peerConnection.close()
    })
  }
}
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

html { overflow: hidden; height: 100%;}
video { width: 100%; height: 100%; position: absolute; display: block; top: 0; left: 0; object-fit: cover;}
body {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: black;
  margin: 0;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.label {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
