import { chromium, Browser, Page } from '@playwright/test';
import { test, expect } from '@playwright/test'; // Importe o `test` e o `expect`
import { DashboardPage } from '@pages/DashboardPage'; // Importe a classe correta

// Configuração global para compartilhar o browser entre os testes
let browser: Browser;
let page: Page;
let dashboardPage: DashboardPage; // Renomeie a variável para refletir o uso do DashboardPage

test.beforeAll(async () => {
  // Inicia o navegador antes de todos os testes
  browser = await chromium.launch({
    headless: false, // Modo gráfico para visualização
    channel: 'msedge', // Usa o Microsoft Edge
  });
  page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Inicializa a página do dashboard
  dashboardPage = new DashboardPage(page); // Inicializa o DashboardPage
});

test.afterAll(async () => {
  // Fecha o navegador após todos os testes
  await browser.close();
});

test('Testar funcionalidades do dashboard', async () => {
    test.setTimeout(120000);
    await dashboardPage.handlePrivacyScreen();

    await dashboardPage.login('ped', 'Admin@1234');

    await dashboardPage.iconUser();
    await page.waitForTimeout(2000);

    await dashboardPage.iconSave();
    await page.waitForTimeout(2000);

    await dashboardPage.iconExit();
    await page.waitForTimeout(2000);

    await dashboardPage.dashboard();
    await page.waitForTimeout(2000);

    await dashboardPage.copyrightText();

  });