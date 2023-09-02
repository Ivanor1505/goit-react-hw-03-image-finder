import { MoreButton } from './Button.styled';

export const Button = ({ loadMore }) => {
  return (
    <div>
      <MoreButton onClick={loadMore}>Load more</MoreButton>
    </div>
  );
};
