import { Component, Renderer2 } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { NgZone } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { StorageService } from '../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import RecordRTC from 'recordrtc';

@Component({
  selector: 'app-record-rtc',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    NgIf,
    NgFor,
    TooltipModule,
    MessagesModule,
  ],
  templateUrl: './record-rtc.component.html',
  styleUrl: './record-rtc.component.css',
  providers: [StorageService, MessageService],
})
export class RecordRtcComponent {
  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private storageService: StorageService,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  videoRef: any;
  stream: MediaStream | undefined;
  recorder: any;
  recordedBlobs: Blob[] = [];

  ngOnInit(): void {
    this.videoRef = this.renderer.selectRootElement('#video');
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
          this.recordedBlobs.push(blob);
          this.ngZone.run(() => {});
        });
      }
    }
  }

  watchVideo(index: number) {
    console.log('Video clicked:', index);
    const selectedBlob = this.recordedBlobs[index - 1];
    const blobUrl = URL.createObjectURL(selectedBlob);

    const videoElement = this.renderer.selectRootElement(
      '#video'
    ) as HTMLVideoElement;
    videoElement.src = blobUrl;

    videoElement.addEventListener('error', (event) => {
      console.error('Video playback error:', event);
    });

    videoElement.play();
  }

  deleteVideo(index: number): void {
    if (index >= 0 && index < this.recordedBlobs.length) {
      this.recordedBlobs.splice(index, 1);
    }
  }
  saveBlob(blob: Blob) {
    const file = new File([blob], 'blob.webm', { type: 'video/webm' });

    this.storageService
      .uploadBlob(file)
      .then((downloadURL) => {
        console.log('File uploaded, download URL:', downloadURL);
        this.messageService.add({
          severity: 'success',
          summary: 'Upload Complete',
          detail: 'Video Uploaded Successfully',
        });
        // getting email from localStorage
        const userEmail = localStorage.getItem('userEmail');

        if (userEmail) {
          const postData = {
            email: userEmail,
            downloadURL: downloadURL,
          };

          this.http
            .post('http://localhost:3000/api/user/blobs', postData)
            .subscribe(
              (response) => {
                console.log('API response:', response);
              },
              (error) => {
                console.error('API error:', error);
              }
            );
        } else {
          console.error('User email not found in localStorage');
        }
      })
      .catch((error) => {
        console.log('Upload failed:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Upload Failed',
          detail: 'Video Failed to Upload',
        });
      });
  }
}
