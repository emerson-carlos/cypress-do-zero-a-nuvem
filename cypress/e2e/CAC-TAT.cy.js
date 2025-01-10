describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => { cy.visit('./src/index.html') })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 100)

    cy.get('#firstName').type('Emerson')
    cy.get('#lastName').type('Batista')
    cy.get('#email').type('email_teste@email.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').contains('Mensagem enviada com sucesso')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Emerson')
    cy.get('#lastName').type('Batista')
    cy.get('#email').type('email_teste@email')
    cy.get('#open-text-area').type('Mensagem de teste.')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('não deve permitir valor não numérico no campo de telefone', () => {
    cy.get('input[type="number"]').as('telefone').type('telefone')
    cy.get('@telefone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Emerson')
    cy.get('#lastName').type('Batista')
    cy.get('#email').type('email_teste@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('span.phone-label-span.required-mark').should('have.text', ' (obrigatório)');
    cy.get('#open-text-area').type('Mensagem de teste.')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').as('nome').type('Emerson')
    cy.get('@nome').should('have.value', 'Emerson')
    cy.get('@nome').clear().should('have.value', '')

    cy.get('#lastName').as('sobrenome').type('Batista')
    cy.get('@sobrenome').should('have.value', 'Batista')
    cy.get('@sobrenome').clear().should('have.value', '')

    cy.get('#email').as('email').type('email_teste@email.com')
    cy.get('@email').should('have.value', 'email_teste@email.com')
    cy.get('@email').clear().should('have.value', '')

    cy.get('#open-text-area').as('mensagem').type('Mensagem de teste.')
    cy.get('@mensagem').should('have.value', 'Mensagem de teste.')
    cy.get('@mensagem').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('envia um formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Otto', 'Harvetz', 'otto@email.com', 'Testando Custom Commands.')

    cy.get('.success').contains('Mensagem enviada com sucesso')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').as('produto').select('YouTube')
    cy.get('@produto').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').as('produto').select('mentoria')
    cy.get('@produto').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').as('produto').select(1)
    cy.get('@produto').should('have.value', 'blog')
  })

  it('marca cada tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback"]').as('feedback').check()
    cy.get('@feedback').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').as('contatos').check()
    cy.get('@contatos').should('be.checked')

    cy.get('@contatos').last().uncheck()
    cy.get('@contatos').last().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', ()=> {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
    cy.fixture('example.json', null).as('file')
    cy.get('input[type="file"]')
    .selectFile('@file')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
    cy.get('div[id="privacy"] a')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
    cy.get('div[id="privacy"] a').as('politicaPrivacidade').invoke('removeAttr', 'target')
    cy.get('@politicaPrivacidade').click()
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
  
})