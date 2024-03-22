import { render, screen } from '@testing-library/react';
import App from './App';
import SignIn from './components/Auth/SignIn';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
})); 

test('renders learn react link', () => {
  render(<SignIn />);
  const linkElement = screen.getByText('handleSubmit'); 
  expect(linkElement).toBeInTheDocument();
});
