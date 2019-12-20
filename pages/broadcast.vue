<template>
  <section class="container relative">
    <h2 class="label absolute text-3xl t-0 r-1 font-bold text-red z-10">
      BROADCASTER
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
    const peerConnections = {}

    /** @type {MediaStreamConstraints} */
    const constraints = {
      // audio: true,
      video: { facingMode: 'user' }
    }

    /** @type {RTCConfiguration} */
    const config = { // eslint-disable-line no-unused-vars
      'iceServers': [{
        'urls': [
          'stun:stun1.l.google.com:19302',
          'stun:stun.stunprotocol.org:3478'
        ]
      }]
    }

    const video = this.$refs.video

    console.log('navigator', navigator)

    // Combine RTCPeerConnection with getUserMedia
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream
        socket.emit('broadcaster')
      }).catch(error => console.error(error))

    // When viewer sends and answer, we cna then set the remote description we receive.
    socket.on('answer', (id, description) => {
      peerConnections[id].setRemoteDescription(description)
    })

    socket.on('watcher', (id) => {
      const peerConnection = new RTCPeerConnection(config)
      peerConnections[id] = peerConnection
      peerConnection.addStream(video.srcObject)
      peerConnection.createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('offer', id, peerConnection.localDescription)
        })
        .catch(err => console.warn('[peerConnection]: Could not create offer', err))

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate)
        }
      }
    })

    socket.on('candidate', (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
    })

    socket.on('bye', (id) => {
      peerConnections[id] && peerConnections[id].close()
      delete peerConnections[id]
    })
  },
  beforeDestroy() {
    socket.close()
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
  right: 0px;
}
</style>
