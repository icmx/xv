class Comic {
  constructor({
    month,
    num,
    link,
    year,
    news,
    safe_title,
    transcript,
    alt,
    img,
    title,
    day,
  }) {
    this.month = month;
    this.num = num;
    this.link = link;
    this.year = year;
    this.news = news;
    this.safe_title = safe_title;
    this.transcript = transcript;
    this.alt = alt;
    this.img = img;
    this.title = title;
    this.day = day;
  }

  static fromRaw(raw) {
    return new Comic(raw);
  }
}

export default Comic;
