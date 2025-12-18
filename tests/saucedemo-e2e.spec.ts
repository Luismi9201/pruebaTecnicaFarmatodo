import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage, ProductInfo } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../.env') });

test('Prueba E2E: Compra de Sauce Labs Fleece Jacket', async ({ page }) => {
  // Obtener credenciales desde variables de entorno
  const username = process.env.SAUCEDEMO_USERNAME || '';
  const password = process.env.SAUCEDEMO_PASSWORD || '';
  const product_name = 'Sauce Labs Fleece Jacket';

  // Inicializar Page Objects
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Ingresar a la página
  await loginPage.goto();

  // Realizar login
  await loginPage.iniciar_sesion(username, password);
  await loginPage.verificar_login_exitoso();

  // Verificar que se cargó la página de productos
  await productsPage.verificar_pagina_cargada();

  // Localizar el producto y almacenar su información
  const product_info: ProductInfo = await productsPage.obtener_informacion_producto(product_name);
  console.log(`Producto encontrado: ${product_info.name} - Precio: ${product_info.price}`);

  // Añadir el producto al carrito
  await productsPage.anadir_producto_al_carrito(product_name);
  await productsPage.verificar_badge_carrito(1);

  //  Ir al carrito
  await productsPage.ir_al_carrito();
  await cartPage.verificar_pagina_cargada();

  // Validar que el nombre y precio coinciden
  await cartPage.validar_informacion_producto(product_info);

  // Proceder al checkout
  await cartPage.proceder_al_checkout();
  await checkoutPage.verificar_pagina_info_checkout();

  //  Completar información del checkout
  await checkoutPage.completar_informacion_checkout('Luis', 'prueba', '12345');
  await checkoutPage.continuar_al_resumen();
  await checkoutPage.verificar_pagina_resumen();

  // Finalizar la compra
  await checkoutPage.finalizar_compra();

  //  Verificar confirmación de la orden
  await checkoutPage.verificar_orden_completada();
});

