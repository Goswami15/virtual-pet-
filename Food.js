class Food {
  coonstructor() {
    this.foodStock = 0;
  }

  updateFoodStock(f) {
    this.foodStock = f;
  }

  garden() {
    background(garden, 550, 500);
  }

  bedroom() {
    background(bedroom, 550, 500);
  }

  washroom() {
    background(washroom, 550, 500);
  }
  display() {
    var x = 80,
      y = 100;
    if (this.foodStock != 0) {
      for (var i = 0; i < this.foodStock; i++) {
        if (i % 10 == 0) {
          x = 80;
          y = y + 50;
        }

        image(milkbottle_img, x, y, 50, 50);
        x = x + 30;
      }
    }
  }
}
