import { Page, expect } from '@playwright/test';
import { CartLocators } from '../ui/cart.locators';
import { TakeScreenshot } from '../common/TakeScreenshot';
import { ProductInfo } from './ProductsPage';

/**
 * Page Object Model para la página del Carrito
 */
export class CartPage {
  private screenshot: TakeScreenshot;

  constructor(private page: Page) {
    this.screenshot = new TakeScreenshot(page, 'cart');
  }

  /**
   * Verifica que la página del carrito se cargó correctamente
   */
  async verificar_pagina_cargada(): Promise<void> {
    await expect(this.page.locator(CartLocators.title)).toBeVisible();
    await expect(this.page.locator(CartLocators.title)).toHaveText('Your Cart');
  }

  /**
   * Obtiene la información del producto en el carrito
   * @param productName Nombre del producto
   * @returns Información del producto (nombre y precio)
   */
  async obtener_informacion_producto_en_carrito(productName: string): Promise<ProductInfo> {
    const cartItem = this.page.locator(CartLocators.cart_item).filter({
      hasText: productName
    });

    const name = await cartItem.locator(CartLocators.item_name).textContent();
    const price = await cartItem.locator(CartLocators.item_price).textContent();

    if (!name || !price) {
      throw new Error(`No se encontró el producto en el carrito: ${productName}`);
    }

    await this.screenshot.takeScreenshot(`producto_en_carrito_${productName.replace(/\s+/g, '_')}`);

    return {
      name: name.trim(),
      price: price.trim()
    };
  }

  /**
   * Valida que el nombre y precio del producto coinciden con los valores esperados
   * @param expectedInfo Información esperada del producto
   */
  async validar_informacion_producto(expectedInfo: ProductInfo): Promise<void> {
    const actualInfo = await this.obtener_informacion_producto_en_carrito(expectedInfo.name);

    expect(actualInfo.name).toBe(expectedInfo.name);
    expect(actualInfo.price).toBe(expectedInfo.price);

    await this.screenshot.takeScreenshot('validacion_producto_carrito');
  }

  /**
   * Procede al checkout
   */
  async proceder_al_checkout(): Promise<void> {
    await this.page.click(CartLocators.checkout_button);
  }
}

