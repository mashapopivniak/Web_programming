const { src, dest, series } = require("gulp");
// Обробляємо html файли
function html() {
return src("app/**/*.html") // Беремо файли з розширенням html із папки app/ та усіх підпапок
.pipe(dest("build/")); // Переміщуємо у папку build/
}
// Обробляємо файли зображень
function img() {
return src("app/img/*.{png,jpg,jpeg,gif}", // Беремо файли з розширеннями png, jpg, jpeg, gif
{ base: "app" }) // Задаємо параметр base, щоб зберегти вложеність файлів
.pipe(dest("build/")); // Переміщуємо у папку build/
}
// Збирання проекту
exports.build = series(html, img);