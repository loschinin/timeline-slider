import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* The Main component is a placeholder where
     Next.js will render the main content of your page.
     For example, when you navigate to your homepage, the
     content of your src/pages/index.tsx file will be
     injected into the location where you've placed <Main 
     />. */}
        <Main />

        {/* The NextScript component is where Next.js
     injects the JavaScript bundles that are necessary to
     make your page interactive. This includes the React
     library, your application's code, and other scripts.
     Without <NextScript />, your page would just be
     static HTML, and none of your client-side React code
     or event handlers would run.  */}
        <NextScript />
      </body>
    </Html>
  );
}
