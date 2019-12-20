# Group 4 Networking Project on Sockets
This project utilizes Networking fundamentals and some protocols like HTTP and TCP Socket protocols as well as UDP to implement a Video Streaming broadcast with WebRTC technology. WebRTC is web based technology that enables peer-to-peer content sharing of data between nodes that consume content from a source.

## Team Members
- Jonathan Bakebwa (乔纳森) 1820162048
- Morteza Tabibi (塔比）1820162002
- KAMANA IDUHIRE LAURENCE 1820162069
- JEONG HOJIN (郑镐振) 1820186950

## Tech Stack
What does this project introduce? This project mainly comprises of a server written in Node.js (Server-side javascript) and Javascript on the Front end.

### Server side technologies
- Node.js
- Socket.io


### Client-side technologies
- Javascript
- HTML
- CSS
- Socket.io-client
- WebRTC

## Project Overview
This project enables a single user to broadcast and live stream their video to a group pf users via a peer to peer connection.

In order to establish the IP addresses of the viewers and broadcaster, the broad caster and the viewer both need to notify the server using a websockets connection that they have connected and also notify them of the type of the user they are. The server then assigns them the IP addresses and connection metadata to the connected candidates.

Once connetion is achieved the stream is successful and can be done from one node across mutiple nodes. Below are some images of the running application.

![](https://res.cloudinary.com/xtellar/image/upload/v1576856489/netbenders_i484nb.gif)

## Build Setup
These are the pre-requisites needed to run this project.
- Node.js ()
- Web browser

### Getting started
Run the following commands in your terminal in order to start the project
``` bash
$ npm install
$ npm run build
$ npm run start
```


