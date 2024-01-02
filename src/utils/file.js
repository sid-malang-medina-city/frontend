import imageCompression from 'browser-image-compression';

export default {
  async compressImage (file, maxSize) {
    const options = {
      maxSizeMB: maxSize
    }
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile
    } catch (error) {
      console.log(error);
    }
  }
}