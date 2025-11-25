# FATEC Utilitários

Uma suíte de ferramentas de alta performance projetada para simplificar a vida caótica do estudante da FATEC. Enquanto outros lutam com portais institucionais lentos e cálculos manuais, nós automatizamos o sucesso.

## ⚡ A Visão

O sistema acadêmico tradicional é lento e burocrático. O **FATEC Utilitários** é a resposta rápida, moderna e eficiente. Centralizamos o que importa, eliminamos o ruído e entregamos uma experiência de usuário que você realmente merece.

## 🛠 Arsenal Tecnológico

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System:** [Vite](https://vitejs.dev/)
- **UI/UX:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State & Data:** TanStack Query

## 🚀 Começando

Se você quer contribuir ou rodar localmente, siga o protocolo:

### Pré-requisitos
- Node.js (LTS)
- Gerenciador de pacotes (npm, pnpm ou bun)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/MarcosAlves90/fatec-utilitarios.git

# 2. Entre na diretoria
cd fatec-utilitarios

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

## 📦 Estrutura do Projeto

A arquitetura é limpa e modular.

```
src/
├── components/   # Componentes reutilizáveis (UI Building Blocks)
├── pages/        # Rotas da aplicação (Index, NotFound, etc.)
├── hooks/        # Lógica de estado reutilizável
├── lib/          # Utilitários e configurações de bibliotecas
└── utils/        # Funções auxiliares
```

## 🤝 Contribuição

Pull requests são aceitos, mas com algumas regras:

1. O código deve ser tipado (TypeScript estrito).
2. Componentes devem seguir o padrão shadcn.
3. Build não pode estar quebrada.

## 📝 Licença

Distribuído sob a licença MIT.
