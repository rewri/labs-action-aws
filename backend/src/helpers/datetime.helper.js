module.exports = {

  fancyTimeFormat(duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    let fancyFormat = "";
    if (hours > 0) {
      fancyFormat += "" + hours + ":" + (minutes < 10 ? "0" : "");
    }
    fancyFormat += "" + minutes + ":" + (seconds < 10 ? "0" : "");
    fancyFormat += "" + seconds;
    return fancyFormat;
  },

}
