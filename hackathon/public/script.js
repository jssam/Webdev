const socket = io('/')
const video_sender = document.querySelector('.video-container-sender')
const video_reciever= document.querySelector('.video-container-receiver')
const myPeer = new Peer(undefined, {
  host: `/`,
  port: '9000'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    console.log("sanyam")
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    setTimeout(connectToNewUser,1000,userId,stream)
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream_reciever(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  console.log(video);
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  video.classList.add("video");
  video_sender.append(video)
}
function addVideoStream_reciever(video, stream) {
    video.srcObject = stream
    console.log(video);
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    video.classList.add("video");
    video_reciever.append(video)
  }