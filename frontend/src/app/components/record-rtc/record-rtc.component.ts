import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import RecordRTC from 'recordrtc';

@Component({
  selector: 'app-record-rtc',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './record-rtc.component.html',
  styleUrl: './record-rtc.component.css',
})
export class RecordRtcComponent {
  constructor() {}

  videoRef: any;
  stream: MediaStream | undefined;
  recorder: any;

  ngOnInit(): void {
    this.videoRef = document.getElementById('video');
  }

  ngOnDestroy(): void {
    this.stopVideo();
  }

  playVideo() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 300, height: 250 },
        audio: true,
      })
      .then((stream) => {
        this.stream = stream;
        this.videoRef.srcObject = stream;
        this.videoRef.play();
        this.recorder = new RecordRTC(stream, {
          type: 'video',
        });
        this.recorder.startRecording();
      })
      .catch((error) => {
        console.error('Error accessing media device:', error);
      });
  }

  stopVideo() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.videoRef.pause();
      this.videoRef.srcObject = null;

      if (this.recorder) {
        this.recorder.stopRecording(() => {
          let blob = this.recorder.getBlob();
          console.log(blob);
          console.log('Blob size:', blob.size);
        });
      }
    }
  }
}
