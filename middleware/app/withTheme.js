import { dbConnect } from 'utils';
import Theme from 'models/themeModel';

dbConnect();

export const withTheme = async (tenant) => {
  try {
    const theme = await Theme.findOne({
      tenant,
    });

    if (!theme) {
      return false;
    }

    return JSON.stringify(theme);
  } catch (error) {
    console.log(error);
    return false;
  }
};
