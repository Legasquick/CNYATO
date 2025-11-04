import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

interface Reel {
  id: number;
  videoUrl: string;
  aspectRatio: '16x9' | '9x16';
}

@Component({
  selector: 'app-showreel',
  templateUrl: './showreel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowreelComponent implements AfterViewInit {
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  // Reordered for a more balanced collage layout
  reels: Reel[] = [
    { id: 1, videoUrl: 'https://cdn.imgchest.com/files/ba62e06ce4f5.mp4', aspectRatio: '16x9' },
    { id: 5, videoUrl: 'https://cdn.imgchest.com/files/61b949a36792.mp4', aspectRatio: '16x9' },
    { id: 2, videoUrl: 'https://cdn.imgchest.com/files/d8547fb59026.mp4', aspectRatio: '9x16' },
    { id: 3, videoUrl: 'https://cdn.imgchest.com/files/0545300730ed.mp4', aspectRatio: '9x16' },
    { id: 4, videoUrl: 'https://cdn.imgchest.com/files/615b2ef1658d.mp4', aspectRatio: '9x16' },
    { id: 6, videoUrl: 'https://cdn.imgchest.com/files/cf266d7cb3d5.mp4', aspectRatio: '16x9' },
    { id: 7, videoUrl: 'https://cdn.imgchest.com/files/83d4b7692f5d.mp4', aspectRatio: '16x9' },
    { id: 8, videoUrl: 'https://cdn.imgchest.com/files/fedba99613bb.mp4', aspectRatio: '16x9' },
  ];

  ngAfterViewInit(): void {
    // Programmatically play videos to ensure autoplay works across browsers
    this.videoPlayers.forEach(el => {
      const video = el.nativeElement;
      // Mute is essential for autoplay
      video.muted = true; 
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Autoplay was prevented for video:', video.src, error);
          // Fallback logic could be added here, e.g., showing a play button
        });
      }
    });
  }
}