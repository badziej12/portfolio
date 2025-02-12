import "@/styles/globals.css";
import "@/styles/components/hero.scss";
import "@/styles/home.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
