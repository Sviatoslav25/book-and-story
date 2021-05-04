import { useParams } from 'react-router-dom';
import MockDataService from '../services/MockDataService';

export default function Book() {
  const params = useParams();
  const book = MockDataService.getBookById(params.id);
  return <pre>{JSON.stringify(book, null, 2)}</pre>;
}
