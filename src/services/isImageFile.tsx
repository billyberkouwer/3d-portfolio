export default function isImageFile(path: string) {
    let isImage: boolean;
    if (path.split('.')[1] === 'webm' || path.split('.')[1] === 'mp4') {
        console.log(path)
        isImage = false;
    }   else {
        console.log(path.split('.')[1])
        isImage = true;
    }
    return isImage;
}