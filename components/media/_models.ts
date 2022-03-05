import { Media } from 'models/_models';

export interface MediaData {
  title: string;
  uploadFile: any;
  url: string;
}

export interface MediaProps {
  media: Media;
}
