
<h1 align="center">
  <br/>
  <img src="https://user-images.githubusercontent.com/55251721/78802105-ca55de80-7993-11ea-9187-3a97342a8dfb.png" width=80 />
  <br/>
  NoteList
</h1>
<h2 align="center">
  Aplicação para salvar anotações <br/>
  <br/>
  <a href="https://github.com/rafaelnrabelo/NoteList-Desktop#testando">
    <img src="https://img.shields.io/badge/Testing-Install-%23DA552F" alt="testing"/>
  </a>
  <a href="https://github.com/rafaelnrabelo/NoteList-Desktop/releases/latest">
    <img src="https://img.shields.io/badge/Last%20Release-1.0.0-%23DA552F" alt="release"/>
  </a>
  <br/>
  <br/>
  <img src="https://user-images.githubusercontent.com/55251721/89109438-8477c700-d417-11ea-8ba4-03422a713084.png" />
</h2>

## Features
  - Login com Facebook.
  - Sincronização das notas em nuvem.
  - Lista de Tarefas.
  - Cadastro de anotações.
  - Editar anotação.
  - Apagar anotação.
  - Busca das anotações pelo titulo.
  
## Dependências
  - Electron
  - ReactJS
  - React Icons
  - Axios
  - React-Resizable
  - Material-ui
  - Styled Components
  - Electron-Store
   
## Testando:
   1. Clone o repositorio usando `git clone https://github.com/rafaelnrabelo/NoteList-Desktop.git`
   2. Mova para a pasta clonada usando `cd NoteList-Desktop`
   3. Instale todas dependecias usando `yarn install`
   4. Adicione a url de conexão do backend no campo `API_URL` no arquivo `.env.json` na pasta `src`
   5. Adicione o ID do seu app do Facebook no campo `FACEBOOK_ID` no arquivo `.env.json` na pasta `src`
   6. Adicione o Token de Cliente do seu app do Facebook no campo `CLIENT_TOKEN` no arquivo `.env.json` na pasta `src`
   7. Execute `yarn dev` para iniciar a aplicação.
