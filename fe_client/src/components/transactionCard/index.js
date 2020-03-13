import { h } from 'preact'



// TODO -- destructure transaction information
const TransactionCard = ({ transaction }) => {


  return (
    <div>
      <h5>Transaction</h5>
      <p>{transaction.sender} sent {transaction.recipient} a total of {transaction.amount} carrots.</p>
    </div>
  )
}



export default TransactionCard
