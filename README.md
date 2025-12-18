# Prueba Técnica - Automatización con Playwright

Este proyecto contiene pruebas de automatización desarrolladas con Playwright y TypeScript, implementando el patrón Page Object Model (POM) para pruebas end-to-end y pruebas de integración con APIs.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Reportes](#reportes)
- [Pruebas Incluidas](#pruebas-incluidas)

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)
- **Git** (para clonar el repositorio)

## 📦 Instalación

1. **Clonar el repositorio** (o descargar el código fuente):
   ```bash
   git clone <url-del-repositorio>
   cd pruebaTecnicaFarmatodo
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Instalar los navegadores de Playwright**:
   ```bash
   npx playwright install
   ```

   O instalar solo Chromium:
   ```bash
   npx playwright install chromium
   ```

## ⚙️ Configuración

### Variables de Entorno

El proyecto utiliza un archivo `.env` para gestionar las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# API de Pokemon
BASE_URL_POKEMON=https://pokeapi.co/api/v2

# Sauce Demo - Credenciales y URL
BASE_URL_SAUCE=https://www.saucedemo.com/
SAUCEDEMO_USERNAME=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
```

**Nota:** El archivo `.env` está incluido en `.gitignore` por seguridad. No se debe versionar en el repositorio.

### Crear el archivo .env

Puedes crear el archivo manualmente o usar el siguiente comando:

```bash
# Windows (PowerShell)
echo BASE_URL_POKEMON=https://pokeapi.co/api/v2 > .env
echo BASE_URL_SAUCE=https://www.saucedemo.com/ >> .env
echo SAUCEDEMO_USERNAME=standard_user >> .env
echo SAUCEDEMO_PASSWORD=secret_sauce >> .env

# Linux/Mac
cat > .env << EOF
BASE_URL_POKEMON=https://pokeapi.co/api/v2
BASE_URL_SAUCE=https://www.saucedemo.com/
SAUCEDEMO_USERNAME=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
EOF
```

## 📁 Estructura del Proyecto

```
pruebaTecnicaFarmatodo/
├── common/                    # Utilidades comunes
│   └── TakeScreenshot.ts      # Clase para capturas de pantalla
├── pages/                     # Page Objects (POM)
│   ├── LoginPage.ts          # Página de login
│   ├── ProductsPage.ts       # Página de productos
│   ├── CartPage.ts           # Página del carrito
│   └── CheckoutPage.ts       # Página de checkout
├── ui/                        # Localizadores de elementos
│   ├── login.locators.ts
│   ├── products.locators.ts
│   ├── cart.locators.ts
│   └── checkout.locators.ts
├── scripts/                   # Scripts y utilidades
│   ├── ordenamiento.ts        # Algoritmo de ordenamiento
│   └── pokemon.ts             # Funciones para Pokemon
├── tests/                     # Pruebas
│   ├── pokemon-evolution.spec.ts    # Prueba de integración API
│   └── saucedemo-e2e.spec.ts       # Prueba E2E
├── test-results/              # Resultados de pruebas
│   ├── pokemon-reports/       # Reportes en texto
│   └── [carpetas por tipo]/   # Screenshots organizados
├── playwright-report/         # Reporte HTML de Playwright
├── playwright.config.ts       # Configuración de Playwright
├── package.json               # Dependencias y scripts
└── .env                       # Variables de entorno (no versionado)
```

## 🚀 Ejecución de Pruebas

### Ejecutar todas las pruebas

```bash
npm test
```

### Ejecutar pruebas específicas

**Prueba de integración (Pokemon API):**
```bash
npm test -- tests/pokemon-evolution.spec.ts
```

**Prueba E2E (Sauce Demo):**
```bash
npm test -- tests/saucedemo-e2e.spec.ts
```

### Modos de ejecución

**Modo con interfaz gráfica (headed):**
```bash
npm run test:headed
```

**Modo de depuración:**
```bash
npm run test:debug
```

**Modo con UI interactiva:**
```bash
npm run test:ui
```

### Ejecutar pruebas en modo headless

Por defecto, las pruebas se ejecutan con el navegador visible. Para ejecutar en modo headless, edita `playwright.config.ts` y cambia:

```typescript
headless: true
```

## 📊 Reportes

### Reporte HTML de Playwright

Después de ejecutar las pruebas, se genera un reporte HTML interactivo:

```bash
npx playwright show-report
```

El reporte se encuentra en: `playwright-report/index.html`

### Reportes de texto (Pokemon)

Cada ejecución de la prueba de Pokemon genera un archivo `.txt` con los resultados detallados en:

```
test-results/pokemon-reports/pokemon-evolution-result-[timestamp].txt
```

### Screenshots

Las capturas de pantalla se guardan automáticamente en:

```
test-results/
├── login/          # Screenshots de login
├── products/       # Screenshots de productos
├── cart/           # Screenshots del carrito
└── checkout/       # Screenshots de checkout
```

## 🧪 Pruebas Incluidas

### 1. Prueba de Integración: Cadena de Evoluciones de Pokemon

**Archivo:** `tests/pokemon-evolution.spec.ts`

**Descripción:**
- Obtiene la cadena de evoluciones del Pokemon Squirtle desde la API pública PokéApi
- Extrae los nombres y pesos de todas las especies en la cadena
- Ordena los resultados alfabéticamente sin usar métodos nativos como `.sort()`
- Valida que todas las APIs respondan con código 200
- Genera un reporte en formato `.txt` con los resultados

**Criterios de Aceptación:**
- ✅ Las APIs responden con código 200
- ✅ Se extraen correctamente los nombres de los Pokemon
- ✅ La lista se ordena alfabéticamente sin métodos nativos
- ✅ Se imprimen los nombres ordenados con sus pesos

### 2. Prueba E2E: Compra en Sauce Demo

**Archivo:** `tests/saucedemo-e2e.spec.ts`

**Descripción:**
- Realiza un flujo completo de compra en Sauce Demo
- Implementa el patrón Page Object Model (POM)
- Valida cada paso del proceso de compra
- Toma capturas de pantalla en cada paso

**Pasos de la prueba:**
1. Ingresar a la página de Sauce Demo
2. Realizar login con credenciales del `.env`
3. Localizar el producto "Sauce Labs Fleece Jacket"
4. Almacenar nombre y precio del producto
5. Añadir el producto al carrito
6. **Validar que nombre y precio coinciden en el carrito**
7. Completar el proceso de compra hasta la confirmación

## 🏗️ Patrón Page Object Model (POM)

El proyecto utiliza el patrón POM para mantener el código organizado y reutilizable:

- **Pages:** Contienen la lógica de interacción con cada página
- **UI Locators:** Centralizan los selectores de elementos
- **Common:** Utilidades compartidas (screenshots, helpers)

## 🔐 Seguridad

- El archivo `.env` contiene información sensible y **NO debe versionarse**
- Las credenciales se cargan desde variables de entorno
- El archivo `.gitignore` está configurado para excluir archivos sensibles

## 🐛 Solución de Problemas

### Error: "La URL base de la API de Pokémon no está configurada"

**Solución:** Verifica que el archivo `.env` existe y contiene `BASE_URL_POKEMON`

### Error: "No se pueden encontrar los navegadores"

**Solución:** Ejecuta `npx playwright install`

### Las pruebas fallan en CI/CD

**Solución:** Asegúrate de instalar las dependencias del sistema:
```bash
npx playwright install --with-deps
```

## 📝 Notas Adicionales

- Todas las funciones utilizan la convención `snake_case` (nombre_variable)
- Los screenshots se organizan automáticamente por tipo de página
- Los reportes de Pokemon se generan con timestamp para mantener historial
- El proyecto está configurado para ejecutarse en modo no-headless por defecto

## 👤 Autor

Desarrollado como parte de la prueba técnica para Ingeniero de Automatización.

## 📄 Licencia

ISC

