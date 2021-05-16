// Необхідні змінні
let index = 0;
let news;

// Обробка бокового меню
function click_on_menu (object) {

   // Видаляємо клас "active" з усіх елементів меню
   $("li.nav-item").removeClass("active");

   // Отримуємо елемент, на який натиснули
   let item = $(object);

   // Задаємо активному елементу клас "active"
   item.addClass("active");

   // Отримуємо id активного елемента
   let id = item.attr('id');

   // Виконуємо необхідну дію
   switch (id) {

      // Перехід на головну сторінку
      case "menu_home": 
         setTimeout(() => {
            document.location.href = "../index.html";
         }, 500);
      break;

      // Відобразити список новин
      case "menu_news":
         $("#div_task").attr("hidden", "");
         $("#div_news").removeAttr("hidden");   
      break;

      // Відобразити завдання
      case "menu_task":
         $("#div_task").removeAttr("hidden");
         $("#div_news").attr("hidden", "");   
      break;
   }
}

// Обробка вибору новини
function click_on_news (object) {

   let element;

   if (object === -1)
      { element = news[Math.floor(Math.random() * news.length)]; }
   else
      { element = $(object).attr("data"); }
   
   $.get(`../data/text/${element}.txt`, (data) => {

      let item_data = data.split("\n");

      let block =
        `<div class="modal-header border-secondary">
            <div class="d-flex flex-column ms-3">
               <h3 class="m-0">${item_data[0]}</h3>
            </div>
            <button type="button" class="btn-close bg-primary me-3" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         
         <div class="modal-body">
            <img src="../data/img/${item_data[1]}.jpg" class="w-100" alt="news">
         </div>
         
         <div class="modal-footer border-secondary">
            <h5>${item_data[2]}</h5>
         </div>`;

      $("#modal_content").html(block);
      $('#modal').modal('show');
      
   });
}

// Підвантаження нових даних
function load_more_news(n) {
    let a = 0;
    for (; a < n; ) {
        if (index >= news.length)
            return void disable_load_button();
        $.get(`../data/text/${news[index]}.txt`, (n=>{
            let a = n.split("\n")
              , t = `<div class="col-md-6 col-lg-4">\n               
              <div class="p-2 painting" onclick="click_on_news(this)" data="${a[2]}">\n                  
              <img src="../data/img/${a[2]}.jpg" class="w-100" alt="news">\n                  
              <div class="bg-primary text-center">${a[0]}</div>\n               
              </div>\n            
              </div>`;
            $("#news").append(t)
        }
        )),
        a++,
        index++
    }
}

// Вимкнення кнопки "показати більше новин"
function disable_load_button() {
   $("#load").addClass("disabled");
}

// Реагуємо на закривання модального вікна
$("#modal").on("hidden.bs.modal", () => {
   $("li.nav-item").removeClass("active");
   $("#menu_news").addClass("active");
   $("#div_task").attr("hidden", "");
   $("#div_news").removeAttr("hidden");
});

// Завантаження початкових даних
$(document).ready(() => {    
   setTimeout(() => {
      $.get("../data/data.txt", (data) => {
         news = data.split("\n");
         news.splice(news.length - 1, 1);
         load_more_news(8);
      });
   }, 300);
});