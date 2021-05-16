let videoelem = document.querySelector("video");
        let audioelem = document.querySelector("audio");
        let mediaRecorder;
        ////data buffer me ata hai to hm ek array me data girate jaynge 
        let buffer = [];
        let constrains = {
            video:true,
            audio: true
        }
        navigator.mediaDevices.getUserMedia(constrains)
        .then(function(mediaStream){
            videoelem.srcObject = mediaStream;
            audioelem.srcObject = mediaStream;
            ///recording ke liye media recorder
            mediaRecorder = new MediaRecorder(mediaStream);
            mediaRecorder.addEventListener("dataavailable",function(e){
                buffer.push(e.data);
            })
            mediaRecorder.addEventListener("stop",function(){
                ///buffer se fata utha ke blob me rakha 
                ///it convert that data in mine type  menans hmari file ke type me 
                let blob = new Blob(buffer,{ type: "video/mp4"});
                const url = window.URL.createObjectURL(blob);
                ///download ke liye ek ankor tag bnana hai
                let a = document.createElement("a");
                //download
                a.download = "file.mp4";
                a.href = url;
                a.click();
                buffer = [];
            });
            
        }).catch(function(err){
            console.log(err);
        });
        let videorecorder = document.querySelector("#record-video");
        let recordState = false;
        videorecorder.addEventListener("click",function(){
            if(!recordState){
                mediaRecorder.start();
                videorecorder.innerHTML = "recording";
                recordState = true;
            }else{
                mediaRecorder.stop();
                videorecorder.innerHTML = "record";
                recordState = false;
            }

        })
