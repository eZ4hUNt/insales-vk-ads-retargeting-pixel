# Установка и настройка пикселя ретаргетинга ВКонтакте
![Установка и настройка пикселя ретаргетинга ВКонтакте](https://github.com/eZ4hUNt/insales-vk-ads-retargeting-pixel/blob/master/preview.jpg)
Заметка по установки и настройки пикселя ретаргетинга ВКонтакте. В даной реализации события передают минимальную информацию (название товара и сопутсвующие товары)

**Реализованы следующие пункты:**
* Просмотр главной страницы	
* Просмотр страницы товара	
* Просмотр страницы категории	
* Просмотр страницы поиска	
* Просмотр другой страницы
* Добавление в корзину	
* Удаление из корзины	
* Начало оформления покупки
* Совершение покупки	
	
**Не реализовано**
+ Добавление в список желаний
+ Удаление из списка желаний
+ Добавление платёжной информации

## Процесс установки и настройки
1. Получить **PIXEL_ID** и **price_list_id**
```
	VK-XXXX-XXXXXX-XXXXX - PIXEL_ID (Буквы и цифры)
	XXXX - price_list_id (Цифры)
```
2. Подключаем в head (можно подключать в тело сайта)
```
	{% comment %}
	  Пиксель VK
	{% endcomment %}
	<script>
	  window.vkAsyncInit = function() {
		VK.Retargeting.Init('VK-XXXX-XXXXXX-XXXXX'); // Указываем "PIXEL_ID"
	  }
	  var price_list_id = 'XXXX'; // Указываем "price_list_id"
	</script>
	<script src="//vk.com/js/api/openapi.js?150" async></script>
```
3. Подключаем **vk_retargeting.liquid** и **vk_retargeting.js** (уже подключен в файле **"vk_retargeting.liquid"**)
4. Добавляем в *"Бэк-Оффис" -> "Настройки" -> "Счетчики и коды" -> "javascript-код для вывода на странице успешного оформления заказа"*
```
	<script>
		// Совершение покупки
			var vk_product_arr = [];
			$.getJSON('/cart_items.json', function(data) {
				$.each(data.order_lines, function(key, val) {
					vk_product_arr.push({id: val.product_id});
				});
			});				

			// Отправляем Event
				var eventParams = { 
					"products" : vk_product_arr, // Товары в корзине
				}; 
				VK.Retargeting.ProductEvent(price_list_id, 'purchase', eventParams);
	</script>
```
## Документация и примеры
GitHub мануала: https://github.com/eZ4hUNt/insales-vk-ads-retargeting-pixel/

Документация: https://vk.com/ads?act=office_help&id=-19542789_53963210

Пример: https://vkcom.github.io/vk-ads-retargeting-demo/index.html

Проверка работы и создание ID: https://vk.com/ads?act=retargeting

Сайт, на котором установлен пиксель: http://www.mamapapaproduction.ru
