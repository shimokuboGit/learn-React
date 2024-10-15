import { Button, ChakraProvider } from '@chakra-ui/react';
import './App.css'
import { useEffect, useState } from 'react';
import { Router } from './router/Router';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </BrowserRouter>
    </>
  )
}

