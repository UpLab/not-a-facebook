class Uploader {
  constructor() {
    this.apiUrl = 'https://api.imgur.com/3/image';
    this.clientId = process.env.IMGUR_CLIENT_ID;
  }

  async upload(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(this.apiUrl, {
      headers: {
        Authorization: `Client-ID ${this.clientId}`,
      },
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    return json.data.link;
  }
}

export default new Uploader();
