import { useParams } from 'react-router-dom';

export const TransactionDetailAdmin = () => {
  const param: { id: string } = useParams();
  return <h1>Transaction:detail: {param.id}</h1>;
};
