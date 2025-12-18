import { Page, expect } from '@playwright/test';
import { LoginLocators } from '../ui/login.locators';
import { TakeScreenshot } from '../common/TakeScreenshot';

/**
 * Page Object Model para la página de Login
 */
export class LoginPage {
  private screenshot: TakeScreenshot;
  private readonly base_url: string;

  constructor(private page: Page) {
    this.screenshot = new TakeScreenshot(page, 'login');
    this.base_url = process.env.BASE_URL_SAUCE || '';
  }

  /**
   * Navega a la página de login
   */
  async goto(): Promise<void> {
    await this.page.goto(this.base_url);
    await this.screenshot.takeScreenshot('pagina_login');
  }

  /**
   * Realiza el login con usuario y contraseña
   * @param username Nombre de usuario
   * @param password Contraseña
   */
  async iniciar_sesion(username: string, password: string): Promise<void> {
    await this.page.fill(LoginLocators.username_input, username);
    await this.page.fill(LoginLocators.password_input, password);
    await this.page.click(LoginLocators.login_button);
    await this.screenshot.takeScreenshot('click_login');
  }

  /**
   * Verifica que el login fue exitoso
   */
  async verificar_login_exitoso(): Promise<void> {
    await expect(this.page.locator(LoginLocators.error_message)).not.toBeVisible();
  }

  /**
   * Verifica que se muestra un mensaje de error
   */
  async verificar_mensaje_error(): Promise<void> {
    await expect(this.page.locator(LoginLocators.error_message)).toBeVisible();
  }
}

