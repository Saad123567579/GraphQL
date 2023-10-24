import logo from './logo.svg';
import './App.css';
import {useQuery, gql} from "@apollo/client";


const query = gql`
query GetTodos {
  getTodos {
     title
    id
    userId
    user{
      name
      email
    }
  }
}

`

function App() {
  const {data,loading} = useQuery(query);
  
  return (
    <div>
     {loading && <h1>Your data is being loaded plz wait</h1>}
     {data && <h1>Your data has been loaded plz check your console </h1>}
    </div>
  );
}

export default App;
