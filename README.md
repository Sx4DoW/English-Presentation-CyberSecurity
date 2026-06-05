# CyberSecurity Project

Un progetto scolastico sviluppato con **React** e **Vite** per esplorare i concetti di cybersecurity.

## Prerequisiti

Prima di iniziare, assicurati di avere installato:
- **Node.js** (v16 o superiore)
- **npm** (incluso con Node.js)

## Installazione

1. Clona il repository:
```bash
git clone https://github.com/Sx4DoW/English-Presentation-CyberSecurity.git
cd CyberSecurity
```

2. Installa le dipendenze:
```bash
npm install
```

## Come Avviare il Progetto

### Modalità Sviluppo
Avvia il server di sviluppo con hot reload:
```bash
npm run dev
```
Il progetto sarà disponibile su `http://127.0.0.1:5173`

### Build per Produzione
Crea una build ottimizzata:
```bash
npm run build
```
I file compilati saranno nella cartella `dist/`

### Anteprima della Build
Visualizza in anteprima la build di produzione:
```bash
npm run preview
```
L'anteprima sarà disponibile su `http://127.0.0.1:4173`

## Struttura del Progetto

```
CyberSecurity/
├── src/
│   ├── App.jsx           # Componente principale
│   ├── main.jsx          # Entry point React
│   ├── assets/           # Immagini e risorse
│   │   └── visuals/      # File visivi
│   ├── components/       # Componenti React
│   │   └── Illustration.jsx
│   ├── data/             # Dati statici
│   │   └── slides.js
│   └── styles/           # Stili CSS
│       └── app.css
├── public/               # File statici
├── index.html            # HTML principale
├── package.json          # Dipendenze del progetto
├── vite.config.js        # Configurazione Vite
└── .gitignore            # File da ignorare in git
```

## Tecnologie Utilizzate

- **React 19** - Libreria UI
- **Vite 7** - Build tool e dev server
- **CSS** - Styling

## Supporto

Per domande o problemi, consulta la documentazione di:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
