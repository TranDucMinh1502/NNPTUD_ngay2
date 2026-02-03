// Product constructor
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}

// Câu 2: Khởi tạo mảng products (ít nhất 6 sản phẩm, >= 2 danh mục)
const products = [
  new Product(1, "iPhone 14", 12000000, 5, "Electronics", true),
  new Product(2, "AirPods Pro", 5000000, 10, "Accessories", true),
  new Product(3, "Leather Jacket", 3500000, 0, "Clothing", false),
  new Product(4, "Samsung TV", 15000000, 2, "Electronics", true),
  new Product(5, "Charging Cable", 200000, 25, "Accessories", true),
  new Product(6, "Designer Bag", 45000000, 1, "Accessories", false),
];

console.log("--- Products (full) ---");
console.log(products);

// Câu 3: Tạo mảng mới chỉ chứa name, price của mỗi sản phẩm
const namePriceList = products.map((p) => ({ name: p.name, price: p.price }));
console.log("\n--- Câu 3: Name & Price ---");
console.log(namePriceList);

// Câu 4: Lọc ra các sản phẩm còn hàng trong kho (quantity > 0)
const inStock = products.filter((p) => p.quantity > 0);
console.log("\n--- Câu 4: In stock (quantity > 0) ---");
console.log(inStock);

// Câu 5: Kiểm tra có ít nhất một sản phẩm có giá trên 30.000.000 hay không
const hasExpensive = products.some((p) => p.price > 30000000);
console.log("\n--- Câu 5: Any product price > 30,000,000? ---");
console.log(hasExpensive);

// Câu 6: Kiểm tra xem tất cả sản phẩm thuộc danh mục "Accessories" có đang được bán không
const accessories = products.filter((p) => p.category === "Accessories");
const allAccessoriesAvailable = accessories.every(
  (p) => p.isAvailable === true,
);
console.log("\n--- Câu 6: All Accessories available? ---");
console.log("Accessories items:", accessories);
console.log("All available:", allAccessoriesAvailable);

// Câu 7: Tính tổng giá trị kho hàng (price * quantity)
const totalInventoryValue = products.reduce(
  (sum, p) => sum + p.price * p.quantity,
  0,
);
console.log("\n--- Câu 7: Total inventory value ---");
console.log(totalInventoryValue);

// Câu 8: Dùng for...of duyệt mảng products và in ra: Tên sản phẩm - Danh mục - Trạng thái
console.log("\n--- Câu 8: for...of list (Tên - Danh mục - Trạng thái) ---");
for (const p of products) {
  const status = p.isAvailable ? "Đang bán" : "Ngừng bán";
  console.log(`${p.name} - ${p.category} - ${status}`);
}

// Câu 9: Dùng for...in để in ra tên thuộc tính và giá trị tương ứng (cho mỗi sản phẩm)
console.log("\n--- Câu 9: for...in properties for each product ---");
for (const p of products) {
  console.log(`Properties of ${p.name}:`);
  for (const key in p) {
    if (Object.prototype.hasOwnProperty.call(p, key)) {
      console.log(`  ${key}: ${p[key]}`);
    }
  }
}

// Câu 10: Lấy danh sách tên các sản phẩm đang bán và còn hàng
const sellingAndInStockNames = products
  .filter((p) => p.isAvailable === true && p.quantity > 0)
  .map((p) => p.name);
console.log("\n--- Câu 10: Names of products sold and in stock ---");
console.log(sellingAndInStockNames);

// Export for tests or usage (optional)
module.exports = { Product, products };
