import colors from '../colors';

const THEME_STORAGE_KEY = '__theme__';

class Theme {
    theme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';

    constructor() {
      this.resume();
    }

    setTheme = (newTheme) => {
      let theme = newTheme;
      if (typeof newTheme === 'object') {
        theme = newTheme;
      }
      this.theme = theme;
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }


    resume = () => {
      this.theme = localStorage.getItem(THEME_STORAGE_KEY);
    }

    setLightBackground = () => {
      document.body.style.backgroundColor = colors.backgroundLight;
      document.querySelector('html').style.backgroundColor = colors.backgroundLight;
    }

    setDarkBackground = () => {
      document.body.style.backgroundColor = colors.backgroundDark;
      document.querySelector('html').style.backgroundColor = colors.backgroundDark;
    }

    getDarkStyle = () => ({
      backgroundColor: colors.backgroundDark,
      color: colors.colorDark,
    })

    getStyle = (theme) => {
      if (theme === 'light') {
        return {
          color: colors.colorLight,
        };
      }
      if (theme === 'dark') {
        return {
          backgroundColor: colors.backgroundDark,
          color: colors.colorDark,
        };
      }
      return {};
    }
}

export default new Theme();
