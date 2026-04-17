# Handwritten UI 🎨

Handwritten UI is a React-based component library designed to give your web applications a unique, hand-drawn aesthetic. It leverages **Rough.js** to create sketchy, imperfect shapes and the **Virgil** font for that authentic "sketched on a whiteboard" feel.

## ✨ Features

- **Rough.js Integration**: Components are rendered with a wobbly, organic feel.
- **Hand-drawn Typography**: Pre-configured with the Virgil font for a consistent sketchy look.
- **Tailwind CSS Powered**: Easily customizable using the utility classes you already know.
- **TypeScript First**: Fully typed for a great developer experience.
- **Modern React**: Built with React 19.

## 🚀 Getting Started

### Installation

```bash
pnpm install handwritten-ui
```

_(Note: Currently in development. To use locally, clone the repository and install dependencies.)_

### Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in development mode
pnpm dev

# Lint and Format
pnpm lint
pnpm format
```

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Graphics**: [Rough.js](https://roughjs.com/)
- **Build Tool**: [tsup](https://tsup.egoist.dev/)
- **Quality Control**: ESLint, Prettier, Husky, Lint-staged

## 📖 Usage

```tsx
import { Button } from 'handwritten-ui';

function App() {
  return <Button onclick={() => console.log('Clicked!')}>Click Me!</Button>;
}
```

## 📜 License

ISC License.
