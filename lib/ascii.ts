// ASCII Art pré-généré (car figlet ne fonctionne que côté serveur)
// Généré avec: http://patorjk.com/software/taag/

// Graduation cap animation frames (rotating/floating effect)
export const GRADUATION_CAP_FRAMES = [
    // Frame 1 - Normal
    `
    ___________
   |___________|
      |     |
      |_____|
       |   |
    `,
    // Frame 2 - Slight tilt right
    `
     ___________
    |___________|
       |     |
       |_____|
        |   |
    `,
    // Frame 3 - More tilt
    `
      __________
     |__________|
        |    |
        |____|
         | |
    `,
    // Frame 2 again (reverse)
    `
     ___________
    |___________|
       |     |
       |_____|
        |   |
    `,
];

// Decorative pixel elements for the theme
export const PIXEL_DECORATIONS = {
    CORNER_TL: '╔',
    CORNER_TR: '╗',
    CORNER_BL: '╚',
    CORNER_BR: '╝',
    LINE_H: '═',
    LINE_V: '║',
    BULLET: '▪',
    ARROW: '►',
    STAR: '★',
    DIPLOMA: '📜',
    CHECK: '✓',
    LOADING_BAR: ['▱', '▰'],
};

export const ASCII_ART = {
  // WRAPPED - Police "Graffiti" (pour Section 1)
  WRAPPED_GRAFFITI: ` __      __                                       .___
/  \\    /  \\___________  ______ ______   ____   __| _/
\\   \\/\\/   /\\_  __ \\__  \\ \\____ \\\\____ \\_/ __ \\ / __ | 
 \\        /  |  | \\// __ \\|  |_> >  |_> >  ___// /_/ | 
  \\__/\\  /   |__|  (____  /   __/|   __/ \\___  >____ | 
       \\/               \\/|__|   |__|        \\/     \\/`,

  // SYSTEM BOOT - Police "Standard"
  SYSTEM_BOOT: `  ____            _                    ____              _   
 / ___| _   _ ___| |_ ___ _ __ ___   | __ )  ___   ___ | |_ 
 \\___ \\| | | / __| __/ _ \\ '_ \` _ \\  |  _ \\ / _ \\ / _ \\| __|
  ___) | |_| \\__ \\ ||  __/ | | | | | | |_) | (_) | (_) | |_ 
 |____/ \\__, |___/\\__\\___|_| |_| |_| |____/ \\___/ \\___/ \\__|
        |___/`,

  // GI 2025 WRAPPED - Police "Slant" (combiné pour Section 1)
  GI_2025_WRAPPED: `    __________   ___   ___ ___  ____     _       __                                    __
   / ____/  _/  |__ \\ / _ \\__ \\| ___|   | |     / /________ _____  ____  ___  ____/ /
  / / __ / /    __) / // /_/ /___ \\    | | /| / / ___/ __ \`/ __ \\/ __ \\/ _ \\/ __  / 
 / /_/ // /    / __// //_/ __/ ___/ /   | |/ |/ / /  / /_/ / /_/ / /_/ /  __/ /_/ /  
 \\____/___/   /____/\\___/____/_____/    |__/|__/_/   \\__,_/ .___/ .___/\\___/\\__,_/   
                                                          /_/   /_/`,

  // GI 2025 - Police "Slant"
  GI_2025_SLANT: `    __________   ___   ___ ___  ____  
   / ____/  _/  |__ \\ / _ \\__ \\| ___| 
  / / __ / /    __) / // /_/ /___ \\  
 / /_/ // /    / __// //_/ __/ ___/ / 
 \\____/___/   /____/\\___/____/_____/`,

  // GI 2025 - Police "Big"
  GI_2025_BIG: `   _____ _____   ___   ___ ___  _____ 
  / ____|_   _| |__ \\ / _ \\__ \\| ____|
 | |  __  | |     ) | | | | | |  _|  
 | | |_ | | |   / /| | |_| | | |___ 
  \\____|___|  |____/ \\___/|_||_____|`,

  // GI 2025 - Police "Standard"
  GI_2025_STANDARD: `  ____ ___   ____   ___ ____  ____  
 / ___|_ _| |___ \\ / _ \\___ \\| ___| 
| |  _ | |    __) | | | |__) |___ \\ 
| |_| || |   / __/| |_| / __/ ___) |
 \\____|___| |_____|\\___/_____|____/`,

  // WRAPPED - Police "Banner"
  WRAPPED_BANNER: ` #     #                                           
 #  #  # #####    ##   #####  #####  ###### #####  
 #  #  # #    #  #  #  #    # #    # #      #    # 
 #  #  # #    # #    # #    # #    # #####  #    # 
 #  #  # #####  ###### #####  #####  #      #    # 
 #  #  # #   #  #    # #      #      #      #    # 
  ## ##  #    # #    # #      #      ###### #####`,

  // WRAPPED - Police "Slant"
  WRAPPED_SLANT: `  _       __                                    __
 | |     / /________ _____  ____  ___  ____/ /
 | | /| / / ___/ __ \`/ __ \\/ __ \\/ _ \\/ __  / 
 | |/ |/ / /  / /_/ / /_/ / /_/ /  __/ /_/ /  
 |__/|__/_/   \\__,_/ .___/ .___/\\___/\\__,_/   
                  /_/   /_/`,

  // THEMES - Police "Banner"
  THEMES_BANNER: ` #######                                    
    #    #    # ###### #    # ######  ####  
    #    #    # #      ##  ## #      #      
    #    ###### #####  # ## # #####   ####  
    #    #    # #      #    # #           # 
    #    #    # ###### #    # ######  ####`,

  // MENTIONS - Police "Big"
  MENTIONS_BIG: ` __  __            _   _                 
|  \\/  | ___ _ __ | |_(_) ___  _ __  ___ 
| |\\/| |/ _ \\ '_ \\| __| |/ _ \\| '_ \\/ __|
| |  | |  __/ | | | |_| | (_) | | | \\__ \\
|_|  |_|\\___|_| |_|\\__|_|\\___/|_| |_|___/`,

  // CLOSING - Police "Standard"
  CLOSING_STANDARD: `  ____ _               _             
 / ___| | ___  ___(_)_ __   __ _ 
| |   | |/ _ \\/ __| | '_ \\ / _\` |
| |___| | (_) \\__ \\ | | | | (_| |
 \\____|_|\\___/|___/_|_| |_|\\__, |
                           |___/`,

  // CHIFFRES STYLE BIG pour Section 2
  NUMBER_70: ` ______   ___  
|____  | / _ \\ 
    / / | | | |
   / /  | |_| |
  /_/    \\___/`,

  NUMBER_1: `  _ 
 / |
 | |
 | |
 |_|`,

  NUMBER_69: `   __    ___  
  / /_  / _ \\ 
 | '_ \\| (_) |
 | (_) |\\__, |
  \\___/   /_/`,
};

