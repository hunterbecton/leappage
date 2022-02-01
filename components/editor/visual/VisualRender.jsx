import { useState, useEffect } from 'react';
import { Frame, Editor } from '@craftjs/core';
import lz from 'lzutf8';
import WebFont from 'webfontloader';

import { Text } from 'components/editor/selectors/text';
import { Container } from 'components/editor/selectors/container';
import { Image } from 'components/editor/selectors/image';
import { RenderProps } from 'components/editor/visual';

export const VisualRender = () => {
  const [json, setJson] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Get frame data for template
    const frame = localStorage.getItem('frame');
    const fonts = localStorage.getItem('fonts');

    let loadFonts = [];

    const parsedFonts = JSON.parse(fonts);

    parsedFonts.map((font) => {
      loadFonts.push(`${font.fontFamily}:${font.fontWeight}`);
    });

    // Load fonts
    WebFont.load({
      google: {
        families: loadFonts,
      },
    });

    const json = lz.decompress(lz.decodeBase64(frame));

    setJson(json);

    setIsLoaded(true);
    setIsSuccess(true);
  }, []);

  return (
    <Editor resolver={{ Text, Container, Image }} enabled={false}>
      <RenderProps>
        {isLoaded && isSuccess && <Frame json={json}></Frame>}
      </RenderProps>
    </Editor>
  );
};
