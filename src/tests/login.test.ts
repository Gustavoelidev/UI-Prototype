import { chromium, Browser, Page } from 'playwright';
import { expect, test } from '@playwright/test';

// Função de teste de privacidade (mantida a mesma lógica)
async function testeDePrivacidade(page: Page): Promise<void> {
  const loginUrl: string = 'teste_link';

  // Navega até a URL de login
  try {
    await page.goto(loginUrl, { waitUntil: 'load' }); // Espera até a página carregar
  } catch (error) {
    console.error('Erro ao acessar a página:', error);
  }

  // Aguarda os elementos estarem disponíveis e clica neles
  try {
    await page.click('#details-button');
    await page.click('#proceed-link');
  } catch (error: any) {
    console.error('Erro ao interagir com os elementos:', error.message);
    await page.screenshot({ path: 'erro-elementos.png' }); // Screenshot em caso de erro
    throw error;
  }
}

// Teste de login
test('Teste de login', async () => {
  const browser: Browser = await chromium.launch({
    headless: false, // Modo gráfico para visualização
    ignoreHTTPSErrors: true, // Ignora erros de SSL
  });
  const page: Page = await browser.newPage();

  try {
    // Executa a função de privacidade, passando o `page` como argumento
    await testeDePrivacidade(page);

    // Preenche o campo de usuário
    await page.waitForSelector('#user_name', { state: 'visible' });
    await page.fill('#user_name', 'ped');

    // Preenche o campo de senha
    await page.waitForSelector('#password', { state: 'visible' });
    await page.fill('#password', 'senha');

    // Clica nos checkboxes
    await page.click('#Privacy_policy');
    await page.click('#Use_terms');
    await page.click('#remember_user');

    // Verifica o título da página
    const titulo = await page.title();
    console.log('Título da página:', titulo);
    await expect(page).toHaveTitle('Login');

    // Adicione aqui mais ações ou verificações, se necessário

  } catch (error) {
    console.error('Erro durante o teste:', error);
    await page.screenshot({ path: 'erro-teste.png' }); // Screenshot em caso de erro
    throw error; // Lança o erro para falhar o teste
  } finally {
    // Fecha o navegador após o teste
    await browser.close();
  }
});