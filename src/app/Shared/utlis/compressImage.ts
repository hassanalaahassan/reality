import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.7,              
    maxWidthOrHeight: 800,    
    useWebWorker: true,
    initialQuality: 0.7        
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error(error);
    return file;
  }
}