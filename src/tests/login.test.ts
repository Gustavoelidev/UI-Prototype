import { chromium, Browser, Page,  } from 'playwright';
import { expect, test } from '@playwright/test';

// Função de teste de privacidade (mantida a mesma lógica)
async function privacyScreen(page: Page): Promise<void> {
  const loginUrl: string = '-';

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


// Configuração global para compartilhar o browser entre os testes
let browser: Browser;
let page: Page;

test.beforeAll(async () => {
  // Inicia o navegador antes de todos os testes
  browser = await chromium.launch({
    headless: false, // Modo gráfico para visualização
    ignoreHTTPSErrors: true, // Ignora erros de SSL
  });
  page = await browser.newPage();
});

test.afterAll(async () => {
  // Fecha o navegador após todos os testes
  await browser.close();
});

// Teste de login
test('Login Test', async () => {
  try {
    // Executa a função de privacidade, passando o page como argumento
    await privacyScreen(page);

    // Preenche o campo de usuário
    await page.waitForSelector('#user_name', { state: 'visible' });
    await page.fill('#user_name', 'ped');

    // Preenche o campo de senha
    await page.waitForSelector('#password', { state: 'visible' });
    await page.fill('#password', 'Admin@1234');

    // Clica nos checkboxes
    await page.click('#Privacy_policy');
    await page.click('#Use_terms');
    await page.click('#remember_user');

    // Verifica o título da página
    const titulo = await page.title();
    console.log('Título da página:', titulo);
    await expect(page).toHaveTitle('Login');
    await page.click('#login_button');
    // Adicione aqui mais ações ou verificações, se necessário

    await page.getByRole('link', { name: 'ped' }).click();
    await page.getByRole('link', { name: 'Change Password' }).click();
    await page.screenshot({ path: 'interface_Change_Password.png' });
    await page.getByRole('heading', { name: 'Change password' }).click();
    await page.locator('#dlg_cnt_global button').click();
    await page.getByRole('listitem', { name: 'Save Configuration' }).locator('i').click();
    await page.screenshot({ path: 'interface_Save_Configuration.png' });
    await page.getByRole('heading', { name: 'Confirm' }).click();
    await page.locator('#frame_msg_confirm button').click();
    await page.getByRole('listitem', { name: 'Logout' }).locator('#tbarLogout').click();
    await page.screenshot({ path: 'interface_Logout.png' });
    await page.getByRole('heading', { name: 'Confirm' }).click();
    await page.locator('#frame_msg_confirm button').click();
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.screenshot({ path: 'interface_Dashboard.png' });
    await page.getByRole('link', { name: 'Device' }).click();
    await page.screenshot({ path: 'interface_Device.png' });
    await page.getByRole('link', { name: 'Network' }).click();
    await page.screenshot({ path: 'interface_Network.png' });
    await page.getByRole('link', { name: 'Resources' }).click();
    await page.screenshot({ path: 'interface_Resources.png' });
    await page.getByRole('link', { name: 'QoS' }).click();
    await page.screenshot({ path: 'interface_QoS.png' });
    await page.getByRole('link', { name: 'Security' }).click();
    await page.screenshot({ path: 'interface_Security.png' });
    await page.getByRole('link', { name: 'PoE' }).click();
    await page.screenshot({ path: 'interface_PoE.png' });
    await page.getByRole('link', { name: 'Log' }).click();
    await page.screenshot({ path: 'interface_Log.png' });


  } catch (error) {
    console.error('Erro durante o teste:', error);
    await page.screenshot({ path: 'erro-teste.png' }); // Screenshot em caso de erro
    throw error; // Lança o erro para falhar o teste
  }
  await browser.close();
});

Teste de interface (continuação do teste de login)
test('Test interface', async () => {
  try {
    // Navega para a página de erro (ou a página desejada)
    await privacyScreen(page);

    // Preenche o campo de usuário
    await page.waitForSelector('#user_name', { state: 'visible' });
    await page.fill('#user_name', 'ped');

    // Preenche o campo de senha
    await page.waitForSelector('#password', { state: 'visible' });
    await page.fill('#password', '-');

    // Clica nos checkboxes
    await page.click('#Privacy_policy');
    await page.click('#Use_terms');
    await page.click('#remember_user');

    // Interage com os elementos da interface
    await page.click('.brand');
    await page.click('#devname');
    await page.click('text="System Logs"');
    await page.click('text="Emergency, Alert"');
    await page.click('text="Critical, Error"');
    await page.click('h1:has-text("Syslog Information")');
    await page.click('text="Close"');
    await page.click('[title="Warning, Notification"] i');
    await page.click('text="Close" >> nth=1');
    await page.click('[title="Informational, Debugging"] i');
    await page.click('text="Close" >> nth=2');
    await page.click('text="System Utilization"');
    await page.click('text="System Info"');
    await page.click('text="Serial number:"');
    await page.click('text="Hardware:"');
    await page.click('text="Software:"');
    await page.click('text="Boot ROM:"');
    await page.click('#cpu_sumfieldset >> text="CPU"');
    await page.click('text="Mem"');
    await page.click('a:has-text("ped")');
    await page.click('listitem:has-text("Save Configuration") i', { button: 'right' });
    await page.click('listitem:has-text("Logout") #tbarLogout', { button: 'right' });
    await page.click('listitem:has-text("Save Configuration")');
    await page.click('a:has-text("No")');
    await page.click('listitem:has-text("Logout") #tbarLogout');
    await page.click('a:has-text("No")');
    await page.click('a:has-text("ped")');
    await page.click('a:has-text("Change Password")');
    await page.click('h1:has-text("Change password")');
    await page.click('text="Enter old password"');
    await page.click('text="Enter new password"');
    await page.click('text="Re-enter new password"');
    await page.click('text="Cancel"');
    await page.click('a:has-text("Device")');
    await page.click('a:has-text("Network")');
    await page.click('a:has-text("Resources")');
    await page.click('a:has-text("QoS")');
    await page.click('a:has-text("Security")');
    await page.click('a:has-text("PoE")');
    await page.click('a:has-text("Log")');
    await page.click('a:has-text("VIew Details")');
    await page.click('text="System Logs"');
    await page.click('a:has-text("VIew Details")');
    await page.click('a:has-text("Online Help")');
    await page.click('#edit_div a');
    await page.click('text="Statistics"');
    await page.click('a:has-text("Close")');
    await page.click('a:has-text("Refresh")');
    await page.click('#back_to_pre');
    await page.click('a:has-text("View Details")');
    await page.click('[id="\\32 12"] a');
    await page.click('[id="\\32 12"] a');
    await page.click('#back_to_index a');

  } catch (error) {
    console.error('Erro durante o teste de interface:', error);
    await page.screenshot({ path: 'erro-interface.png' }); // Screenshot em caso de erro
    throw error; // Lança o erro para falhar o teste
  }
});