// Fonction pour récupérer l'ASCII art
export const getAsciiArt = (key: keyof typeof ASCII_ART): string => {
  return ASCII_ART[key] || '';
};

// Pour compatibilité avec l'ancien code
export const generateAsciiTextSync = (text: string, _font?: string): string => {
  // Mapping simple basé sur le texte
  const textUpper = text.toUpperCase().replace(/\s+/g, '_');
  
  if (textUpper.includes('GI') && textUpper.includes('2025') && textUpper.includes('WRAPPED')) {
    return ASCII_ART.GI_2025_WRAPPED;
  }
  if (textUpper.includes('GI') && textUpper.includes('2025')) {
    return ASCII_ART.GI_2025_SLANT;
  }
  if (textUpper === 'WRAPPED' || textUpper.includes('WRAPPED_ONLY')) {
    return ASCII_ART.WRAPPED_GRAFFITI;
  }
  if (textUpper.includes('SYSTEM') && textUpper.includes('BOOT')) {
    return ASCII_ART.SYSTEM_BOOT;
  }
  if (textUpper.includes('THEMES')) {
    return ASCII_ART.THEMES_BANNER;
  }
  if (textUpper.includes('MENTIONS')) {
    return ASCII_ART.MENTIONS_BIG;
  }
  if (textUpper.includes('CLOSING')) {
    return ASCII_ART.CLOSING_STANDARD;
  }
  
  // Fallback: retourner le texte tel quel
  return text;
};

export const ASCII_FONTS = {
  slant: 'slant',
  standard: 'standard',
  banner: 'banner',
  big: 'big',
};

