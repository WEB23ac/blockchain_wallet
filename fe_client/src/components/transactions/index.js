import { h } from 'preact'


import TransactionCard from '../transactionCard'

// TODO -- destructure transactions information
const Transactions = ({ transactions, user }) => {
  console.log('T comp ', transactions)

  const carrotsSent = transactions.filter(entry => entry.sender === user)
  const carrotsReceived = transactions.filter(entry => entry.recipient === user)


  const sum = (prev, next) => prev + next
  const amount = entry => entry.amount


  const totalSent = carrotsSent.map(amount).reduce(sum)
  const totalRecieved = carrotsReceived.map(amount).reduce(sum)
  const balance = totalRecieved - totalSent

  console.log('user', user, 'total_sent', totalSent)
  console.log('c sent', carrotsSent)
  console.log('c rec', carrotsReceived)



  // TODO calculate how many carrots belong to this user

  return (
    <div>
      <h3>Transactions</h3>
      <h4>Current Balance is {balance} carrots.</h4>
      <h3>Carrots Sent</h3>
      {carrotsSent.map(transaction => <TransactionCard transaction={transaction} />)}
      <h3>Carrots Received</h3>
      {carrotsReceived.map(transaction => <TransactionCard transaction={transaction} />)}

    </div>
  )
}

export default Transactions
