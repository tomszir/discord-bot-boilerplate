const rgbHex = require('rgb-hex');
const { getColorFromURL } = require('color-thief-node');

class Util {
  async getPrimaryColorOfImageFromUrl(url) {
    const primaryRGBColor = await getColorFromURL(url);
    const primaryColor = rgbHex(...primaryRGBColor);

    return primaryColor;
  }
}

module.exports = Util;
