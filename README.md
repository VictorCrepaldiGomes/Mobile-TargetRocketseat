# 🎯 Target - App de Metas Financeiras

> Um aplicativo móvel desenvolvido em React Native para controle e acompanhamento de metas financeiras pessoais.

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.81.5-blue.svg" />
  <img src="https://img.shields.io/badge/Expo-54.0.24-black.svg" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-blue.svg" />
  <img src="https://img.shields.io/badge/SQLite-15.2.10-green.svg" />
</div>

## 📱 Sobre o App

O **Target** é um aplicativo de controle financeiro focado em metas de economia. Com uma interface moderna e intuitiva, permite aos usuários criar, gerenciar e acompanhar o progresso de suas metas financeiras através de depósitos e resgates.

### ✨ Principais Funcionalidades

#### 🏠 **Dashboard Principal**
- **Resumo Financeiro**: Visualização do total guardado, entradas e saídas
- **Lista de Metas**: Exibição de todas as metas criadas com progresso visual
- **Gradiente Visual**: Design moderno com cores azuis degradê
- **Status em Tempo Real**: Atualização automática dos valores e percentuais

#### 🎯 **Gerenciamento de Metas**
- **Criar Metas**: Definir nome e valor alvo para cada objetivo
- **Editar Metas**: Modificar nome e valor de metas existentes
- **Excluir Metas**: Remover metas com confirmação de segurança
- **Validações**: Verificação de dados obrigatórios e valores válidos

#### 💰 **Sistema de Transações**
- **Guardar Dinheiro**: Adicionar valores positivos à meta
- **Resgatar Dinheiro**: Retirar valores da meta (valores negativos)
- **Observações**: Adicionar descrições opcionais às transações
- **Histórico Completo**: Listagem de todas as movimentações por meta

#### 📊 **Acompanhamento de Progresso**
- **Barra de Progresso**: Visualização gráfica do percentual atingido
- **Valores Detalhados**: Exibição de valor atual vs. valor meta
- **Percentual Calculado**: Cálculo automático do progresso
- **Histórico de Transações**: Lista completa de movimentações

#### 🗄️ **Persistência de Dados**
- **SQLite Local**: Armazenamento offline de todas as informações
- **Relacionamentos**: Estrutura de dados com foreign keys
- **Migrações**: Sistema de versionamento do banco de dados
- **Integridade**: Exclusão em cascata para manter consistência

## 🛠️ Tecnologias Utilizadas

### **Core**
- **React Native** `0.81.5` - Framework para desenvolvimento mobile
- **TypeScript** `5.9.2` - Tipagem estática para JavaScript
- **Expo** `~54.0.24` - Plataforma de desenvolvimento

### **Navegação e Roteamento**
- **Expo Router** `~6.0.15` - Sistema de roteamento baseado em arquivos
- **React Native Screens** `~4.16.0` - Otimização de performance

### **Interface e Design**
- **Expo Google Fonts (Inter)** `^0.4.2` - Tipografia moderna
- **Expo Linear Gradient** `~15.0.7` - Gradientes visuais
- **React Native Vector Icons** `^10.3.0` - Ícones Material Design
- **React Native Safe Area Context** `~5.6.0` - Áreas seguras

### **Entrada de Dados**
- **React Native Currency Input** `^1.1.1` - Campo de entrada para valores monetários

### **Banco de Dados**
- **Expo SQLite** `15.2.10` - Banco de dados local
- **Migrações Automáticas** - Sistema de versionamento

### **Estado e Performance**
- **React Hooks** - Gerenciamento de estado local
- **useFocusEffect** - Atualização automática ao focar telas

## 📂 Estrutura do Projeto

```
src/
├── app/                          # Telas da aplicação (Expo Router)
│   ├── _layout.tsx              # Layout principal com providers
│   ├── index.tsx                # Tela inicial (Dashboard)
│   ├── target.tsx               # Criar/Editar metas
│   ├── progress/
│   │   └── [id].tsx             # Detalhes e progresso da meta
│   └── transaction/
│       └── [id].tsx             # Criar transação
│
├── components/                   # Componentes reutilizáveis
│   ├── Buttons/                 # Botão com loading
│   ├── HomeHeader/              # Cabeçalho com resumo financeiro
│   ├── Input/                   # Campo de entrada de texto
│   ├── InputCurrency/           # Campo para valores monetários
│   ├── List/                    # Lista customizada com FlatList
│   ├── Loading/                 # Indicador de carregamento
│   ├── PageHeader/              # Cabeçalho de páginas internas
│   ├── ProgressBar/             # Barra de progresso visual
│   ├── Separator/               # Separador visual
│   ├── Summary/                 # Resumo de entradas/saídas
│   ├── Target/                  # Item de meta na lista
│   ├── Transaction/             # Item de transação
│   └── TransactionType/         # Seletor de tipo (Guardar/Resgatar)
│
├── database/                     # Camada de dados
│   ├── migrate.ts               # Migrações do banco
│   ├── useTargetDatabase.ts     # CRUD de metas
│   └── useTransactionsDatabase.ts # CRUD de transações
│
├── themes/                       # Sistema de design
│   ├── color.ts                 # Paleta de cores
│   ├── font.ts                  # Tipografia
│   └── index.ts                 # Exportações
│
└── utils/                        # Utilitários
    ├── numberToCurrency.ts      # Formatação monetária
    └── TransactionsTypes.ts     # Enums de tipos
```

