export default function isImageFile(path: string) {
    let isImage: boolean;
    if (path.split('.')[1] === 'webm' || path.split('.')[1] === 'mp4') {
        isImage = false;
    }   else {
        isImage = true;
    }
    return isImage;
}