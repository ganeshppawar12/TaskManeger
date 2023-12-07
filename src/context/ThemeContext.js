import React from 'react';

export const ThemeContext = React.createContext();

// export const ThemeProvider = ({children}) => {
//   const [darkTheme, setDarkTheme] = React.useState(false);
//   const togglethem = () => {
//     setDarkTheme(!darkTheme);
//   };
//   return (
//     <ThemeContext.Provider value={{darkTheme, togglethem}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
