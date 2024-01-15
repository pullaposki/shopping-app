import {useEffect} from 'react';
import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';

function App() {

	const action = useAction();
	
	useEffect(() =>  {
		action.getList();
	},[])

	return (
		<>
			<Navbar/>
			<Routes>

				{/*Each Route is a conditionally shown component based on the current URL path*/}
				
				{/*The root path ("/") displays the ShoppingList component, which is passed the current list of shopping items and functions to remove and edit items*/}
				<Route path="/" element=
					{<ShoppingList list={action.state.list} remove={action.remove} edit={action.edit}/>} />

				{/*The "/form" path displays the ShoppingForm component, which is passed a function to add new items to the list.*/}
				<Route path="/form" element=
					{<ShoppingForm add={action.add}/>} />

				{/*Any unknown path ("*") redirects to the root path using the Navigate component from react-router-dom.*/}
				<Route path="*" element=
					{<Navigate to="/"/>} />
			</Routes>
		</>
	)
}

export default App