## 🎨 Design System

### **Paleta de Cores**
```typescript
colors = {
  blue: {
    100: "#d8ddfc",    // Azul muito claro
    200: "#b1bbf9",    // Azul claro
    300: "#8DA2EB",    // Azul médio
    400: "#53569C",    // Azul escuro
    500: "#3d44cd",    // Azul principal
    800: "#1F2267",    // Azul muito escuro
  },
  gray: { 100-600 },   // Escala de cinzas
  green: { 500 },      // Verde para entradas
  red: { 400 },        // Vermelho para saídas
  white, black         // Cores base
}
```

### **Tipografia**
- **Inter Regular** - Textos comuns
- **Inter Medium** - Textos de destaque
- **Inter Bold** - Títulos e valores importantes

## 💾 Estrutura do Banco de Dados

### **Tabela: targets**
```sql
CREATE TABLE targets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,              -- Nome da meta
  amount FLOAT NOT NULL,           -- Valor alvo
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

### **Tabela: transactions**
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  target_id INTEGER NOT NULL,      -- FK para targets
  amount FLOAT NOT NULL,           -- Valor (+ para depósito, - para saque)
  observation TEXT NULL,           -- Descrição opcional
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (target_id) REFERENCES targets(id) ON DELETE CASCADE
);
```

## 🔄 Fluxos de Uso

### **1. Criar Nova Meta**
1. Tela inicial → Botão "Adicionar Meta"
2. Preencher nome e valor alvo
3. Salvar com validações
4. Retornar à lista atualizada

### **2. Acompanhar Progresso**
1. Tela inicial → Tocar em uma meta
2. Visualizar barra de progresso
3. Ver histórico de transações
4. Opções para editar meta ou adicionar transação

### **3. Adicionar Transação**
1. Tela de progresso → "Adicionar Transação"
2. Escolher tipo: Guardar ou Resgatar
3. Definir valor e observação
4. Confirmar e atualizar automaticamente

### **4. Gerenciar Meta**
1. Tela de progresso → Ícone de editar
2. Modificar nome ou valor
3. Opção de excluir com confirmação
4. Salvar alterações

## 🚀 Instalação e Execução

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn
- Expo CLI
- Expo Go (para teste) ou emulador

### **Configuração do Ambiente**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/target-app.git
cd target-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npm start
# ou
yarn start
```

4. **Execute em dispositivo específico**
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### **Build para Produção**
```bash
# Android APK
npx expo build:android

# iOS IPA
npx expo build:ios
```

## 📱 Funcionalidades Detalhadas

### **Dashboard Principal**
- **Resumo Financeiro**: Total, entradas e saídas com ícones coloridos
- **Lista de Metas**: Cards com nome, progresso e valores
- **Design Responsivo**: Adaptação para diferentes tamanhos de tela
- **Pull to Refresh**: Atualização por deslizar

### **Criação/Edição de Metas**
- **Validação em Tempo Real**: Feedback imediato de erros
- **Formatação Automática**: Valores monetários formatados
- **Estados de Loading**: Indicadores visuais durante salvamento
- **Navegação Intuitiva**: Botões de voltar e salvar

### **Sistema de Transações**
- **Tipos Visuais**: Botões coloridos para Guardar/Resgatar
- **Valores Inteligentes**: Conversão automática para positivo/negativo
- **Observações Opcionais**: Campo de texto livre
- **Confirmações**: Alertas de sucesso/erro

### **Visualização de Progresso**
- **Barra Animada**: Progresso visual com percentual
- **Valores Formatados**: Moeda brasileira (R$)
- **Lista de Transações**: Histórico completo com datas
- **Ações Rápidas**: Editar, adicionar, remover

## 🔒 Validações e Segurança

### **Validações de Entrada**
- **Metas**: Nome obrigatório, valor maior que zero
- **Transações**: Valor obrigatório e válido
- **Formulários**: Prevenção de envios duplos

### **Integridade de Dados**
- **Foreign Keys**: Relacionamentos consistentes
- **Exclusão em Cascata**: Remove transações ao excluir meta
- **Transações**: Operações atômicas no SQLite

### **UX/UI Segura**
- **Confirmações**: Alertas antes de exclusões
- **Estados de Loading**: Prevenção de múltiplos cliques
- **Tratamento de Erros**: Mensagens amigáveis

## 🎯 Recursos Únicos

### **Cálculos Automáticos**
- **Progresso**: Percentual baseado em valor atual vs. meta
- **Resumo**: Soma automática de entradas e saídas
- **Saldo**: Cálculo dinâmico do valor guardado

### **Interface Intuitiva**
- **Gradientes**: Design moderno e atraente
- **Ícones Contextuais**: Material Design para clareza
- **Navegação Gestual**: Swipe e touch otimizados

### **Performance**
- **SQLite Local**: Dados offline e rápidos
- **Lazy Loading**: Carregamento sob demanda
- **Memoização**: Otimização de re-renders

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <p>Desenvolvido com ❤️ para ajudar você a alcançar suas metas financeiras</p>
  <p><strong>Target App</strong> - Transformando sonhos em realidade, um centavo de cada vez! 🎯💰</p>
</div>
