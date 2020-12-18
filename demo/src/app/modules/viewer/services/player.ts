export class Player {

    createMediaSource(url: string): MediaSource {
        const mediaSource = new MediaSource();
        const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        mediaSource.addEventListener('sourceopen', () => {
            const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
            this.fetchBuffer(url, sourceBuffer, mediaSource);
        });
        return mediaSource;
    }

    fetchBuffer(url: string, buffer: SourceBuffer, mediaSource: MediaSource) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = _ => {
            buffer.addEventListener('updateend', _ => {
                mediaSource.endOfStream();
                // video.play();
            });
            buffer.appendBuffer(xhr.response);
        }
        xhr.send();
    };
}