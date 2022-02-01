export const downloadFile = async (url, imageType) => {
  const n = url.lastIndexOf('/');

  const fileName = url.substring(n + 1); // eslint-disable-line

  try {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${new Date().getTime()}.${imageType}`;
      link.href = objectUrl;
      link.click();
    };
    xhr.open('GET', url);
    xhr.send();
  } catch (error) {
    console.log(error);
  }
};
