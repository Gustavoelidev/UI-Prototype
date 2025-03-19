import { Page, expect } from '@playwright/test';

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Lida com a tela de privacidade - Login
  async handlePrivacyScreen(): Promise<void> {
    const loginUrl: string = ''; // Link do DUT

    // Navega até a URL de login
    try {
      await this.page.goto(loginUrl, { waitUntil: 'load' }); // Espera até a página carregar
    } catch (error) {
      console.error('Erro ao acessar a página:', error);
    }

    // Aguarda os elementos estarem disponíveis e clica neles
    try {
      await this.page.click('#details-button');
      await this.page.click('#proceed-link');
    } catch (error: any) {
      console.error('Erro ao interagir com os elementos:', error.message);
      await this.page.screenshot({ path: 'erro-elementos.png' }); // Screenshot em caso de erro
      throw error;
    }
  }

  // Loga no device
  async login(username: string, password: string): Promise<void> {
    await this.page.waitForSelector('#user_name', { state: 'visible' });
    await this.page.fill('#user_name', username);
    await this.page.waitForSelector('#password', { state: 'visible' });
    await this.page.fill('#password', password);
    await this.page.click('#Privacy_policy');
    await this.page.click('#Use_terms');
    await this.page.click('#login_button');
  }

// Testa a funcionalidade de mudança de senha
  async iconUser(): Promise<void> {
    try {

        await this.page.waitForLoadState('networkidle');
      // Clica no ícone do usuário
      await this.page.getByRole('link', { name: 'ped' }).click();

      // Vai em "Change Password"
      await this.page.getByRole('link', { name: 'Change Password' }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/Change-Password.png' });

      // Clica em "Apply"
      await this.page.getByRole('heading', { name: 'Change password' }).waitFor({ state: 'visible' });
      await this.page.getByText('Apply').click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);

      // Verifica se o popup de erro é exibido
      const errorPopup = await this.page.getByRole('heading', { name: 'Error' });
      const errorMessage = await this.page.getByText('Wrong Password.');

      // Verifica se o popup e a mensagem de erro estão visíveis
      await expect(errorPopup).toBeVisible();
      await expect(errorMessage).toBeVisible();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForSelector('text="Change password"', { state: 'visible' });
      // Tira um screenshot do erro
      await this.page.screenshot({ path: 'screenshots/error-popup.png' });

      // Clica em "Close"
      await this.page.getByRole('link', { name: 'Close' }).click();

      // Clica em "Cancel"
      await this.page.getByText('Cancel').click();

      console.log('Teste de mudança de senha concluído com sucesso!');
    } catch (error) {
      console.error('Erro durante o teste de mudança de senha:', error);

      // Tira um screenshot em caso de falha
      await this.page.screenshot({ path: 'screenshots/error-iconUser.png' });

      // Lança o erro para falhar o teste
      throw new Error('O popup de erro não foi exibido. Há um problema no fluxo de mudança de senha.');
    }
  }

