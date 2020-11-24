const { createFFmpeg, fetchFile } = FFmpeg;

const ffmpeg = createFFmpeg({ log: true });

(async () => {
    await ffmpeg.load();
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile('./cat.mp4'));
    ffmpeg.FS('writeFile', 'font.ttf', await fetchFile('./OpenSans-Regular.ttf'));
    
    await ffmpeg.run('-i', 'input.mp4', '-vf',
    'drawtext= fontfile=font.ttf: text=\'cat\': fontcolor=black: x=200: y=550: fontsize=48, drawtext= fontfile=font.ttf: text=\'drummer\': fontcolor=white: x=850: y=400: fontsize=48, drawtext= fontfile=font.ttf: text=\'drum\': x=650: y=600: fontcolor=white: fontsize=48',
    '-codec:a', 'copy', 'output.mp4'
    );
    
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const video = document.getElementById('output-video');
    video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
})();
