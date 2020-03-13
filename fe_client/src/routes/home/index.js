import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'
import style from './style';


import Transactions from '../../components/transactions'


const Home = () => {
	const [formInput, setFormInput] = useState('none')
	const [sendForm, setSendForm] = useState({
		recipient: '',
		amount: 0
	})
	const [username, setUsername] = useState('')
	const [chainState, setChainState] = useState([])


	console.log('chainstate', chainState)


	function retrieveTransactions() {
		axios.get('http://localhost:5000/chain')
			.then(res => {
				console.log('axios init res', res)
				console.log('Axios user name check', username)
				const userTransactions = res.data.chain.map(item => item.transactions.filter(item => item.sender === username || item.recipient === username)).flat() || []
				console.log('chainState after axios', chainState)
				setChainState(userTransactions)
			})
			.catch(err => {
				console.log('ERROR', err)
			})
	}

	function clickRetrieve(e) {
		e.preventDefault()
		retrieveTransactions()
	}


	const sendTransaction = (username, { recipient, amount }) => {
		const sendData = {
			sender: username,
			recipient,
			amount
		}

		axios.post('http://localhost:5000/new_transaction', sendData)
			.then(res => {
				console.log('sendTransaction res', res)
			})
			.catch(err => {
				console.log(err)
			})
	}




	function userInput(e) {
		const { value } = e.target
		setFormInput(value)
	}


	function handleUserChange(e) {
		e.preventDefault()
		setUsername(formInput)
	}

	function recipientInput(e) {
		const { target } = e
		const { value, name } = target
		setSendForm({
			...sendForm,
			[name]: value
		})
	}

	function handleSend(e) {
		e.preventDefault()
		sendTransaction(username, sendForm)
	}



	return (
		<div>
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<div>
					<form onSubmit={handleUserChange}>
						<input type='text' value={formInput} onInput={userInput} />
						<button type='submit'>Change User</button>
					</form>
				</div>
				<div>
					<button onClick={clickRetrieve}>Retrieve Transactions</button>
					<form onSubmit={handleSend}>
						<input type='text' value={sendForm.amount} name='amount' onInput={recipientInput} />
						<input type='text' value={sendForm.recipient} name='recipient' onInput={recipientInput} />
						<button type='submit'>Send Carrots</button>
					</form>
				</div>
			</div >
			{chainState.length && <Transactions user={username} transactions={chainState} />}

		</div>

	)
};

export default Home;
