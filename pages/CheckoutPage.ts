import { Page, expect } from '@playwright/test';
import { CheckoutLocators } from '../ui/checkout.locators';
import { TakeScreenshot } from '../common/TakeScreenshot';

/**
 * Page Object Model para la página de Checkout
 */
export class CheckoutPage {
  private screenshot: TakeScreenshot;

  constructor(private page: Page) {
    this.screenshot = new TakeScreenshot(page, 'checkout');
  }

  /**
   * Verifica que la página de información del checkout se cargó
   */
  async verificar_pagina_info_checkout(): Promise<void> {
    await expect(this.page.locator(CheckoutLocators.first_name_input)).toBeVisible();
    await this.screenshot.takeScreenshot('pagina_checkout_info');
  }

  /**
   * Completa la información del cliente
   * @param firstName Nombre
   * @param lastName Apellido
   * @param postalCode Código postal
   */
  async completar_informacion_checkout(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill(CheckoutLocators.first_name_input, firstName);
    await this.page.fill(CheckoutLocators.last_name_input, lastName);
    await this.page.fill(CheckoutLocators.postal_code_input, postalCode);
    await this.screenshot.takeScreenshot('informacion_checkout_completada');
  }

  /**
   * Continúa al resumen del checkout
   */
  async continuar_al_resumen(): Promise<void> {
    await this.page.click(CheckoutLocators.continue_button);
    
  }

  /**
   * Verifica que la página de resumen se cargó
   */
  async verificar_pagina_resumen(): Promise<void> {
    await expect(this.page.locator(CheckoutLocators.summary_info)).toBeVisible();
    await this.screenshot.takeScreenshot('pagina_resumen');
  }

  /**
   * Completa la compra
   */
  async finalizar_compra(): Promise<void> {
    await this.page.click(CheckoutLocators.finish_button);
    await this.screenshot.takeScreenshot('finalizar_compra');
  }

  /**
   * Verifica que la orden fue completada exitosamente
   */
  async verificar_orden_completada(): Promise<void> {
    await expect(this.page.locator(CheckoutLocators.complete_header)).toBeVisible();
    await expect(this.page.locator(CheckoutLocators.complete_header)).toHaveText('Thank you for your order!');
   
  }
}

