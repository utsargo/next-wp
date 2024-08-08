// utils/validateImage.js
export const isImageUrlValid = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error validating image URL:', error);
      return false;
    }
  };
  