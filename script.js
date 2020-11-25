function init() {
    const { createFFmpeg, fetchFile } = FFmpeg;

    let logElem = document.getElementById('log');
    console.log = function (message) {
        logElem.innerHTML += message + '<br />';
        logElem.scrollTop = logElem.scrollHeight;
    };

    const ffmpeg = createFFmpeg({ log: true });
    
    document.getElementById('make_meme').onclick = function() {
        (async () => {
            if(!ffmpeg.isLoaded()) {
                await ffmpeg.load();
            }
            
            ffmpeg.FS('writeFile', 'input.mp4', await fetchFile('./cat.mp4'));
            ffmpeg.FS('writeFile', 'font.ttf', await fetchFile('./OpenSans-Regular.ttf'));
            
            await ffmpeg.run('-i', 'input.mp4', '-vf',
            'drawtext= fontfile=font.ttf: text=\''
            +document.getElementById("cat").value
            +'\': fontcolor=black: x=200: y=550: fontsize=48, drawtext= fontfile=font.ttf: text=\''
            +document.getElementById("drummer").value
            +'\': fontcolor=white: x=850: y=400: fontsize=48, drawtext= fontfile=font.ttf: text=\''
            +document.getElementById("drum").value
            +'\': x=650: y=600: fontcolor=white: fontsize=48',
            '-codec:a', 'copy', 'output.mp4'
            );
            
            const data = ffmpeg.FS('readFile', 'output.mp4');
            const video = document.getElementById('output-video');
            video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        })();
    }
}
