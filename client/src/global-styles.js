import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

.app {
  font-family: 'Open Sans', sans-serif;
  padding: 20px 60px;

  @media screen and (max-width: 800px) {
    padding: 10px;
  }

}

a {
  text-decoration: none;
  color: inherit;
}
`;
