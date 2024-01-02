// Initialize an empty products array to store added products
let productsData = [];

// Function to handle adding another product
function addProductItem() {
  const productItems = document.getElementById("product-items");

  // Create elements for new product input fields
  const newProductLabel = document.createElement("label");
  newProductLabel.setAttribute("for", "product");
  newProductLabel.textContent = "Product:";

  const newProductSelect = document.createElement("select");
  newProductSelect.setAttribute("name", "product");
  newProductSelect.setAttribute("id", "product");
  newProductSelect.setAttribute("required", "true");

  productsData.forEach(function (product) {
    const option = document.createElement("option");
    option.value = product._id;
    option.textContent = product.name;
    newProductSelect.appendChild(option);
  });

  const newQuantityLabel = document.createElement("label");
  newQuantityLabel.setAttribute("for", "quantity");
  newQuantityLabel.textContent = "Quantity:";

  const newQuantityInput = document.createElement("input");
  newQuantityInput.setAttribute("type", "number");
  newQuantityInput.setAttribute("name", "quantity");
  newQuantityInput.setAttribute("id", "quantity");
  newQuantityInput.setAttribute("min", "1");
  newQuantityInput.setAttribute("required", "true");

  // Append the new product elements to the product-items div
  productItems.appendChild(newProductLabel);
  productItems.appendChild(newProductSelect);
  productItems.appendChild(newQuantityLabel);
  productItems.appendChild(newQuantityInput);
}
