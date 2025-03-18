import { chromium, Browser, Page } from '@playwright/test';
import { test, expect } from '@playwright/test'; // Importe o `test` e o `expect`
import { LoginPage } from '@pages/LoginPage';

// Configuração global para compartilhar o browser entre os testes
let browser: Browser;
let page: Page;
let loginPage: LoginPage;

test.beforeAll(async () => {
  // Inicia o navegador antes de todos os testes
  browser = await chromium.launch({
    headless: false, // Modo gráfico para visualização
    ignoreHTTPSErrors: true, // Ignora erros de SSL
    channel: 'msedge',
  });
  page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Inicializa a página de login
  loginPage = new LoginPage(page);
});

test.afterAll(async () => {
  // Fecha o navegador após todos os testes
  await browser.close();
});

// Teste de login
test('Login Test', async () => {
  test.setTimeout(120000);
  try {
    // Navega até a URL de login e lida com a tela de privacidade
    await loginPage.navigateToLogin('link');
    await loginPage.handlePrivacyScreen();
    await page.screenshot({ path: 'screenshots/Login.png' });

    // Preenche os campos de usuário e senha
    await loginPage.fillUsername('ped');
    await loginPage.fillPassword('Admin@1234');

    // Verifica e clica nos checkboxes
    await loginPage.handleCheckboxes();

    // Clica no botão de login
    await loginPage.clickLoginButton();

    // Verifica o título da página
    await loginPage.verifyPageTitle('Login');

    // Verifica o elemento "System Logs" e tira screenshots
    await loginPage.verifySystemLogs();

    // Finaliza o teste
    console.log('Teste concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o teste:', error);
    await page.screenshot({ path: 'screenshots/erro-teste.png' }); // Screenshot em caso de erro
    throw error; // Lança o erro para falhar o teste
  }
});