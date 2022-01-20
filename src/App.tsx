import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";

import ErrorBoundary from "./Components/ErrorBoundary";
import { Toaster } from "./Components/Toaster";
import { jwtToken } from "./Recoil";
import "./App.css";
import { Spinner } from "./Components/Spinner";

const HomePage = React.lazy(() => import("./Components/HomePage"));
const GameCreation = React.lazy(() => import("./Components/GameCreation"));

const App = () => {
  const [jwttoken] = useRecoilState(jwtToken);

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={() => <Spinner />}>
          <BrowserRouter>
            <Routes>
              <Route path="/GuessMe/" element={<HomePage />} />
              {jwttoken && (
                <Route path="/GuessMe/game" element={<GameCreation />} />
              )}
              <Route path="*" element={<Navigate replace to="/GuessMe/" />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
