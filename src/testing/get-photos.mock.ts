import { join } from 'path';
import { getFileToBuffer } from './get-file-to-buffer';

export const getPhotos = async () => {
  const { buffer, stream } = await getFileToBuffer(
    join(__dirname, 'photo.jpg'),
  );

  const photos: Express.Multer.File[] = [
    {
      fieldname: 'file',
      originalname: 'photo.jpg',
      encoding: '7bit',
      mimetype: 'image/jpg',
      size: 1024 * 50,
      stream,
      destination: '',
      filename: 'file-name.jpg',
      path: 'file-path',
      buffer,
    },
    {
      fieldname: 'file',
      originalname: 'photo.jpg',
      encoding: '7bit',
      mimetype: 'image/jpg',
      size: 1024 * 50,
      stream,
      destination: '',
      filename: 'file-name.jpg',
      path: 'file-path',
      buffer,
    },
  ];

  return photos;
};
