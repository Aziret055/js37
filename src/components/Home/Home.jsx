import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
let api = import.meta.env.VITE_URL

const Home = () => {
	const { todo } = useSelector(s => s)
	const [name, setName] = useState('')
	const [userName, setUserName] = useState('')
	const dispatch = useDispatch()

	async function postProduct() {
		const newProduct = {
			id: Date.now(),
			name: name,
			userName: userName
		}
		try {
			await axios.post(api, newProduct)
		} catch (error) {
			alert(error.message)
		}
		getProduct()
	}
	async function getProduct() {
		try {
			const { data } = await axios(api)
			dispatch({ type: 'ADD_TODO', payload: data })
		} catch (error) {
			alert(error.message)
		}
	}
	async function deleteProduct(id) {
		try {
			await axios.delete(`${api}/${id}`)
		} catch (error) {
			alert(error.message)
		}
		getProduct()
	}
	useEffect(() => {
		getProduct()
	}, [])

	return (
		<div id='home'>
			<h1>TO DO LIST</h1>
			<div className='home'>
				<input
					onChange={e => setName(e.target.value)}
					type='text'
					placeholder='name'
				/>
				<input
					onChange={e => setUserName(e.target.value)}
					type='text'
					placeholder='userName'
				/>
				<button onClick={postProduct}>submit</button>
			</div>
			{todo.map(el => (
				<div key={el.id} className='list'>
					<p>{el.name}</p>
					<p>{el.userName}</p>
					<button onClick={() => deleteProduct(el._id)}>delete</button>
				</div>
			))}
		</div>
	)
}

export default Home
