import { Page, expect } from '@playwright/test';
import { ProductsLocators } from '../ui/products.locators';
import { TakeScreenshot } from '../common/TakeScreenshot';

/**
 * Interfaz para almacenar información del producto
 */
export interface ProductInfo {
  name: string;
  price: string;
}

/**
 * Page Object Model para la página de Productos
 */
export class ProductsPage {
  private screenshot: TakeScreenshot;

  constructor(private page: Page) {
    this.screenshot = new TakeScreenshot(page, 'products');
  }

  /**
   * Verifica que la página de productos se cargó correctamente
   */
  async verificar_pagina_cargada(): Promise<void> {
    await expect(this.page.locator(ProductsLocators.title)).toBeVisible();
    await expect(this.page.locator(ProductsLocators.title)).toHaveText('Products');
  }

  /**
   * Busca un producto por nombre y retorna su información
   * @param productName Nombre del producto a buscar
   * @returns Información del producto (nombre y precio)
   */
  async obtener_informacion_producto(productName: string): Promise<ProductInfo> {
    // Buscar el producto por nombre
    const productItem = this.page.locator(ProductsLocators.product_item).filter({
      hasText: productName
    });

    // Extraer nombre y precio
    const name = await productItem.locator(ProductsLocators.product_name).textContent();
    const price = await productItem.locator(ProductsLocators.product_price).textContent();

    if (!name || !price) {
      throw new Error(`No se encontró el producto: ${productName}`);
    }

    await this.screenshot.takeScreenshot(`producto_${productName.replace(/\s+/g, '_')}`);

    return {
      name: name.trim(),
      price: price.trim()
    };
  }

  /**
   * Añade un producto al carrito por su nombre
   * @param productName Nombre del producto a añadir
   */
  async anadir_producto_al_carrito(productName: string): Promise<void> {
    const productItem = this.page.locator(ProductsLocators.product_item).filter({
      hasText: productName
    });

    const addButton = productItem.locator(ProductsLocators.add_to_cart_button);
    await addButton.click();
    await this.screenshot.takeScreenshot(`producto_anadido_${productName.replace(/\s+/g, '_')}`);
  }

  /**
   * Navega al carrito de compras
   */
  async ir_al_carrito(): Promise<void> {
    await this.page.click(ProductsLocators.cart_link);
    await this.screenshot.takeScreenshot('ir_al_carrito');
  }

  /**
   * Verifica que el badge del carrito muestra la cantidad de productos
   * @param expectedCount Cantidad esperada
   */
  async verificar_badge_carrito(expectedCount: number): Promise<void> {
    await expect(this.page.locator(ProductsLocators.cart_badge)).toHaveText(expectedCount.toString());
  }
}

