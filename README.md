# Anjo Amigo

Chatbot de apoio contra a violência doméstica em Fraiburgo.

## Sobre o Projeto

O Anjo Amigo é um chatbot desenvolvido para fornecer informações e suporte às vítimas de violência doméstica em Fraiburgo. O sistema oferece orientações sobre leis, direitos, tipos de violência e conecta os usuários com a rede de proteção local.

## Funcionalidades

- Informações sobre diferentes tipos de violência (física, psicológica, sexual, patrimonial e moral)
- Contatos da rede protetiva em Fraiburgo
- Orientações sobre como denunciar violência doméstica
- Informações sobre a Lei Maria da Penha
- Suporte por voz (opcional)

## Tecnologias Utilizadas

- React
- Vite
- CSS (com Tailwind)
- API de Síntese de Voz do navegador

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/anjo-amigo-frontend.git
   cd anjo-amigo-frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   ```

## Estrutura do Projeto

- `/src/components` - Componentes React do chatbot
- `/src/styles` - Arquivos CSS
- `/src/knowledgeBase.js` - Base de conhecimento local com informações sobre violência doméstica
- `/src/App.jsx` - Componente principal da aplicação

## API Backend

O chatbot se conecta a um backend para processamento avançado de mensagens. A API está configurada para o endpoint:

```
http://82.29.61.210:8000/api/send
```

## Scripts Disponíveis

- `npm run dev` - Executa o aplicativo em modo de desenvolvimento
- `npm run build` - Compila o aplicativo para produção
- `npm run preview` - Visualiza a versão de produção localmente