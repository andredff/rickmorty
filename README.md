# AppRickMorty

Este é um projeto Angular que consome a API pública de Rick and Morty para exibir informações sobre os personagens, incluindo detalhes, favoritos e muito mais.

A aplicação está atualmente rodando em produção no seguinte link:

🔗 **[Acesse a aplicação aqui](https://rickmorty-sigma-sandy.vercel.app/)**

---

## 🚀 Como Inicializar o Projeto Localmente

Siga os passos abaixo para instalar e executar o projeto localmente:

### **1. Pré-requisitos**

Certifique-se de que você possui as seguintes ferramentas instaladas em sua máquina:
- **Node.js** (versão 16 ou superior)
- **npm** 
- **Angular CLI** 

Para instalar o Angular CLI globalmente, execute:
```bash
npm install -g @angular/cli
```

### **2. Clonar o Repositório**

Clone este repositório para sua máquina local:
```bash
git clone https://github.com/andredff/rickmorty.git
```

### **3. Instalar Dependências**

Instale todas as dependências do projeto:
```bash
npm install
```

### **4. Executar o Servidor de Desenvolvimento**

Inicie o servidor de desenvolvimento:
```bash
ng serve
```

Abra o navegador e acesse:
```
http://localhost:4200/
```

A aplicação será recarregada automaticamente sempre que você modificar os arquivos fonte.

---

## 🛠️ Comandos Úteis

### **Gerar um Build de Produção**

Para gerar um build otimizado para produção, execute:
```bash
ng build
```

Os artefatos do build serão gerados na pasta `dist/`.

### **Executar Testes Unitários**

Para executar os testes unitários com o Karma, use:
```bash
ng test
```

### **Executar Testes End-to-End**

Para executar testes end-to-end (e2e), use:
```bash
ng e2e
```

---

## 🌐 Deploy

A aplicação está hospedada na plataforma **Vercel** e pode ser acessada no seguinte link:

🔗 **[https://rickmorty-sigma-sandy.vercel.app/](https://rickmorty-sigma-sandy.vercel.app/)**

Para realizar o deploy, siga os passos abaixo:

1. Certifique-se de que o build de produção foi gerado:
   ```bash
   ng build
   ```

2. Faça o upload dos arquivos da pasta `dist/` para a plataforma de hospedagem de sua escolha (neste caso, Vercel).

---

## 📚 Recursos Adicionais

- **Documentação Angular CLI**: [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- **API Rick and Morty**: [Rick and Morty API](https://rickandmortyapi.com/)

---

## 📝 Licença

Este projeto é de uso livre. Sinta-se à vontade para contribuir ou utilizá-lo como base para seus próprios projetos.
