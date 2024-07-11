import './App.css';

import { BrowserRouter, Link } from 'react-router-dom';

import { Router } from './router/Router';
import { PrimaryButton } from './components/atoms/button/PrimaryButton';
import { SecondaryButton } from './components/atoms/button/SecondaryButton';
import { SearchInput } from './components/molecules/SearchInput';
import { UserCard } from './components/organisms/user/UserCard';

export default function App() {

  const user = {
    name: "TARO",
    image: "https://plus.unsplash.com/premium_photo-1720350577953-496492033e07?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "exsample@hoge.com",
    tel: "000-9999-9999",
    company: {
      name: 'kingdom-cokingdom-cokingdom-cokingdom-cokingdom-cokingdom-co'
    },
    web: "https://hoge.com"
  }
  return (
    <BrowserRouter>
      <div className="App">
        <PrimaryButton>test</PrimaryButton>
        <SecondaryButton>search</SecondaryButton>
        <SearchInput placeholder="入力してください">検索</SearchInput>
        <UserCard user={user} />
        <Link to='/'>Home</Link>
        <br />
        <Link to='/page1'>Page1</Link>
        <br />
        <Link to='/page2'>Page2</Link>
      </div>
      <Router />
    </BrowserRouter>
  );
}
