import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navega até a URL de login
  async navigateToLogin(url: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: 'load' });
    } catch (error) {
      console.error('Erro ao acessar a página:', error);
      throw error;
    }
  }

  // Lida com a tela de privacidade
  async handlePrivacyScreen(): Promise<void> {
    try {
      await this.page.click('#details-button');
      await this.page.click('#proceed-link');
    } catch (error: any) {
      console.error('Erro ao interagir com os elementos:', error.message);
      await this.page.screenshot({ path: 'screenshots/erro-elementos.png' });
      throw error;
    }
  }

  // Preenche o campo de usuário
  async fillUsername(username: string): Promise<void> {
    await this.page.waitForSelector('#user_name', { state: 'visible' });
    await this.page.fill('#user_name', username);
  }

  // Preenche o campo de senha
  async fillPassword(password: string): Promise<void> {
    await this.page.waitForSelector('#password', { state: 'visible' });
    await this.page.fill('#password', password);
  }

  // Verifica e clica nos checkboxes
  async handleCheckboxes(): Promise<void> {
    // Verifica o link da Política de Privacidade
    await this.page.getByRole('link', { name: 'Privacy policy' }).waitFor({ state: 'visible' });
    const privacyPolicyLink = await this.page.getByRole('link', { name: 'Privacy policy' }).getAttribute('href');
    console.log('Link da Política de Privacidade:', privacyPolicyLink);
    expect(privacyPolicyLink).toBe('https://www.intelbras.com/en/privacy-policy/');

    // Clica no checkbox da Política de Privacidade
    await this.page.click('#Privacy_policy');

    // Verifica o link dos Termos de Uso
    await this.page.getByRole('link', { name: 'Use terms' }).waitFor({ state: 'visible' });
    const useTermsLink = await this.page.getByRole('link', { name: 'Use terms' }).getAttribute('href');
    console.log('Link dos Termos de Uso:', useTermsLink);
    expect(useTermsLink).toBe('https://www.intelbras.com/en/privacy-policy/terms');

    // Clica no checkbox dos Termos de Uso
    await this.page.click('#Use_terms');

    // Clica no checkbox "Remember user"
    await this.page.click('#remember_user');
  }

  // Clica no botão de login
  async clickLoginButton(): Promise<void> {
    await this.page.click('#login_button');
  }

  // Verifica o título da página
  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const titulo = await this.page.title();
    console.log('Título da página:', titulo);
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  // Aguarda o elemento "System Logs" estar visível e tira um screenshot
  async verifySystemLogs(): Promise<void> {
    await this.page.waitForSelector('span.title', { state: 'visible' });
    await this.page.waitForLoadState('networkidle'); // Espera até que não haja mais requisições de rede

    // Tira um screenshot do elemento "System Logs"
    const systemLogsElement = await this.page.$('span.title');
    await systemLogsElement?.screenshot({ path: 'screenshots/system_logs.png' });

    // Tira um screenshot da página inteira
    await this.page.screenshot({ path: 'screenshots/Interface.png' });
  }
}