// Testa a funcionalidade de save
  async iconSave(): Promise<void> {
    try {
      // Clica em "Save Configuration"
      await this.page.getByRole('listitem', { name: 'Save Configuration' }).locator('i').click();
  
      // Espera a palavra "Confirm" estar visível e tira um print
      await this.page.waitForTimeout(2000);
      await this.page.getByRole('heading', { name: 'Confirm' }).waitFor({ state: 'visible' });
      await this.page.screenshot({ path: 'screenshots/confirm-popup.png' });
  
      // Clica em "Yes"
      await this.page.getByText('Yes').click();
  
      // Espera a palavra "Please wait" estar visível e tira um print
      await this.page.getByRole('heading', { name: 'Please wait...' }).waitFor({ state: 'visible' });
      await this.page.waitForTimeout(1000);
      await this.page.screenshot({ path: 'screenshots/please-wait.png' });
  
      // Espera o popup "Configuration succeeded" estar visível e tira um print
      await this.page.getByText('Configuration succeeded').waitFor({ state: 'visible' });
      await this.page.screenshot({ path: 'screenshots/configuration-succeeded.png' });
  
      console.log('Teste de save configuration concluído com sucesso!');
    } catch (error) {
      console.error('Erro durante o teste de save configuration:', error);
  
      // Tira um screenshot em caso de falha
      await this.page.screenshot({ path: 'screenshots/error-iconSave.png' });
  
      // Lança o erro para falhar o teste
      throw new Error('O teste de save configuration falhou. Verifique os logs e screenshots.');
    }
  }

 // Testa a funcionalidade de exit
 async iconExit(): Promise<void> {
    try {
      // Clica no ícone de logout
      await this.page.getByRole('listitem', { name: 'Logout' }).locator('#tbarLogout').waitFor({ state: 'visible' });
      await this.page.getByRole('listitem', { name: 'Logout' }).locator('#tbarLogout').click();
  
      // Aguarda o carregamento da página
      await this.page.waitForLoadState('networkidle', { timeout: 3000 }); // Espera até 60 segundos
  
      // Tira um screenshot da tela de logout
      await this.page.screenshot({ path: 'screenshots/exit-icon.png' });
  
      // Verifica se o popup de confirmação está visível e clica em "Confirm"
      await this.page.getByRole('heading', { name: 'Confirm' }).waitFor({ state: 'visible' });
      await this.page.getByRole('heading', { name: 'Confirm' }).click();
  
      // Clica em "No" para cancelar o logout
      await this.page.getByRole('link', { name: 'No' }).waitFor({ state: 'visible' });
      await this.page.getByRole('link', { name: 'No' }).click();
  
      console.log('Teste de logout concluído com sucesso!');
    } catch (error) {
      console.error('Erro durante o teste de logout:', error);
  
      // Tira um screenshot em caso de falha
      await this.page.screenshot({ path: 'screenshots/error-iconExit.png' });
  
      // Lança o erro para falhar o teste
      throw new Error('O teste de logout falhou. Verifique os logs e screenshots.');
    }
  }

 // Testa a funcionalidade do dashboard
 async dashboard(): Promise<void> {
    try {
      // Verifica se a logo está presente e clica nela
      await this.page.locator('.brand').waitFor({ state: 'visible' });
      await this.page.locator('.brand').click();
      await this.page.waitForLoadState('networkidle');
      await this.page.screenshot({ path: 'screenshots/dashboard.png' });
  
      // Clica em "View Details"
      await this.page.getByRole('link', { name: 'VIew Details', exact: true }).waitFor({ state: 'visible' });
      await this.page.getByRole('link', { name: 'VIew Details', exact: true }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/dashboard-VIew-Details.png' });
  
      // Clica em "Advanced search"
      await this.page.getByRole('link', { name: 'Advanced search' }).waitFor({ state: 'visible' });
      await this.page.getByRole('link', { name: 'Advanced search' }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/dashboard-Advanced-search.png' });
  
      // Clica para mostrar os Levels
      await this.page.locator('#mlist_filter_dlg').getByRole('link').waitFor({ state: 'visible' });
      await this.page.locator('#mlist_filter_dlg').getByRole('link').click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/dashboard-Advanced-search-filter-dlg.png' });
  
      // Clica novamente para fechar os Levels
      await this.page.locator('#mlist_filter_dlg').getByRole('link').filter({ hasText: /^$/ }).first().click();
  
      // Clica para fechar a "Advanced search"
      await this.page.getByRole('link', { name: 'Advanced search' }).click();
  
      // Clica no ícone de coluna
      await this.page.locator('.slick-header-column').first().waitFor({ state: 'visible' });
      await this.page.locator('.slick-header-column').first().click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/dashboard-header-column.png' });
  
      // Fecha o ícone de coluna
      await this.page.locator('.slick-header-column').first().click();
  
      // Clica em "Online Help"
      await this.page.getByRole('link', { name: 'Online Help' }).waitFor({ state: 'visible' });
      await this.page.getByRole('link', { name: 'Online Help' }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/dashboard-Online-Help.png' });
  
      // Volta para a página
      await this.page.locator('#edit_div').getByRole('link').waitFor({ state: 'visible' });
      await this.page.locator('#edit_div').getByRole('link').click();
  
      // Clica em "Statistics"
      await this.page.getByText('Statistics').waitFor({ state: 'visible' });
      await this.page.getByText('Statistics').click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/dashboard-Statistics.png' });
  
      // Volta para a página
      await this.page.getByRole('link', { name: 'Close' }).waitFor({ state: 'visible' });
      await this.page.getByRole('link', { name: 'Close' }).click();

      await this.page.locator('#back_to_pre').waitFor({ state: 'visible' });
      await this.page.locator('#back_to_pre').click();

      // Clica em "View Details"
      await this.page.getByRole('link', { name: 'View Details', exact: true }).waitFor({ state: 'visible' });
      await this.page.getByRole('link', { name: 'View Details', exact: true }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.page.screenshot({ path: 'screenshots/dashboard-ViewDetails.png' });
      await this.page.locator('[id="\\32 12"] a').click();
      await this.page.locator('#back_to_index').getByRole('link').click();

      console.log('Teste do dashboard concluído com sucesso!');
    } catch (error) {
      console.error('Erro durante o teste do dashboard:', error);
  
      // Tira um screenshot em caso de falha
      await this.page.screenshot({ path: 'screenshots/error-dashboard.png' });
  
      // Lança o erro para falhar o teste
      throw new Error('O teste do dashboard falhou. Verifique os logs e screenshots.');
    }
  }

  async copyrightText(): Promise<void> {
    try {
      // Verifica se o texto "Copyright (C) 2023 Intelbras" está presente na página
      await expect(this.page.getByText('Copyright (C) 2023 Intelbras')).toBeVisible();
      console.log('O texto "Copyright (C) 2023 Intelbras" foi encontrado na página.');
    } catch (error) {
      console.error('Erro: O texto "Copyright (C) 2023 Intelbras" não foi encontrado na página.');
  
      // Tira um screenshot em caso de falha
      await this.page.screenshot({ path: 'screenshots/error-copyright-not-found.png' });
  
      // Lança o erro para falhar o teste
      throw new Error('O texto "Copyright (C) 2023 Intelbras" não foi encontrado na página.');
    }
  }


// Verificar View Details do System Utilization
// Verificar se contem no System Info as informacoes de Serial number: Hardware: Boot ROM: Software:

}

