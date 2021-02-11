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

  get head() {
    return 'head';
  }

  get lead() {
    return 'lead';
  }

  get date() {
    return 'date';
  }

  get href() {
    return `//xkcd.com/${this.num}`;
  }

  get body() {
    return 'body';
  }

  static fromRaw(raw) {
    return new Comic(raw);
  }
}

export default Comic;
