import { Page, test } from '@playwright/test';

/**
 * Clase que proporciona funcionalidad para tomar capturas de pantalla
 * Puede ser utilizada por cualquier clase que requiera esta funcionalidad
 */
export class TakeScreenshot {
    private screenshotCounter: number = 1;
    private readonly screenshotsSubDir: string;

    /**
     * Constructor de la clase TakeScreenshot
     * @param page Instancia de la página de Playwright
     * @param screenshotsSubDir Subdirectorio para guardar las capturas (default: 'common')
     */
    constructor(private page: Page, screenshotsSubDir: string = 'common') {
        this.screenshotsSubDir = screenshotsSubDir;
    }

    /**
     * Toma una captura de pantalla y la guarda con prefijo numérico
     * @param name Nombre descriptivo para la captura
     */
    public async takeScreenshot(name: string): Promise<void> {
        try {
            const timestamp = new Date().getTime();
            const fileName = `${String(this.screenshotCounter).padStart(2, '0')}_${name}_${timestamp}`;
            
            // Esperamos un momento para que la UI se estabilice
            await this.page.waitForTimeout(500);
            
            // Tomamos la captura de pantalla usando Playwright con ruta automática
            await this.page.screenshot({ 
                path: `test-results/${this.screenshotsSubDir}/${fileName}.png`,
                type: 'png',
                fullPage: true
            });
            
            // Adjuntar al informe de Playwright si está disponible
            await this.attachToPlaywrightReport(name);
            
 //           console.log(`✅ Screenshot guardado: ${fileName}.png`);
            this.screenshotCounter++;

        } catch (error) {
            console.error(`❌ Error al tomar screenshot:`, error);
        }
    }
    
    /**
     * Adjunta una captura al informe de Playwright
     * @param name Nombre descriptivo de la captura
     */
    private async attachToPlaywrightReport(name: string): Promise<void> {
        try {
            // Intentar obtener el contexto del test actual
            const testInfo = (test as any).info?.();
            if (testInfo) {
                // Tomamos una captura adicional para adjuntar al reporte
                const screenshot = await this.page.screenshot({ type: 'png' });
                
                // Adjuntamos directamente el buffer de la imagen
                testInfo.attachments.push({
                    name: `${name}`,
                    contentType: 'image/png',
                    body: screenshot
                });
            }
        } catch (attachError: unknown) {
            // Silenciosamente ignorar errores de adjuntar al reporte
            // No es crítico si no se puede adjuntar
        }
    }

    /**
     * Reinicia el contador de capturas
     */
    public resetCounter(): void {
        this.screenshotCounter = 1;
    }

    /**
     * Establece el contador de capturas a un valor específico
     * @param value Nuevo valor para el contador
     */
    public setCounter(value: number): void {
        if (value > 0) {
            this.screenshotCounter = value;
        }
    }
}
