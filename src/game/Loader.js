class AssetLoader {
  constructor() {
    this.assets = {};
  }

  register(key, path) {
    this.assets[key] = { path };
  }

  startLoading() {
    return Promise.all(
      Object.entries(this.assets).map(([key, { path }]) =>
        this.loadAsset(key, path)
      )
    );
  }

  get(key) {
    return this.assets[key].asset;
  }

  loadAsset(key, path) {
    return new Promise(resolve => {
      const image = new Image();
      image.src = path;
      image.onload = () => {
        this.assets[key].asset = image;

        resolve();
      };
    });
  }
}

export default AssetLoader;
