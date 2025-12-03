document.addEventListener('DOMContentLoaded', function() {
      console.log("Product Details Script Running...");

      // 1. Get Product ID from URL (e.g., product-details.html?id=carrot)
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');

      // 2. Product Database
      const products = {
        'butterhead-lettuce': { name: 'Butterhead Lettuce', price: '₱25.00', category: 'Vegetable', img: 'assets/img/product/butterhead-lettuce.png', desc: 'Soft, buttery leaves perfect for salads and sandwiches. Grown organically in cool climates.' },
        'carrot': { name: 'Carrot', price: '₱15.00', category: 'Vegetable', img: 'assets/img/product/carrot.png', desc: 'Crunchy, orange root vegetable rich in Vitamin A and Beta-carotene. Perfect for snacking or cooking.' },
        'cauliflower': { name: 'Cauliflower', price: '₱65.00', category: 'Vegetable', img: 'assets/img/product/cauliflower.png', desc: 'Versatile white flower vegetable. Great for stir-fry, steaming, or as a low-carb rice alternative.' },
        'celery': { name: 'Celery', price: '₱16.00', category: 'Vegetable', img: 'assets/img/product/celery.png', desc: 'Crisp stalks excellent for soups, salads, and healthy snacks. High in fiber and water content.' },
        'chili': { name: 'Red Chili', price: '₱5.00', category: 'Spice', img: 'assets/img/product/chili.png', desc: 'Spicy red peppers to add heat to your favorite dishes. Handle with care!' },
        'cucumber': { name: 'Cucumber', price: '₱20.00', category: 'Vegetable', img: 'assets/img/product/cucumber.png', desc: 'Cool and refreshing, composed mostly of water. Great for hydration and salads.' },
        'eggplant': { name: 'Eggplant', price: '₱15.00', category: 'Vegetable', img: 'assets/img/product/eggplant.png', desc: 'Purple, spongy, absorbent fruit used in various cuisines. Excellent when grilled or fried.' },
        'bitter-gourd': { name: 'Bitter Gourd', price: '₱15.00', category: 'Vegetable', img: 'assets/img/product/fresh-bitter-gourd.png', desc: 'Also known as Ampalaya, famous for its bitter flavor and significant health benefits.' },
        'garlic': { name: 'Garlic', price: '₱5.00', category: 'Spice', img: 'assets/img/product/garlic.png', desc: 'Aromatic bulb widely used as a seasoning worldwide. Essential for almost every dish.' },
        'ginger': { name: 'Ginger', price: '₱5.00', category: 'Spice', img: 'assets/img/product/ginger.png', desc: 'Zesty spice used in cooking and traditional medicine. Great for tea and marinades.' },
        'green-chili-peppers': { name: 'Green Chili Peppers', price: '₱5.00', category: 'Spice', img: 'assets/img/product/green chili peppers.png', desc: 'Medium-sized chili pepper pod. Adds a moderate kick to nachos and salsas.' },
        'green-beans': { name: 'Green Beans', price: '₱15.00', category: 'Vegetable', img: 'assets/img/product/green beans.png', desc: 'Fresh, unripe fruit of various cultivars of common bean. Crisp and sweet.' },
        'green-lettuce': { name: 'Green Lettuce', price: '₱16.00', category: 'Vegetable', img: 'assets/img/product/green lettuce.png', desc: 'Fresh green leaves essential for a basic salad. Crunchy and refreshing.' },
        'jalapeno': { name: 'Jalapeno', price: '₱5.00', category: 'Spice', img: 'assets/img/product/jalapeno.png', desc: 'Medium-sized chili pepper pod. Adds a moderate kick to nachos and salsas.' },
        'kale': { name: 'Kale', price: '₱20.00', category: 'Vegetable', img: 'assets/img/product/Kale.png', desc: 'Nutrient-dense green leafy vegetable. A superfood perfect for smoothies and chips.' },
        'okra': { name: 'Okra', price: '₱12.00', category: 'Vegetable', img: 'assets/img/product/okra.png', desc: 'Flowering plant valued for its edible green seed pods. Great for thickening soups.' },
        'onion': { name: 'Onion', price: '₱5.00', category: 'Spice', img: 'assets/img/product/onion.png', desc: 'Round vegetable with layers, pungent smell and taste. The base of most savory cooking.' },
        'potato': { name: 'Potato', price: '₱20.00', category: 'Vegetable', img: 'assets/img/product/potato.png', desc: 'Starchy tuber of the plant Solanum tuberosum. Versatile for frying, baking, or boiling.' },
        'romaine': { name: 'Romaine Lettuce', price: '₱16.00', category: 'Vegetable', img: 'assets/img/product/romaine cos lettuce.png', desc: 'Variety of lettuce that grows in a tall head of sturdy dark green leaves. Ideal for Caesar salads.' },
        'tomato': { name: 'Tomato', price: '₱6.00', category: 'Vegetable', img: 'assets/img/product/tomato.png', desc: 'Edible berry of the plant Solanum lycopersicum. Juicy, acidic, and sweet.' },
        // Fruits
        'apple': { name: 'Red Apple', price: '₱16.00', category: 'Fruit', img: 'assets/img/product/apple.png', desc: 'Sweet, crisp, red fruit suitable for snacking. An apple a day keeps the doctor away.' },
        'banana': { name: 'Banana', price: '₱25.00', category: 'Fruit', img: 'assets/img/product/banana.png', desc: 'Elongated, edible fruit produced by several kinds of large herbaceous flowering plants. Energy booster.' },
        'blueberries': { name: 'Blueberries', price: '₱12.00', category: 'Fruit', img: 'assets/img/product/blueberries.png', desc: 'Perennial flowering plants with blue or purple berries. High in antioxidants.' },
        'kiwi': { name: 'Kiwi', price: '₱12.00', category: 'Fruit', img: 'assets/img/product/kiwi.png', desc: 'Edible berry with fuzzy skin and green flesh. Tart and sweet flavor.' },
        'mandarin': { name: 'Mandarin', price: '₱15.00', category: 'Fruit', img: 'assets/img/product/mandarin.png', desc: 'Small citrus tree fruit. Easier to peel than oranges and very sweet.' },
        'papaya': { name: 'Papaya', price: '₱18.00', category: 'Fruit', img: 'assets/img/product/papaya.png', desc: 'Tropical fruit shaped like an elongated melon, with edible orange flesh and small black seeds.' },
        'watermelon': { name: 'Watermelon', price: '₱30.00', category: 'Fruit', img: 'assets/img/product/watermelon.png', desc: 'Large fruit with a hard green rind and sweet watery reddish pulp. Perfect for summer.' },
        'raspberry': { name: 'Raspberry', price: '₱10.00', category: 'Fruit', img: 'assets/img/product/raspberry.png', desc: 'Edible fruit of a multitude of plant species in the rose family. Delicate and sweet-tart.' },
        'rambutan': { name: 'Rambutan', price: '₱20.00', category: 'Fruit', img: 'assets/img/product/rambutan.png', desc: 'Tropical tree in the family Sapindaceae. The fruit is a round to oval single-seeded drupe with hairy skin.' },
        'passion-fruits': { name: 'Passion Fruit', price: '₱5.00', category: 'Fruit', img: 'assets/img/product/passion-fruits.png', desc: 'Cultivated commercially for its sweet, seedy fruit. Highly aromatic.' },
        'mangosteen': { name: 'Mangosteen', price: '₱15.00', category: 'Fruit', img: 'assets/img/product/mangosteen.png', desc: 'Tropical evergreen tree with edible fruit. Known as the queen of fruits.' },
        'guava': { name: 'Guava', price: '₱5.00', category: 'Fruit', img: 'assets/img/product/guava.png', desc: 'Common tropical fruit. Rich in Vitamin C and dietary fiber.' },
        'custard-apple': { name: 'Custard Apple', price: '₱65.00', category: 'Fruit', img: 'assets/img/product/custard-apple.png', desc: 'Common name for a fruit of a tree of the genus Annona. Creamy and sweet texture.' },
        'coconut': { name: 'Coconut', price: '₱10.00', category: 'Fruit', img: 'assets/img/product/coconut.png', desc: 'Member of the palm tree family. Provides water, milk, and meat.' },
        'cantaloupe': { name: 'Cantaloupe', price: '₱16.00', category: 'Fruit', img: 'assets/img/product/cantaloupe.png', desc: 'Variety of the Cucumis melo species. Sweet, orange flesh.' },
        'black-currant': { name: 'Black Currant', price: '₱8.00', category: 'Fruit', img: 'assets/img/product/black-currant.png', desc: 'Woody shrub in the family Grossulariaceae grown for its berries. Tart flavor.' }
      };

      // 3. Find Product
      const product = products[productId];

      // 4. Update UI
      if (product) {
        document.getElementById('detail-title').innerText = product.name;
        document.getElementById('breadcrumb-name').innerText = product.name;
        document.getElementById('detail-price').innerText = product.price;
        document.getElementById('detail-category').innerText = product.category;
        document.getElementById('detail-desc').innerText = product.desc;
        document.getElementById('detail-img').src = product.img;
      } else {
        document.querySelector('.details-content').innerHTML = `
          <h2 class="text-danger">Product Not Found</h2>
          <p>We couldn't find the product you're looking for.</p>
          <a href="product.html" class="btn btn-primary mt-3">Return to Shop</a>
        `;
      }

    });