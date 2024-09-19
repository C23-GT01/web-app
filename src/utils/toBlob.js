export default async function base64ToBlob(base64Data) {
  const file = base64Data.substring('data:image/jpeg;base64,'.length);
  const contentType = 'image/jpeg';
  const sliceSize = 512;
  const byteCharacters = atob(file);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
