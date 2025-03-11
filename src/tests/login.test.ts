import { test, expect, chromium } from '@playwright/test';

test('Testar login com dados válidos', async () => {
  // Lançar o navegador com a opção de ignorar erros SSL
  const browser = await chromium.launch({
    headless: false, // Modo gráfico para visualização
    ignoreHTTPSErrors: true, // Ignora erros de SSL
  });
  const page = await browser.newPage();

  // Acesse a página de login
  const loginUrl = 'link_web';
  try {
    await page.goto(loginUrl, { waitUntil: 'load' }); // Espera até a página carregar
  } catch (error) {
    console.error('Erro ao acessar a página:', error);
  }

  // Tirar uma captura de tela da página de login (antes de preencher os campos)
  await page.screenshot({ path: 'login_page_before.png' });

  // Localize os campos de entrada e preencha os dados de login
  await page.click('#details-button');
  await page.click('#proceed-link');
  page.setDefaultTimeout(20000); // 10 segundos
  // Espera os campos de login estarem visíveis antes de preencher
  await page.waitForSelector('#user_name');
  await page.fill('#user_name', 'ped');
  await page.fill('#password', 'senha');
  page.setDefaultTimeout(20000); // 10 segundos
  // Clique nos checkboxes
  await page.click('#Privacy_policy');
  await page.click('#Use_terms');
  await page.click('#remember_user');

  // Clique no botão de login
  await page.click('#login_button');
  // Aguarde a página carregar após o login (ou o redirecionamento)
  await page.waitForNavigation({ waitUntil: 'load' });
  page.setDefaultTimeout(30000); // 10 segundos
  // Tirar uma captura de tela após o login para ver o estado da página
  await page.screenshot({ path: 'login_page_after.png' });

  // Verifique se o login foi bem-sucedido e se a URL contém o identificador de sessão
  const currentUrl = page.url();
  console.log('URL após o login:', currentUrl); // Para depuração
  await expect(currentUrl).toContain('sessionid'); // Verifica se contém 'sessionid' na URL

  // Feche o navegador
  await browser.close();
});
