		// Добавить в корзину
			$(document).on('click', '.js-buy', function(e){
				var vk_product_id = $(this).data('product_id');
				
				// Отправляем Event
					var eventParams = { 
						"products" : [{"id": vk_product_id}], // Рекомендуемые товары
					}; 
					VK.Retargeting.ProductEvent(price_list_id, 'add_to_cart', eventParams);
			});
		
		// Удалить из корзины
			$(document).on('click', '.js-cart_item-delete', function(e){
				var vk_product_id = $(this).data('product_id');
				alert(vk_product_id + 'fdsf');
				// Отправляем Event
					var eventParams = { 
						"products" : [{"id": vk_product_id}], // Рекомендуемые товары
					}; 
					VK.Retargeting.ProductEvent(price_list_id, 'remove_from_cart', eventParams);
			});
		
		// Начало оформления заказа
			$(document).on('click', '.js-cart-submit', function(e){
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
					VK.Retargeting.ProductEvent(price_list_id, 'init_checkout', eventParams);
			});
		
		// Совершение покупки (Добавляем в "Бэк-Оффис" -> "Настройки" -> "Счетчики и коды" -> "javascript-код для вывода на странице успешного оформления заказа")
			/*$('form#order_form').submit(function(event){
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
			});*/