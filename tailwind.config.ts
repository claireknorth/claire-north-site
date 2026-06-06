import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#f7f5ef',
        'paper-raised': '#fbfaf5',
        ink: '#1b1a17',
        'ink-soft': '#5c574d',
        'ink-faint': '#8a8479',
        accent: '#2f7a5b',
        rule: '#e3dfd5',
        'rule-soft': '#ece8de',
      },
      maxWidth: {
        wrap: '1160px',
      },
    },
  },
  plugins: [],
}

export default config
