import {useState, useEffect} from 'react';
import {AppState} from '../types/states';
import ShoppingItem from '../models/ShoppingItem';

interface UrlRequest {
	request: Request;
	action: string;
}

// Custom Hook for server operations
const useAction = () => {

	// Shopping list state
	const [state, setState] = useState<AppState>({
		list: []
	});

	// Current URL request state
	const [urlRequest, setUrlRequest] = useState<UrlRequest>({
		request: new Request("", {}),
		action: ""
	});

	// Effect for handling URL requests
	useEffect(() => {

		const fetchData = async () => {
			const response = await fetch(urlRequest.request);

			// No response from server
			if (!response) {
				console.log("Server sent no response!");
				return;
			}

			// Valid response from server
			if (response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						// Get the list from server
						let temp = await response.json();
						let list: ShoppingItem[] = temp as ShoppingItem[];
						setState({ list });
						return;
						
						// After add, remove, or edit item, get an updated list
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
						return;
						
					default:
						return;
				}
			} else {
				console.log("Server responded with a status " + response.status + " " + response.statusText);
			}
		}

		// Fetch data
		fetchData();

	}, [urlRequest]);

	// Fetch list from server
	const getList = () => {
		setUrlRequest({
			request: new Request("/api/shopping", { method: "GET" }),
			action: "getlist",
		});
	};

	// Add item to server shopping list
	const add = (item: ShoppingItem) => {
		setUrlRequest({
			request: new Request("/api/shopping", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item),
			}),
			action: "additem",
		});
	};

	// Remove item from server shopping list
	const remove = (id: string) => {
		setUrlRequest({
			request: new Request("/api/shopping/" + id, { method: "DELETE" }),
			action: "removeitem",
		});
	};

	// Edit item in server shopping list
	const edit = (item: ShoppingItem) => {
		setUrlRequest({
			request: new Request("/api/shopping/" + item._id, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item),
			}),
			action: "edititem",
		});
	};

	// Return hook state and operations
	return { state, getList, add, remove, edit };
};

// Export custom Hook
export default useAction;