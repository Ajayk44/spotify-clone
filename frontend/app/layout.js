import "../styles/globals.css";

import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/hooks/useGlobalContext";

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <ReduxProvider>
          <body>
            <div>
              <Toaster />
            </div>
            {children}
          </body>
        </ReduxProvider>
      </AppProvider>
    </html>
  );
}
