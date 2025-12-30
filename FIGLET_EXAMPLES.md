# 🎨 EXEMPLES DE POLICES FIGLET POUR LE TERMINAL

## 📦 Installation
```bash
npm install figlet
```

## 🚀 Utilisation dans le projet

```typescript
import { generateAsciiTextSync, ASCII_FONTS } from '@/lib/ascii';

// Générer du texte ASCII
const title = generateAsciiTextSync('GI 2025', ASCII_FONTS.slant);
console.log(title);
```

---

## 🎨 POLICES DISPONIBLES

### 1. **Slant** (Recommandé - Moderne et élégant)
```
    __________   ___   ___ ___  ____  
   / ____/  _/  |__ \ / _ \__ \| ___| 
  / / __ / /    __/ // // /_/ /___ \  
 / /_/ // /    / __// //_/ __/ ___/ / 
 \____/___/   /____/\___/____/_____/  
```

### 2. **Standard** (Classique)
```
  ____ ___   ____   ___ ____  ____  
 / ___|_ _| |___ \ / _ \___ \| ___| 
| |  _ | |    __) | | | |__) |___ \ 
| |_| || |   / __/| |_| / __/ ___) |
 \____|___| |_____|\___/_____|____/ 
```

### 3. **Big** (Imposant)
```
   _____ _____   ___   ___ ___  _____ 
  / ____|_   _| |__ \ / _ \__ \| ____|
 | |  __  | |     / / | | | | |  _|  
 | | |_ | | |    |_|| | |_| | | |___ 
  \____|___|     (_) \___/|_||_____|
```

### 4. **Banner** (Simple et lisible)
```
  #####     #    ####### ####### ######  
 #     #   ##   #     # #     # #     # 
 #        # #         #       # #     # 
 #  #### #   #  #####  #####  #######  
 #     # #####       # #     #      #   
 #     #     # #     # #     # #    #   
  #####      #  #####   #####  #     #  
```

### 5. **Block** (Gras et carré)
```
 _|_|_|_|_| _|_|   _|_|_|_|   _|_|_|_|  
 _|           _|         _|   _|        
 _|  _|_|     _|       _|     _|_|_|_|  
 _|    _|     _|     _|             _|  
 _|_|_|_| _|_|_|_| _|       _|_|_|_|    
```

### 6. **Cybermedium** (Style cyber/futuriste)
```
 ___  ___   __   __  ___  ___ 
/ __||_ _| |__| / / / _ \|__ \
| (_ | | |  | || / | (_) | / /
\___||___| |__||_/  \___/ |_| 
```

### 7. **Digital** (Style digital/matrix)
```
 +-+-+ +-+-+-+-+
 |G|I| |2|0|2|5|
 +-+-+ +-+-+-+-+
```

### 8. **Graffiti** (Style graffiti)
```
   ________.__   ________   ____ _________ ________
  /  _____/|__| /  _____/  /_   ||   __   ||   ____|
 /   \  __|  | \____  \    /   / |  |  |  ||  |     
 \    \_\  |  | /       \  /   / |  |  |  ||  |     
  \________/__//_________/ /___/  |__|__|__||__|     
```

### 9. **Ogre** (Style médiéval)
```
   ___  ___    ___   __   ___  ___ 
  / __||_ _|  |__ \ /  \ |__ \| __|
 | (_ | | |   __) || () |  / /|__ \
  \___||___|  |___/  \__/  /_/ |___/
```

### 10. **Alligator** (Compact et moderne)
```
 ::::::::  :::::::::::       ::::::::   ::::::::  ::::::::   :::::::: 
:+:    :+:     :+:          :+:    :+: :+:    :+::+:    :+: :+:    :+:
+:+            +:+                +:+  +:+    +:++:+        +:+       
:#:            +#+             +#+     +#+    +:+#++:++#++  +#++:++#++
+#+#+#+#       +#+          +#+        +#+    +#+       +#+        +#+
     #+#       #+#         #+#         #+#    #+##+#    #+# #+#    #+#
########   ###########    ##########   ########  ########   ########  
```

---

## 💡 COMMENT CHOISIR LA BONNE POLICE?

### Pour les TITRES PRINCIPAUX:
- **Slant** - Moderne et professionnel
- **Big** - Impact visuel fort
- **Graffiti** - Style tech/cyber

### Pour les SOUS-TITRES:
- **Standard** - Lisible et classique
- **Cybermedium** - Compact et futuriste

### Pour les BADGES/LABELS:
- **Digital** - Style matrix
- **Block** - Gras et carré

### Pour l'AMBIANCE TECH:
- **Banner** - Style terminal authentique
- **Ogre** - Compact mais lisible

---

## 📝 EXEMPLES D'INTÉGRATION

### Exemple 1: Titre de section dans le terminal
```typescript
const section2Content: TerminalLine[] = [
    { text: "", color: "#CCCCCC" },
    // Titre ASCII
    ...generateAsciiTextSync('GI 2025', ASCII_FONTS.slant)
        .split('\n')
        .map(line => ({ text: line, color: "#00FF00" })),
    { text: "", color: "#CCCCCC" },
    { text: "════════════════════════════════════════", color: "#00FF00" },
    { text: "         PROMOTION REGISTRY             ", color: "#CCCCCC" },
];
```

### Exemple 2: Badge/Tag
```typescript
const wrappedBadge = generateAsciiTextSync('WRAPPED', ASCII_FONTS.digital);
```

### Exemple 3: Message d'erreur stylisé
```typescript
const errorMsg = generateAsciiTextSync('ERROR', ASCII_FONTS.banner);
```

---

## 🎯 POLICES RECOMMANDÉES POUR GI25_WRAPPED

1. **Titre principal "GI 2025"**: `Slant` ou `Graffiti`
2. **"WRAPPED"**: `Cybermedium` ou `Banner`
3. **"REGISTRY"**: `Standard` ou `Big`
4. **Badges (OK, ERROR)**: `Digital` ou `Block`
5. **Numéros de section**: `Ogre` ou `Cybersmall`

---

## 🔗 RESSOURCES

- [Liste complète des polices Figlet](http://www.figlet.org/examples.html)
- [Figlet.js sur GitHub](https://github.com/patorjk/figlet.js)
- [Test en ligne](http://patorjk.com/software/taag/)

---

## ✅ DÉJÀ INTÉGRÉ DANS LE PROJET

Le fichier `lib/ascii.ts` contient:
- `generateAsciiText()` - Version asynchrone
- `generateAsciiTextSync()` - Version synchrone
- `ASCII_FONTS` - Constantes pour toutes les polices

Et c'est déjà utilisé dans `EditorTerminal.tsx` pour la Section 2!

---

**Testez différentes polices et choisissez celle qui correspond le mieux à votre style!** 🎨




