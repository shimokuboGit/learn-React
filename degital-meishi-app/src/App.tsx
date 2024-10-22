import { Button, ChakraProvider } from '@chakra-ui/react';
import './App.css'
import { useEffect, useState } from 'react';
import { AppRouter } from './router/Router';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </>
  )
}
