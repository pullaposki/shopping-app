import {useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

interface Props {
	list:ShoppingItem[];
	remove(id:string):void;
	edit(item:ShoppingItem):void;
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList = (props:Props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeMode =(index:number,mode:string) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				editIndex:index,
				removeIndex:-1
			})
		}
		if(mode === "cancel") {
			setState({
				editIndex:-1,
				removeIndex:-1
			})
		}
	}

	// Functions to remove and edit an item from shopping list and revert the mode to cancels
	// The actual removal/editing is handled by the parent, through props.
	const removeItem = (id:string) => {
		props.remove(id);
		changeMode(0,"cancel");
	}
	const editItem = (item:ShoppingItem) => {
		props.edit(item);
		changeMode(0,"cancel");
	}

	// The shopping list is obtained from props and mapped to "Row" components.
	// Depending on the mode (remove/edit), different Rows (RemoveRow/EditRow) are rendered
	const shoppingItems = props.list.map((item,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={item._id} item={item} changeMode={changeMode} removeItem={removeItem}/>
			)
		}
		if(state.editIndex === index) {
			return(
				<EditRow key={item._id} item={item} changeMode={changeMode} editItem={editItem}/>
			)
		}		
		return(
			<Row key={item._id} item={item} index={index} changeMode={changeMode}/>
		)
	})
	
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
				{shoppingItems}
			</tbody>
		</table>
	)
}

export default ShoppingList;