import { useParams } from 'react-router-dom';
import MockDataService from '../services/MockDataService';

export default function Story() {
  const params = useParams();
  const story = MockDataService.getStoryById(params.id);
  return <pre>{JSON.stringify(story, null, 2)}</pre>;
}
