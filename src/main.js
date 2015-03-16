function main() {
  var themeToggle = document.querySelector("#theme-toggle");
  var calculator = document.querySelector("#calculator");

  themeToggle.addEventListener("click", function(_) {
    calculator.theme = calculator.theme == "dark" ? "light" : "dark";
  });
}